<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :cases="totalCases"
      :recovers="totalRecovery"
      :deaths="totalDeaths"
      :active="totalActive"
      :labels="totalCounty"/>
  </div>
</template>

<script>
import LineChart from './LineChartPublic.vue'
import axios from 'axios'

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
    axios.get('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases_US/FeatureServer/0/query?where=Province_State%3D%27Minnesota%27+and+Confirmed+%3E+0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=Country_Region%2CCombined_Key%2CConfirmed%2CDeaths%2CRecovered%2CActive%2CLast_Update&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=true&orderByFields=&groupByFieldsForStatistics=Last_Update&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=')
      .then(response => {
        let data = response.data.features.map((attr) => {
                return attr.attributes;
        });
        
        this.agg = data;
        this.loaded = true
      })
      .catch( e => {
        console.log(e);
      })
  }
}
</script>