<template>
  <div class="USMap">
    <line-chart
      v-if="loaded"
      :width="300" 
      :height="300"
      :cases="totalCases"
      :hospitalized="totalHospitalized"
      :deaths="totalDeaths"
      :labels="dateReported"/>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import * as moment from "moment/moment";

export default {
  name: 'LineChartContainer',
  props: ['cases'],
  components: { LineChart },
  data() {
      return {
        loaded: false,
        agg:[]
      }
  },
  computed: {
        totalCases(){
            return this.agg.map(p => p.positiveIncrease || 0);
        },
        totalHospitalized(){
            return this.agg.map(p => p.hospitalizedIncrease || 0);
        },
        totalDeaths(){
            return this.agg.map(p => p.deathIncrease || 0);
        },
        dateReported(){
            return this.agg.map(p => moment(p.dateChecked).format('MM/DD'));
        },

  },
 mounted () {
    this.loaded = false
    if(this.cases.length > 0){
        this.agg = this.cases;
        this.loaded = true
    }
  }
}
</script>
