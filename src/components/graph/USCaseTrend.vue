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
import axios from 'axios'
import * as moment from "moment/moment";
import _ from 'lodash'

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data() {
      return {
        loaded: false,
        agg:[]
      }
  },
  computed: {
        totalCases(){
            return this.agg.map(p => p.cases || 0);
        },
        totalHospitalized(){
            return this.agg.map(p => p.hospitalized || 0);
        },
        totalDeaths(){
            return this.agg.map(p => p.death || 0);
        },
        dateReported(){
            return this.agg.map(p => moment(p.dates).format('MM/DD'));
        },

  },
 mounted () {
    this.loaded = false
    axios.get('https://covidtracking.com/api/states/daily')
      .then(response => {
        let groupByDay = _.groupBy(response.data, 'dateChecked');

        let groupAggregated = _.map(groupByDay, (o,i) =>{
            return { 
                    dates: i,
                    cases: _.sumBy(o,'positive'),
                    hospitalized: _.sumBy(o,'hospitalized'),
                    deaths: _.sumBy(o,'death'),
        }});

        this.agg = groupAggregated;
        this.loaded = true
      })
      .catch( e => {
        console.log(e);
      })
  }
}
</script>