
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['cases', 'recovers', 'deaths', 'labels'],
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Cases',
          backgroundColor: '#ffc107',
          data: this.cases
        },
        {
          label: 'Recovery',
          backgroundColor: '#28a745',
          data: this.recovers
        },
        {
          label: 'Deaths',
          backgroundColor: '#dc3545',
          data: this.deaths
        }
      ]
          
    }, {
      options:{
        scaleLabel:{
            fontColor: 'dc3545'
        },
        scales: {
           gridLines: {
                display: false,
                lineWidth: 0

              },
            yAxes: [{
              gridLines: {
                display: false,
                lineWidth: 0
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false,
                lineWidth: 0
              }
            }]
        }
    }})
  }
}
</script>