<template>
  <chart :options="chartOptionsBar"></chart>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'SupplyDemandChart',

  apollo: {
    baby: {
      query: gql`
        query baby {
          baby(id: "123") {
            babystats {
              date
              bOz
              pOz
            }
          }
        }
      `
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
    chartOptionsBar() {
      const difference = this.baby.babystats.map(s => s.pOz - s.bOz)
      const reduced = difference.reduce((agg, cur) => {
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
            data: reduced.map(r => r.offset)
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
            data: difference.map((d) => d > 0 ? d : '-')
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
            data: difference.map((d) => d < 0 ? d * -1 : '-')
          }
        ]
      }
    }
  }
}
</script>
