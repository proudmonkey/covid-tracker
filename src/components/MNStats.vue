
<template>
<div class="text-center">
    <h1>Minnesota COVID-19 Status</h1>
    <h4 class="text-muted">( Data as of {{recent.checkTimeEt}} )</h4>

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
                            <b-iconstack font-scale="5">
                                <b-icon stacked icon="dash" scale="0.5" shift-v="-0.25"></b-icon>
                                <b-icon stacked icon="circle"></b-icon>
                            </b-iconstack>
                        </div>
                        <b-card-title><h1>{{recent.negative | numeral('0,0')}}</h1></b-card-title>
                        <b-card-text class="mb-2">Negative</b-card-text>
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
                <b-card bg-variant="light" class="mb-2">
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
                        <template v-slot:cell(name)="data">
                        <b>{{data.item.attributes.name}}</b>
                        </template>
                        <template v-slot:cell(attributes.confirmed)="data">
                            <b-badge variant="warning">{{data.item.attributes.confirmed | numeral('0,0')}}</b-badge>
                        </template>
                        <template v-slot:cell(recovered)="data">
                        <b-badge variant="success">{{data.item.attributes.recovered | numeral('0,0')}}</b-badge>
                        </template>
                        <template v-slot:cell(deaths)="data">
                        <b-badge variant="danger">{{data.item.attributes.deaths | numeral('0,0')}}</b-badge>
                        </template>
                    </b-table>
                 </b-card>
            </b-col>
            <b-col>
                <b-card bg-variant="dark" text-variant="white" title="Case Trends">
                    <CaseTrendChart />
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import axios from 'axios'
import CaseTrendChart from "./graph/MNCaseTrend.vue";

export default {
  components: {
    CaseTrendChart
  },
  data () {
    return {
      recent: [],
      sortBy: 'attributes.confirmed',
      sortDesc: true,
      fields:[
          { key: 'name', label:'County', variant: 'light'},
          { key: 'attributes.confirmed', label:'Positive', sortable: true, variant: 'light'},
          { key: 'recovered', label:'Recovered', variant: 'light'},
          { key: 'deaths', label:'Deaths', variant: 'light'}
        ],
      items: []
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

    axios.get('https://services.arcgis.com/pEosvuftL1Kgj1UF/ArcGIS/rest/services/Cases_current/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=name%2C+confirmed%2C+recovered%2C+deaths%2C+tested&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=none&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=')
      .then(response => {
        this.items = response.data.features;
      })
      .catch( e => {
        console.log(e);
      })
  }
}
</script>
