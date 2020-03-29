<template>
    <div>
        <h3>USA Status</h3>
        <b-container class="mt-3">
        <b-row>
            <b-col>
                <b-card bg-variant="info" class="mb-2">
                    <b-card-body>
                        <div class="mb-2">
                            <b-iconstack font-scale="5">
                                <b-icon stacked icon="check-box" scale="0.5" shift-v="-0.25"></b-icon>
                                <b-icon stacked icon="circle"></b-icon>
                            </b-iconstack>
                        </div>
                        <b-card-title>
                            <b-container>
                                <b-row no-gutters>
                                    <b-col class="d-flex flex-row justify-content-center">
                                        <div class="media">
                                            <span class="total-count">{{totalTestsCount | numeral('0,0')}}</span>
                                            <span id="new-update-test" class="new-update-group"> 
                                                <b-icon icon="caret-up-fill" scale="1.1" ></b-icon>
                                                <div>{{totalTestedIncreaseToday | numeral('0')}}</div>
                                                <b-tooltip target="new-update-test" title="New"></b-tooltip>
                                            </span>
                                        </div>
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </b-card-title>
                        <b-card-text class="mb-2"><h5>TESTED</h5></b-card-text>  
                    </b-card-body>  
                </b-card>
            </b-col>
            <b-col>
                <b-card bg-variant="warning" class="mb-2">
                    <b-card-body>
                        <div class="mb-2">
                            <b-iconstack font-scale="5">
                                <b-icon stacked icon="person-plus" scale="0.5" shift-v="-0.25"></b-icon>
                                <b-icon stacked icon="circle"></b-icon>
                            </b-iconstack>
                        </div>
                        <b-card-title>
                            <b-container>
                                <b-row no-gutters>
                                    <b-col class="d-flex flex-row justify-content-center">
                                        <div class="media">
                                            <span class="total-count">{{totalCasesFromGlobalSource | numeral('0,0')}}</span>
                                            <span id="new-update-cases" class="new-update-group"> 
                                                <b-icon icon="caret-up-fill" scale="1.1" ></b-icon>
                                                <div>{{totalPositiveIncreaseToday | numeral('0')}}</div>
                                                <b-tooltip target="new-update-cases" title="New"></b-tooltip>
                                            </span>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card-title>
                        <b-card-text class="mb-2"><h5>POSITIVE</h5></b-card-text>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col>
                <b-card style="background-color:#d9dadb" class="mb-2">
                    <b-card-body>
                        <div class="mb-2">
                            <b-iconstack font-scale="5">
                                <b-icon stacked icon="person-bounding-box" scale="0.5" shift-v="-0.25"></b-icon>
                                <b-icon stacked icon="circle"></b-icon>
                            </b-iconstack>
                        </div>
                        <b-card-title>
                            <b-container>
                                <b-row no-gutters>
                                    <b-col class="d-flex flex-row justify-content-center">
                                        <div class="media">
                                            <span class="total-count">{{totalHospitalizedCount | numeral('0,0')}}</span>
                                            <span id="new-update-hos" class="new-update-group"> 
                                                <b-icon icon="caret-up-fill" scale="1.1" ></b-icon>
                                                <div>{{totalHospitalizedIncreaseToday | numeral('0')}}</div>
                                                <b-tooltip target="new-update-hos" title="New"></b-tooltip>
                                            </span>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card-title>
                        <b-card-text class="mb-2"><h5>HOSPITALIZED</h5></b-card-text>
                    </b-card-body>
                </b-card>
            </b-col>

            <b-col>
                <b-card bg-variant="danger" class="mb-2">
                    <b-card-body>
                        <div class="mb-2">
                            <b-iconstack font-scale="5">
                                <b-icon stacked icon="x-circle" scale="0.5" shift-v="-0.25" animation="spin"></b-icon>
                                <b-icon stacked icon="circle"></b-icon>
                            </b-iconstack>
                        </div>
                        <b-card-title>
                            <b-container>
                                <b-row no-gutters>
                                    <b-col class="d-flex flex-row justify-content-center">
                                        <div class="media">
                                            <span class="total-count">{{totalDeathsFromGlobalSource | numeral('0,0')}}</span>
                                            <span id="new-update-deaths" class="new-update-group"> 
                                                <b-icon icon="caret-up-fill" scale="1.1" ></b-icon>
                                                <div>{{totalDeathIncreaseToday | numeral('0')}}</div>
                                                <b-tooltip target="new-update-deaths" title="New"></b-tooltip>
                                            </span>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card-title>
                        <b-card-text class="mb-2"><h5>DEATHS</h5></b-card-text>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>

        

        <b-container class="mt-3">
            <b-row>
                    <b-col>
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
                                <template v-slot:head(total)="data">
                                    <span class="text-info">{{ data.label }}</span>
                                </template>
                                <template v-slot:cell(total)="data">
                                    <b-badge variant="dark">{{data.item.positive + data.item.negative | numeral('0,0')}}</b-badge>
                                </template>
                                <template v-slot:head(positive)="data">
                                    <span class="text-warning">{{ data.label }}</span>
                                </template>
                                <template v-slot:cell(positive)="data">
                                    <b-badge variant="dark">{{data.item.positive | numeral('0,0')}}</b-badge>
                                </template>
                                <template v-slot:head(death)="data">
                                    <span class="text-danger">{{ data.label }}</span>
                                </template>
                                <template v-slot:cell(death)="data">
                                    <b-badge variant="dark">{{data.item.death | numeral('0,0')}}</b-badge>
                                </template>
                            </b-table>
                        </b-card> 
                    </b-col>
                    <b-col>
                        <b-card bg-variant="dark" text-variant="white" title="Cases Heat Map" class="mb-2">
                            <CaseTrendMap v-if="items.length > 0" :cases="items"/>
                        </b-card>
                    </b-col>
                </b-row>           
        </b-container>  

        <b-container class="mt-2">
                <b-row>
                    <b-col>
                        <b-card bg-variant="dark" text-variant="white" title="Trends By Day" class="mb-2">
                            <CaseTrendDailyChart v-if="daily.length > 0" :cases="daily" />
                        </b-card>
                    </b-col>
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
import _ from 'lodash'
import CaseTrendDateChart from "./graph/USCaseTrend.vue";
import CaseTrendDailyChart from "./graph/USCaseTrendDaily.vue";
import CaseTrendStateChart from "./graph/USStateCaseTrend.vue";
import CaseTrendMap from "./map/USCases.vue";

