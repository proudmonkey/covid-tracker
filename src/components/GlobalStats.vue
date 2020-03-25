<template>
    <div>
        <h1>Global Status</h1>
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
                            <div>
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="plus" scale="0.5" shift-v="-0.25"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><h4>{{totalCorfirmed | numeral('0,0')}}</h4></b-card-title>
                            <b-card-text class="mb-2">Positve</b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card bg-variant="success" class="mb-2">
                        <b-card-body>
                            <div>
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="check" scale="0.5" shift-v="-0.25"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><h4>{{totalRecovered | numeral('0,0')}}</h4></b-card-title>
                            <b-card-text class="mb-2">Recovered</b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card style="background-color:#fd7e14" class="mb-2">
                        <b-card-body>
                            <div>
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="shield-lock" scale="0.5" shift-v="-0.25"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><h4>{{totalActive | numeral('0,0')}}</h4></b-card-title>
                            <b-card-text class="mb-2">Active</b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card  bg-variant="danger" class="mb-2">
                        <b-card-body>
                            <div>
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="x-circle" scale="0.5" shift-v="-0.25" animation="spin"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><h4>{{ totalDeaths | numeral('0,0')}}</h4></b-card-title>
                            <b-card-text class="mb-2">Deaths</b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card bg-variant="light">
                        <b-card-body>
                            <div>
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="flag" scale="0.5"></b-icon>
                                    <b-icon stacked icon="circle"></b-icon>
                                </b-iconstack>
                            </div>
                            <b-card-title><h4>{{ countryCount | numeral('0,0')}}</h4></b-card-title>
                            <b-card-text class="mb-2">Countries</b-card-text>
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
                    <template v-slot:cell(Confirmed)="data">
                        <b-badge variant="warning">{{data.item.Confirmed | numeral('0,0')}}</b-badge>
                    </template>
                    <template v-slot:cell(Recovered)="data">
                        <b-badge variant="success">{{data.item.Recovered | numeral('0,0')}}</b-badge>
                    </template>
                    <template v-slot:cell(Deaths)="data">
                        <b-badge variant="danger">{{data.item.Deaths | numeral('0,0')}}</b-badge>
                    </template>
                    <template v-slot:cell(Active)="data">
                        <b-badge style="background-color:#fd7e14; color:black">{{data.item.Active | numeral('0,0')}}</b-badge>
                    </template>
                    <template v-slot:cell(Last_Update)="data">
                        <b>{{ data.item.Last_Update | moment}}</b>
                    </template>
                </b-table>
            </b-card>
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'
import * as moment from "moment/moment";

export default {
  data () {
    return {
      countryCount:0,
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
            console.log(data);
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