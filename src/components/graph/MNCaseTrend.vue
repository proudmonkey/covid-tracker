<template>
  <div class="MNMap">
    <line-chart
      :width="300" 
      :height="300"
      v-if="loaded"
      :cases="totalCases"
      :hospitalized="totalHospitalized"
      :deaths="totalDeaths"
      :labels="dateReported"/>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
//import axios from 'axios'
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
            return this.agg.map(p => p.positive || 0);
        },
        totalHospitalized(){
            return this.agg.map(p => p.hospitalized || 0);
        },
        totalDeaths(){
            return this.agg.map(p => p.death || 0);
        },
        dateReported(){
            return this.agg.map(p => moment(p.dateChecked).format('MM/DD'));
        },

  },
 mounted () {
    this.loaded = false
    // axios.get('https://covidtracking.com/api/states/daily?state=MN')
    //   .then(response => {
    //     this.agg = response.data;
    //     this.loaded = true
    //   })
    //   .catch( e => {
    //     console.log(e);
    //   })
     if(this.cases.length > 0){
        this.agg = this.cases;
        this.loaded = true
    }
  }
}
</script>