export default {
  components: {
    CaseTrendStateChart,
    CaseTrendDailyChart,
    CaseTrendDateChart,
    CaseTrendMap
  },
  data () {
    return {
      totalCasesFromGlobalSource:0,
      totalDeathsFromGlobalSource:0,
      daily:[],
      today:[],
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
        },
        totalTestedIncreaseToday(){
        return this.today.map(p => p.totalTestResultsIncrease);
        },
        totalPositiveIncreaseToday(){
            return this.today.map(p => p.positiveIncrease);
        },
        totalHospitalizedIncreaseToday(){
            return this.today.map(p => p.hospitalizedIncrease);
        },
        totalDeathIncreaseToday(){
            return this.today.map(p => p.deathIncrease);
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

     axios.get('https://covidtracking.com/api/us/daily')
      .then(response => {
        let data = response.data
      
        let dataSorted = _.orderBy(data, (p) => new Date(p.dateChecked), 'desc');
        this.daily = dataSorted;
        
        this.today = _.take(dataSorted,1);
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
.container{
   max-width: 100%; 
}
.custom-box {
  background-color: '#fd7e14';
}
.total-count{
    font-size:1.2em;
    font-weight: 700;
}
.new-update-group {
  margin-left: 5px; 
  font-size:.6em;
  font-weight: 500;
}
</style>