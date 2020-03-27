
<template>
<div class="text-center">
    <h3>Minnesota Status</h3>
    <h5 class="text-muted">( Data as of {{recent.checkTimeEt}} )</h5>

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
                        <b-card-title><h1>{{recent.positive + recent.negative | numeral('0,0')}}</h1></b-card-title>
                        <b-card-text class="mb-2">Tested</b-card-text>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col>
                <b-card  bg-variant="success" class="mb-2">
                    <b-card-body>
                        <div>
                            <b-iconstack font-scale="5" id="card-icon-neg">
                                <b-icon stacked icon="dash" scale="0.5" shift-v="-0.25"></b-icon>
                                <b-icon stacked icon="circle"></b-icon>
                            </b-iconstack>
                        </div>
                        <b-card-title><h1>{{recent.negative | numeral('0,0')}}</h1></b-card-title>
                        <b-card-text class="mb-2">Negative</b-card-text>
                         <b-tooltip target="card-icon-neg" title="MN stopped providing negative test result numbers on 3/23/20, so negatives are as of 3/22/20"></b-tooltip>
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
                        <b-card-title><h1>{{recent.positive | numeral('0,0')}}</h1></b-card-title>
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
                        <b-card-title><h1>{{recent.hospitalized | numeral('0,0')}}</h1></b-card-title>
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
                        <b-card-title><h1>{{recent.death === null ? 0 : recent.death | numeral('0,0')}}</h1></b-card-title>
                        <b-card-text class="mb-2">Deaths</b-card-text>
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
                             sticky-header="450px"
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
            <b-col>
                <b-card bg-variant="dark" text-variant="white" title="Cases Heat Map" class="mb-2">
                    <CaseTrendMap v-if="items.length > 0" :cases="items"/>
                </b-card>
            </b-col>
        </b-row>
        
    </b-container>

    <b-container class="mt-3">
        <b-row>
            <b-col>
                <b-card bg-variant="dark" text-variant="white" title="Trends By Date" class="mb-2">
                    <CaseTrendDateChart />
                </b-card>
            </b-col>
            <b-col>
                <b-card bg-variant="dark" text-variant="white" title="Trends By County">
                    <CaseTrendCountyChart />
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import axios from 'axios'
import CaseTrendDateChart from "./graph/MNCaseTrend.vue";
import CaseTrendCountyChart from "./graph/MNCountyCaseTrend.vue";
import CaseTrendMap from "./map/MNCases.vue";

export default {
  components: {
    CaseTrendDateChart,
    CaseTrendCountyChart,
    CaseTrendMap
  },
  data () {
    return {
      recent: [],
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
  filters: {
    truncate: function (key) {
        return key.split(",")[0];
    }
  },
  mounted () {
    axios.get('https://covidtracking.com/api/states?state=MN')
      .then(response => {
        this.recent = response.data
      })
      .catch( e => {
        console.log(e);
      })

    axios.get('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases_US/FeatureServer/0/query?where=Province_State%3D%27Minnesota%27+and+Confirmed+%3E+0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=Country_Region%2CCombined_Key%2CConfirmed%2CDeaths%2CRecovered%2CActive%2CLast_Update&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=true&orderByFields=&groupByFieldsForStatistics=Last_Update&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=')
      .then(response => {
        let data = response.data.features.map((attr) => {
            return attr.attributes;
        });

        this.items = data;
      })
      .catch( e => {
        console.log(e);
      })
  }
}
</script>
