<template>
    <div >
        <h1>US COVID-19 Status</h1>
        <b-table striped hover :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :no-sort-reset="true" >
            <template v-slot:head(total)>
                 Tested (<span class="text-info">{{totalTestsCount | numeral('0,0')}}</span>)
            </template>
            <template v-slot:head(positive)>
                Positive (<span class="text-warning">({{totalPositiveCount | numeral('0,0')}}</span>)
            </template>
            <template v-slot:head(death)>
                Deaths (<span class="text-danger">{{ totalDeathCount | numeral('0,0')}}</span>)
            </template>
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