
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['cases', 'hospitalized', 'deaths', 'labels'],
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
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Deaths',
          backgroundColor: '#dc3545',
          data: this.deaths
        },
        {
          label: 'Hospitalized',
          backgroundColor: '#6c757d',
          data: this.hospitalized
        },
        {
          label: 'Cases',
          backgroundColor: '#ffc107',
          data: this.cases
        },
      ]  
    }, this.options)
  }
}
</script>