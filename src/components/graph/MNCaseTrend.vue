<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :cases="totalCases"
      :recovers="totalRecovery"
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
        chartData: [],
        chartLabels: [],
        agg:[]
      }
  },
  computed: {
        totalCases(){
            // let cases = this.chartData.map((attr) => {
            //     return attr.attributes;
            // }).map(p => p.confirmed);
            console.log(this.agg.map(p => p.cases))
            return this.agg.map(p => p.cases);
        },
        totalRecovery(){
            return this.agg.map(p => p.recovers);
        },
        totalDeaths(){
            return this.agg.map(p => p.deaths);
        },
        dateReported(){
            return this.agg.map(p => p.dates);
        },

  },
 mounted () {
    this.loaded = false
    axios.get('https://services.arcgis.com/pEosvuftL1Kgj1UF/ArcGIS/rest/services/Cases_public/FeatureServer/1/query?where=1%3D1&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=reportdt+asc&groupByFieldsForStatistics=reportdt&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=')
      .then(response => {
        let aggregateData = response.data.features.map((attr) => {
                return attr.attributes;
         });

        this.agg = _.map(_.groupBy(aggregateData,'reportdt'), (o,i) =>{
                return { 
                    dates: new moment(new Date(parseInt(i))).format('MM/DD'),
                    cases: _.sumBy(o,'confirmed'),
                    recovers: _.sumBy(o,'recovered'),
                    deaths: _.sumBy(o,'deaths'),
        }})

        console.log(this.agg);
        this.loaded = true
      })
      .catch( e => {
        console.log(e);
      })
  }
}
</script>