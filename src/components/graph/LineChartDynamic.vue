
<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data: () => ({
    options:{
        legend: {
          labels:{
            fontColor: 'white',
            boxWidth: 10
          }
        },
        scales: {
           gridLines: {
                display: false,
                lineWidth: 0
              },
            yAxes: [{
              ticks: {
                fontColor: 'white'
              }
            }],
            xAxes: [ {
              type: 'time',
              time: {
                unit: 'day',
                unitStepSize: 1,
                displayFormats: {
                  'day': 'MM/DD'
                }
              },
              ticks: {
                fontColor: 'white'
              },
              gridLines: {
                display: false,
              }
            }]
        }
    }
  }),
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>