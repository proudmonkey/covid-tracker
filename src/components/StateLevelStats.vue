
<template>
<div class="text-center">
    <span>
    <select @change="onChange()" v-model="stateSelected">
        <option disabled value="">SELECT STATE</option>
        <option v-for="state in stateCodes" :value="{code:state.abbreviation, name:state.name}" :key="state.abbreviation">
            {{ state.name }}
        </option>
    </select>
    
    </span>
    <h3>{{ stateSelected.name }}</h3>
    <span class="text-muted" v-if="daily.length > 0">( Data as of {{recent.checkTimeEt}} )</span>
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
                                            <span class="total-count-test">{{recent.positive + recent.negative  | numeral('0,0')}}</span>
                                            <span id="new-update" class="new-update-group"> 
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
                <b-card  bg-variant="success" class="mb-2">
                    <b-card-body>
                        <div class="mb-2">
                            <b-iconstack font-scale="5" id="card-icon-neg">
                                <b-icon stacked icon="person-dash" scale="0.5" shift-v="-0.25"></b-icon>
                                <b-icon stacked icon="circle"></b-icon>
                            </b-iconstack>
                        </div>
                        <b-card-title>
                            <b-container>
                                <b-row no-gutters>
                                    <b-col class="d-flex flex-row justify-content-center">
                                        <div class="media">
                                            <span class="total-count">{{recent.negative | numeral('0,0')}}</span>
                                            <span id="new-update-neg" class="new-update-group"> 
                                                <b-icon icon="caret-up-fill" scale="1.1" ></b-icon>
                                                <div>{{totalNegativeIncreaseToday | numeral('0')}}</div>
                                                <b-tooltip target="new-update-neg" title="New"></b-tooltip>
                                            </span>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card-title>
                        <b-card-text class="mb-2"><h5>NEGATIVE</h5></b-card-text>
                        <b-tooltip target="card-icon-neg" title="MN stopped providing negative test result numbers on 3/23/20, so negatives are as of 3/22/20"></b-tooltip>
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
                                            <span class="total-count">{{recent.positive | numeral('0,0')}}</span>
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
                                            <span class="total-count">{{recent.hospitalized | numeral('0,0')}}</span>
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
                                            <span class="total-count">{{recent.death === null ? 0 : recent.death | numeral('0,0')}}</span>
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
                <b-card bg-variant="dark" text-variant="white" title="Cases by County" class="mb-2">
                    <b-table head-variant="dark" 
                                    small 
                                    responsive
                                    sticky-header="400px"
                                    :no-border-collapse="true"
                                    :items="items" 
                                    :fields="fields" 
                                    :sort-by.sync="sortBy" 
                                    :sort-desc.sync="sortDesc" 
                                    :no-sort-reset="true" >
                                
                                <template v-slot:cell(Combined_Key)="data">
                                <b>{{data.item.Combined_Key | truncate}}</b>
                                </template>
                                <template v-slot:head(Confirmed)="data">
                                    <span class="text-warning">{{ data.label }}</span>
                                </template>
                                <template v-slot:cell(Confirmed)="data">
                                    <b-badge variant="dark">{{data.item.Confirmed | numeral('0,0')}}</b-badge>
                                </template>
                                <template v-slot:head(Recovered)="data">
                                    <span class="text-success">{{ data.label }}</span>
                                </template>
                                <template v-slot:cell(Recovered)="data">
                                    <b-badge variant="dark">{{data.item.Recovered | numeral('0,0')}}</b-badge>
                                </template>
                                <template v-slot:head(Deaths)="data">
                                    <span class="text-danger">{{ data.label }}</span>
                                </template>
                                <template v-slot:cell(Deaths)="data">
                                <b-badge variant="dark">{{data.item.Deaths | numeral('0,0')}}</b-badge>
                                </template>
                    </b-table>
                </b-card>
            </b-col>
        </b-row>
        
    </b-container>

    <b-container class="mt-2">
        <b-row>
            <b-col>
                <b-card bg-variant="dark" text-variant="white" title="Trends By Day" class="mb-2">
                    <CaseTrendDailyChart v-if="daily.length > 0" :cases="daily" :key="daily" />
                </b-card>
            </b-col>
            <b-col>
                <b-card bg-variant="dark" text-variant="white" title="Trends By Date" class="mb-2">
                    <CaseTrendDateChart v-if="daily.length > 0" :cases="daily" :key="daily"  />
                </b-card>
            </b-col>
            <b-col>
                <b-card bg-variant="dark" text-variant="white" title="Trends By County">
                    <CaseTrendStateChart v-if="items.length > 0" :cases="items" :key="items" />
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import CaseTrendDateChart from "./graph/StateCaseTrend.vue";
import CaseTrendDailyChart from "./graph/StateCaseTrendDaily.vue";
import CaseTrendStateChart from "./graph/StateCountyCaseTrend.vue";
import state_codes from './map/json/states.json'

