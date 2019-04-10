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
      const reduced = difference.reduce((agg, cur, index) => {
        const previous = index > 0 ? difference[index - 1] : 0
        const offset = previous < 0 ? previous : 0
        const last = agg[agg.length - 1]
        agg.push(last + cur + offset)
        return agg
      }, [6])

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
            data: reduced
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
