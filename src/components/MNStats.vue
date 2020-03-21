
<template>
<div class="text-center">
    <h1>Minnesota COVID-19 Status</h1>
    <h3 class="text-muted">( Data as of {{recent.checkTimeEt}} )</h3>

    <b-container class="bv-example-row mt-5">
        <b-row>
            <b-col>
                <b-card bg-variant="info">
                    <b-card-body>
                         <template>
                            <div>
                                <b-iconstack font-scale="5">
                                    <b-icon stacked icon="question" scale="0.5" shift-v="-0.25"></b-icon>
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
                                <b-icon stacked icon="check" scale="0.5" shift-v="-0.25" animation="cylon-vertical"></b-icon>
                                <b-icon stacked icon="circle"></b-icon>
                            </b-iconstack>
                        </div>
                        <b-card-title><h1>{{recent.negative | numeral('0,0')}}</h1></b-card-title>
                        <b-card-text class="mb-2">Negative</b-card-text>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col>
                <b-card  bg-variant="warning">
                    <b-card-body>
                        <div>
                            <b-iconstack font-scale="5">
                                <b-icon stacked icon="shield-lock" scale="0.5" shift-v="-0.25"></b-icon>
                                <b-icon stacked icon="circle"></b-icon>
                            </b-iconstack>
                        </div>
                        <b-card-title><h1>{{recent.positive | numeral('0,0')}}</h1></b-card-title>
                        <b-card-text class="mb-2">Positive</b-card-text>
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

    <div class="mt-5">
       Source: <a href="https://www.health.state.mn.us/diseases/coronavirus/situation.html" target="_blank" class="card-link">MN Department of Health</a> 
       | Data: <a href="https://covidtracking.com/" target="_blank">US COVID Tracking</a>
       | ESRI: <a href="https://bao.arcgis.com/InfographicsPlayer/ArcGISPro/BA_Covid19Files/minnesota.html" target="_blank">Cases and Planning Report</a>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      recent: []
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
  }
}
</script>
