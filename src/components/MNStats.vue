
<template>
<div class="text-center">
    <h1>Minnesota COVID-19 Status</h1>
    <h3 class="text-muted">( Data as of {{recent.checkTimeEt}} )</h3>

    <b-container class="mt-3">
        <b-row>
            <b-col>
                <b-card bg-variant="info">
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
                <b-card  bg-variant="success">
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
                <b-card bg-variant="warning">
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
                <b-card bg-variant="light">
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

    <div class="mt-3">
        <b-table head-variant="dark" hover :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :no-sort-reset="true" >
            <template v-slot:cell(name)="data">
               <b>{{data.item.attributes.name}}</b>
            </template>
            <template v-slot:cell(attributes.confirmed)="data">
                <b-badge variant="dark">{{data.item.attributes.confirmed | numeral('0,0')}}</b-badge>
            </template>
            <template v-slot:cell(recovered)="data">
               <b-badge variant="dark">{{data.item.attributes.recovered | numeral('0,0')}}</b-badge>
            </template>
            <template v-slot:cell(deaths)="data">
               <b-badge variant="danger">{{data.item.attributes.deaths | numeral('0,0')}}</b-badge>
            </template>
        </b-table>
    </div>

    <div class="mt-5">
       Sources: <a href="https://www.health.state.mn.us/diseases/coronavirus/situation.html" target="_blank" class="card-link">MN Department of Health</a> 
       | <a href="https://covidtracking.com/" target="_blank">US COVID Tracking</a>
       | <a href="https://services.arcgis.com/pEosvuftL1Kgj1UF/ArcGIS/rest/services" target="_blank">ArcGIS</a>
       | <a href="https://bao.arcgis.com/InfographicsPlayer/ArcGISPro/BA_Covid19Files/minnesota.html" target="_blank">ESRI Cases and Planning Report</a>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      recent: [],
      sortBy: 'attributes.confirmed',
      sortDesc: true,
      fields:[
          { key: 'name', label:'County'},
          { key: 'attributes.confirmed', label:'Positive', sortable: true},
          'recovered',
          'deaths'
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
