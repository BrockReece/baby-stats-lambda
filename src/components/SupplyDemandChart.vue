<template>
  <div>
    <h2>
      Current Milk Stock: 
      {{ reduced[reduced.length - 1].total.toFixed(2) }}
      <small>Oz</small>
    </h2>
    <chart :options="chartOptionsBar" :width="1200"></chart>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  inject: ['global'],

  name: 'SupplyDemandChart',

  apollo: {
    baby: {
      query: gql`
        query baby($id: ID!) {
          baby(id: $id) {
            babystats {
              date
              bOz
              pOz
            }
          }
        }
      `,
      variables () {
        return {
          id: this.global.id
        }
      },
      skip () {
        return !this.global.id
      }
    }
  },

  data () {
    return {
      baby: {
        babystats: []
      }
    }
  },

  computed: {
    difference() {
      return this.baby.babystats.map(s => s.pOz - s.bOz)
    },

    reduced() {
      return this.difference.reduce((agg, cur) => {
        const offset = cur < 0 ? cur : 0
        const last = agg[agg.length - 1]
        last.offset = last.total + offset
        agg.push({
            total: Math.max(last.total + cur, 0)
        })
        return agg
      }, [{
        total: 0,
      }])
    },

    chartOptionsBar() {
      return {
        xAxis: {
          data: this.baby.babystats.map(s => s.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            stack: 'test',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: this.reduced.map(r => r.offset)
          },
          {
            type: 'bar',
            stack: 'test',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              color: 'green'
            },
            data: this.difference.map((d) => d > 0 ? d.toFixed(2) : '-')
          },
          {
            type: 'bar',
            stack: 'test',
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            itemStyle: {
              color: 'red'
            },
            data: this.difference.map((d) => d < 0 ? (d * -1).toFixed(2) : '-')
          }
        ]
      }
    }
  }
}
</script>
