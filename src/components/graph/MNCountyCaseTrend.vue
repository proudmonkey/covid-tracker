<template>
  <div class="MNChart">
    <line-chart
      v-if="loaded"
      :width="300" 
      :height="300"
      :cases="totalCases"
      :recovers="totalRecovery"
      :deaths="totalDeaths"
      :active="totalActive"
      :labels="totalCounty"/>
  </div>
</template>

<script>
import LineChart from './LineChartPublic.vue'
//import axios from 'axios'

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
        totalCounty(){
            return this.agg.map(p => p.Combined_Key.split(",")[0]);
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
