<template>
  <div class="GlobalTrend">
    <bar-chart
      v-if="loaded"
      :width="500" 
      :height="500"
      :cases="totalCases"
      :recovers="totalRecovery"
      :deaths="totalDeaths"
      :active="totalActive"
      :labels="totalCountry"/>
  </div>
</template>

<script>
import BarChart from './BarChartPublic.vue'

export default {
  name: 'BarChartContainer',
  props: ['cases'],
  components: { BarChart },
  data() {
      return {
        loaded: false,
        agg:[]
      }
  },
  computed: {
        totalCases(){
            return this.agg.map(p => p.Confirmed);
        },
        totalRecovery(){
            return this.agg.map(p => p.Recovered);
        },
        totalDeaths(){
            return this.agg.map(p => p.Deaths);
        },
        totalActive(){
            return this.agg.map(p => p.Active);
        },
        totalCountry(){
            return this.agg.map(p => p.Country_Region);
        },
},
 mounted () {
    this.loaded = false
    
    if(this.cases.length > 0){
        console.log(this.cases);
        this.agg = this.cases;
        this.loaded = true;
    }
  }
}
</script>