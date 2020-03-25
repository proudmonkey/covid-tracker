<template>
    <div >
        <h1>USA Status</h1>
        <b-container class="mt-3">
            <b-row>
                <b-col>
                    <b-card bg-variant="info" class="mb-2">
                        <b-card-body>
                            <template>
                                <div>
                                    <b-iconstack font-scale="5">
                                        <b-icon stacked icon="check-box" scale="0.5" shift-v="-0.25"></b-icon>
                                        <b-icon stacked icon="circle"></b-icon>
                                    </b-iconstack>
                                </div>
                                </template>
                            <b-card-title><h1>{{totalTestsCount | numeral('0,0')}}</h1></b-card-title>
                            <b-card-text class="mb-2">Tested</b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card bg-variant="warning" class="mb-2">
                        <b-card-body>
                            <div>
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="plus" scale="0.5" shift-v="-0.25"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><h1>{{ totalCasesFromGlobalSource | numeral('0,0')}}</h1></b-card-title>
                            <b-card-text class="mb-2">Positive</b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card style="background-color:#d9dadb" class="mb-2">
                        <b-card-body>
                            <div>
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="shield-lock" scale="0.5" shift-v="-0.25"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><h1>{{totalHospitalizedCount | numeral('0,0')}}</h1></b-card-title>
                            <b-card-text class="mb-2">Hospitalized</b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card  bg-variant="danger">
                        <b-card-body>
                            <div>
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="x-circle" scale="0.5" shift-v="-0.25" animation="spin"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><h1>{{ totalDeathsFromGlobalSource | numeral('0,0')}}</h1></b-card-title>
                            <b-card-text class="mb-2">Deaths</b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

        <b-container class="mt-3">
            <b-card bg-variant="dark" text-variant="white" title="Cases by States" class="mb-2">
                            <b-table head-variant="dark" 
                                     small 
                                     responsive 
                                     sticky-header="450px"
                                     :no-border-collapse="true"
                                     :items="items" 
                                     :fields="fields" 
                                     :sort-by.sync="sortBy" 
                                     :sort-desc.sync="sortDesc" 
                                     :no-sort-reset="true" >
                                <template v-slot:cell(state)="data">
                                    <b>{{data.item.state}}</b>
                                </template>
                                <template v-slot:cell(total)="data">
                                    <b-badge variant="success">{{data.item.positive + data.item.negative | numeral('0,0')}}</b-badge>
                                </template>
                                <template v-slot:cell(positive)="data">
                                    <b-badge variant="warning">{{data.item.positive | numeral('0,0')}}</b-badge>
                                </template>
                                <template v-slot:cell(death)="data">
                                    <b-badge variant="danger">{{data.item.death | numeral('0,0')}}</b-badge>
                                </template>
                            </b-table>
                        </b-card> 
        </b-container>  

        <b-container class="mt-3">
                <b-row>
                    <b-col>
                        <b-card bg-variant="dark" text-variant="white" title="Trends By Date" class="mb-2">
                            <CaseTrendDateChart />
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card bg-variant="dark" text-variant="white" title="Trends By State">
                            <CaseTrendStateChart />
                        </b-card>
                    </b-col>
                </b-row>
        </b-container>  
    </div>
</template>

<script>
import axios from 'axios'
import CaseTrendDateChart from "./graph/USCaseTrend.vue";
import CaseTrendStateChart from "./graph/USStateCaseTrend.vue";

export default {
  components: {
    CaseTrendStateChart,
    CaseTrendDateChart
  },
  data () {
    return {
      totalCasesFromGlobalSource:0,
      totalDeathsFromGlobalSource:0,
      sortBy: 'positive',
      sortDesc: true,
      fields:[
          { key: 'state', label:'State', variant: 'light'},
          { key: 'total', label:'Tested', variant: 'light'},
          { key: 'positive', label:'Positive', sortable: true, variant: 'light'},
          { key: 'death', label:'Deaths', variant: 'light'},
          { key: 'lastUpdateEt', label:'Last Synced (ET)', variant: 'light'}
        ],
      items: []
    }
  },

  computed: {
        totalTestsCount: function(){
            return this.items.reduce(function(total, item){
            return total + item.positive + item.negative; 
            },0);
        },
        totalPositiveCount: function(){
            return this.items.reduce(function(total, item){
            return total + item.positive; 
            },0);
        },
         totalHospitalizedCount: function(){
            return this.items.reduce(function(total, item){
            return total + item.hospitalized; 
            },0);
        },
        totalDeathCount: function(){
            return this.items.reduce(function(total, item){
            return total + item.death; 
            },0);
        }
  },
  mounted () {
    axios.get('https://covidtracking.com/api/states')
      .then(response => {
        this.items = response.data
      })
      .catch( e => {
        console.log(e);
      })

    axios.get('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases/FeatureServer/2/query?where=1%3D1&objectIds=18&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=')
      .then(response => {
         
        let data = response.data.features.map((attr) => {
                return attr.attributes;
        });

        this.totalCasesFromGlobalSource = data.map(p => p.Confirmed);
        this.totalDeathsFromGlobalSource =  data.map(p => p.Deaths);
      })
      .catch( e => {
        console.log(e);
      })
  }
}
</script>

<style scoped>
.custom-box {
  background-color: '#fd7e14';
}
</style>