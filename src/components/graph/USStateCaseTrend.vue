<template>
  <div class="USMap">
    <line-chart
      v-if="loaded"
      :width="300" 
      :height="300"
      :cases="totalCases"
      :recovers="totalRecovery"
      :deaths="totalDeaths"
      :active="totalActive"
      :labels="totalStates"/>
  </div>
</template>

<script>
import LineChart from './LineChartPublic.vue'
import axios from 'axios'
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
            return this.agg.map(p => p.cases);
        },
        totalRecovery(){
            return this.agg.map(p => p.recovers);
        },
        totalDeaths(){
            return this.agg.map(p => p.deaths);
        },
        totalActive(){
            return this.agg.map(p => p.active);
        },
        totalStates(){
            return this.agg.map(p => p.states);
        },
  },
 methods:{
     abbr: function(state) {
         var states = [
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['American Samoa', 'AS'],
            ['Arizona', 'AZ'],
            ['Arkansas', 'AR'],
            ['Armed Forces Americas', 'AA'],
            ['Armed Forces Europe', 'AE'],
            ['Armed Forces Pacific', 'AP'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['District Of Columbia', 'DC'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Guam', 'GU'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Marshall Islands', 'MH'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Northern Mariana Islands', 'NP'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Puerto Rico', 'PR'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['US Virgin Islands', 'VI'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
            ['Wuhan Evacuee', 'Evacuee']  
        ];
    
        state = state.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(let i = 0; i < states.length; i++){
            if(states[i][0] == state){
                return(states[i][1]);
            }
        }
     } 
 },
 mounted () {
    this.loaded = false
    axios.get('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=Province_State%2CConfirmed%2CDeaths%2CRecovered%2CActive%2CLast_Update&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=')
      .then(response => {
        let data = response.data.features.map((attr) => {
                return attr.attributes;
        });
        
        let groupByDay = _.groupBy(data, 'Province_State');

        let groupAggregated = _.map(groupByDay, (o,i) =>{
            return { 
                    states: this.abbr(i),
                    cases: _.sumBy(o,'Confirmed'),
                    recovers: _.sumBy(o,'Deaths'),
                    deaths: _.sumBy(o,'Recovered'),
                    active: _.sumBy(o,'Active'),
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