export default {
  components: {
    CaseTrendDateChart,
    CaseTrendDailyChart,
    CaseTrendStateChart
  },
  data () {
    return {
      stateSelected: '',
      stateCodes: state_codes,
      recent: [],
      daily:[],
      today:[],
      sortBy: 'Confirmed',
      sortDesc: true,
      fields:[
          { key: 'Combined_Key', label:'County', variant: 'light'},
          { key: 'Confirmed', label:'Positive', sortable: true, variant: 'light'},
          { key: 'Recovered', label:'Recovered', variant: 'light'},
          { key: 'Deaths', label:'Deaths', variant: 'light'}
        ],
      items: []
    }
  },
  methods: {
        onChange() {
            let code =this.stateSelected.code;
            console.log(this.stateSelected.code);
            this.getRecentData(code);
            this.getDailyUpdate(code);
            this.getArcGISData(this.stateSelected.name);
        },
        getRecentData(stateCode){
            axios.get('https://covidtracking.com/api/states?state=' + stateCode)
            .then(response => {
                this.recent = response.data;
            })
            .catch( e => {
                console.log(e);
            })
        },
        getDailyUpdate(stateCode){
            axios.get('https://covidtracking.com/api/states/daily?state=' + stateCode)
            .then(response => {
                let data = response.data
            
                let dataSorted = _.orderBy(data, (p) => new Date(p.dateChecked), 'desc');
                this.daily = dataSorted;
                this.today = _.take(dataSorted,1);
            })
            .catch( e => {
                console.log(e);
            })
        },
        getArcGISData(stateName){
            let arcgisEndpoint ='https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases_US/FeatureServer/0/query?where=Province_State%3D%27' + stateName +'%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=Country_Region%2CCombined_Key%2CConfirmed%2CDeaths%2CRecovered%2CActive%2CLast_Update&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=true&orderByFields=&groupByFieldsForStatistics=Last_Update&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=';
            axios.get(arcgisEndpoint)
            .then(response => {
                let data = response.data.features.map((attr) => {
                    return attr.attributes;
                });

                let withCases = _.filter(data, (d) => {
                        return d.Confirmed > 0
                });
                this.items = withCases;
            })
            .catch( e => {
                console.log(e);
            })
        }       
   },
  filters: {
    truncate: function (key) {
        return key.split(",")[0];
    }
  },
  computed: {
    totalTestedIncreaseToday(){
        return this.today.map(p => p.totalTestResultsIncrease);
    },
    totalNegativeIncreaseToday(){
        return this.today.map(p => p.negativeIncrease);
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

  }
}
</script>

<style scoped>
.container{
   max-width: 100%; 
}
.total-count{
    font-size:1.0em;
    font-weight: 700;
}
.new-update-group {
  margin-left: 5px; 
  font-size:.5em;
  font-weight: 500;
}
</style>