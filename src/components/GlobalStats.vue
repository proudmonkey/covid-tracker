<template>
    <div>
        <h3>Global Status</h3>
        <div class="mt-3" v-if="offline">
            <b-icon icon="x-circle" scale="3"></b-icon>
            <h1>Oops!</h1>
            <p>The downstream service is down at the moment.</p>
        </div>
        
        <b-container class="mt-3">
            <b-row>
                <b-col>
                    <b-card bg-variant="warning" class="mb-2">
                        <b-card-body>
                            <div class="mb-2">
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="person-plus" scale="0.5" shift-v="-0.25"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><span class="total-count">{{totalCorfirmed | numeral('0,0')}}</span></b-card-title>
                            <b-card-text class="mb-2"><h5>POSITIVE</h5></b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card bg-variant="success" class="mb-2">
                        <b-card-body>
                            <div class="mb-2">
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="person-check" scale="0.5" shift-v="-0.25"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><span class="total-count">{{totalRecovered | numeral('0,0')}}</span></b-card-title>
                            <b-card-text class="mb-2"><h5>RECOVERED</h5></b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card style="background-color:#fd7e14" class="mb-2">
                        <b-card-body>
                            <div class="mb-2">
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="person-plus-fill" scale="0.5" shift-v="-0.25"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><span class="total-count">{{totalActive | numeral('0,0')}}</span></b-card-title>
                            <b-card-text class="mb-2"><h5>ACTIVE</h5></b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card  bg-variant="danger" class="mb-2">
                        <b-card-body>
                            <div class="mb-2">
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="x-circle" scale="0.5" shift-v="-0.25" animation="spin"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><span class="total-count">{{ totalDeaths | numeral('0,0')}}</span></b-card-title>
                            <b-card-text class="mb-2"><h5>DEATHS</h5></b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card bg-variant="light">
                        <b-card-body>
                            <div class="mb-2">
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="flag" scale="0.5"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><span class="total-count">{{ countryCount | numeral('0,0')}}</span></b-card-title>
                            <b-card-text class="mb-2"><h5>COUNTRIES</h5></b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

        <b-container class="mt-3">
            <b-card bg-variant="dark" text-variant="white" title="Cases by Country" class="mb-2">
                <b-table head-variant="dark" 
                         responsive 
                         small 
                         sticky-header="600px"
                         :no-border-collapse="true"
                         :items="items" 
                         :fields="fields" 
                         :sort-by.sync="sortBy" 
                         :sort-desc.sync="sortDesc" 
                         :no-sort-reset="true">
                    <template v-slot:cell(Country_Region)="data">
                        <b>{{data.item.Country_Region}}</b>
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
                    <template v-slot:head(Active)="data">
                        <span style="color:#fd7e14">{{ data.label }}</span>
                    </template>
                    <template v-slot:cell(Active)="data">
                        <b-badge variant="dark">{{data.item.Active | numeral('0,0')}}</b-badge>
                    </template>
                    <template v-slot:head(Deaths)="data">
                        <span class="text-danger">{{ data.label }}</span>
                    </template>
                    <template v-slot:cell(Deaths)="data">
                        <b-badge variant="dark">{{data.item.Deaths | numeral('0,0')}}</b-badge>
                    </template>
                    <template v-slot:cell(Last_Update)="data">
                        <b>{{ data.item.Last_Update | moment}}</b>
                    </template>
                </b-table>
            </b-card>
        </b-container>

        <b-container class="mt-2">
            <b-row>
                <b-col>
                    <b-card bg-variant="dark" text-variant="white" title="Top 10" class="mb-2">
                        <CaseTrendGlobalChart v-if="topCountryWithCases.length > 0" :cases="topCountryWithCases"/>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card bg-variant="dark" text-variant="white" title="Cases Heat Map">
                        <CaseTrendMap v-if="items.length > 0" :cases="items"/>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

        <b-container class="mt-2">
            <b-row>
                <b-col>
                    <b-card bg-variant="dark" text-variant="white" title="Philippines" class="mb-2">
                        <b-card-text>
                        To my fellow filipinos who want to get the latest situation update in the Philippines and specific cities,
                        I would recommend visiting the NCOV Tracker built by my coworker <a href="https://judedaryl.github.io/" target="_blank"> Daryl Clarino </a> below. 
                        </b-card-text>
                        <b-button href="https://trackncovph.jclarino.com/" target="_blank" variant="primary">COVID Tracker Philippines</b-button>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card bg-variant="dark" text-variant="white" title="JHU CSSE" class="mb-2">
                        <b-card-text>
                            Mapping 2019-nCoV and interactive visual dashboard provided by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE).
                            You can also visit their interactive dashboard <a href="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6" target="_blank">here.</a>
                            <br/>
                        </b-card-text>
                        <b-button href="https://systems.jhu.edu/research/public-health/ncov/" target="_blank" variant="primary">Learn more</b-button>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>                          
    </div>
</template>

<script>
import axios from 'axios'
import * as moment from "moment/moment";
import _ from 'lodash'
import CaseTrendGlobalChart from "./graph/GlobalCaseTrend.vue";
import CaseTrendMap from "./map/GlobalCases.vue";

export default {
  components: {
    CaseTrendGlobalChart,
    CaseTrendMap
  },
  data () {
    return {
      countryCount:0,
      topCountryWithCases:[],
      offline: false,
      sortBy: 'Confirmed',
      sortDesc: true,
      fields:[
          { key: 'Country_Region', label:'Country', variant: 'light'},
          { key: 'Confirmed', label:'Positive', sortable: true, variant: 'light'},
          { key: 'Recovered', label:'Recovered', variant: 'light'},
          { key: 'Active', label:'Active', variant: 'light'},
          { key: 'Deaths', label:'Deaths', variant: 'light'},
          { key: 'Last_Update', label:'Last Synced', variant: 'light'}
        ],
      items: []
    }
  },
  filters: {
    moment: function (date) {
        return moment(date).format('MM/DD h:mm');
    }
  },
  computed: {
        totalCorfirmed: function(){
            return this.items.reduce(function(total, item){
            return total + item.Confirmed; 
            },0);
        },
        totalRecovered: function(){
            return this.items.reduce(function(total, item){
            return total + item.Recovered; 
            },0);
        },
        totalDeaths: function(){
            return this.items.reduce(function(total, item){
            return total + item.Deaths; 
            },0);
        },
        totalActive: function(){
            return this.items.reduce(function(total, item){
            return total + item.Active; 
            },0);
        }
  },
  mounted () {
    this.offline = false;
    axios.get('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases/FeatureServer/2/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=Country_Region%2CConfirmed%2CDeaths%2CRecovered%2CActive%2CLast_Update&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token')
      .then(response => {
        let resp = response.data;
        if(resp["error"] == null){
             let data = resp.features.map((attr) => {
                return attr.attributes;
             });

            this.items = data;
            this.countryCount = data.length;

            let dataSorted = _.orderBy(data,['Confirmed'],['desc']);
            this.topCountryWithCases = _.take(dataSorted,10);
        }
        else
        {
            this.offline = true;
        }
      })
      .catch(e => {
        console.log(e);
      })
  }
}
</script>

<style scoped>
.container{
   max-width: 100%; 
}
.total-count{
    font-size:1.2em;
    font-weight: 700;
}
</style>