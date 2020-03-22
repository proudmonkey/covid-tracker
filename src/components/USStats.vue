<template>
    <div >
        <h1>US COVID-19 Status</h1>
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
                            <b-card-title><h1>{{totalTestsCount | numeral('0,0')}}</h1></b-card-title>
                            <b-card-text class="mb-2">Tested</b-card-text>
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
                            <b-card-title><h1>{{totalPositiveCount | numeral('0,0')}}</h1></b-card-title>
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
                            <b-card-title><h1>{{ totalDeathCount | numeral('0,0')}}</h1></b-card-title>
                            <b-card-text class="mb-2">Deaths</b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

        <div class="mt-3">
            <b-table head-variant="dark" hover :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :no-sort-reset="true" >
                <template v-slot:cell(state)="data">
                <b>{{data.item.state}}</b>
                </template>
                <template v-slot:cell(total)="data">
                <b class="text-info">{{data.item.positive + data.item.negative | numeral('0,0')}}</b>
                </template>
                <template v-slot:cell(positive)="data">
                <b class="text-warning">{{data.item.positive | numeral('0,0')}}</b>
                </template>
                <template v-slot:cell(death)="data">
                <b class="text-danger">{{data.item.death | numeral('0,0')}}</b>
                </template>
            </b-table>
        </div>
        <div class="mt-5">
            Source: <a href="https://www.health.state.mn.us/diseases/coronavirus/situation.html" target="_blank" class="card-link">MN Department of Health</a> 
            | Data: <a href="https://covidtracking.com/" target="_blank">US COVID Tracking</a>
            | CDC: <a href="https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html" target="_blank">US Cases Report</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      sortBy: 'positive',
      sortDesc: true,
      fields:[
          'state',
          { key: 'total', label:'Total Tested'},
          { key: 'positive', label:'Positive', sortable: true},
          { key: 'death', label:'Deaths'},
          { key: 'lastUpdateEt', label:'Last Synced (ET)'}
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
  }
}
</script>