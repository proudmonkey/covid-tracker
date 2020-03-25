
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['cases', 'recovers', 'deaths', 'active', 'labels'],
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
          label: 'Recovered',
          backgroundColor: '#28a745',
          data: this.recovers
        },
        {
          label: 'Active',
          backgroundColor: '#fd7e14',
          data: this.deaths
        },
        {
          label: 'Cases',
          backgroundColor: '#ffc107',
          data: this.cases
        }
      ]  
    }, this.options)
  }
}
</script>

