

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartData: {
      type: [],
      default: null
    },
    chartLabels: {
      type: [],
      required: true
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>