<template>
  <div class="StateCaseDateChart">
    <line-chart
      :width="300" 
      :height="300"
      v-if="loaded"
      :chart-data="chartData"/>
  </div>
</template>

<script>
import LineChart from './LineChartDynamic.vue'
import * as moment from "moment/moment";

export default {
  name: 'LineChartContainer',
  props: ['cases'],
  components: { LineChart },
  data() {
      return {
        loaded: false,
        agg:[],
        chartData: null
      }
  },
  methods:{
    fillData(){
        this.chartData = {
            labels: this.dateReported,
            datasets: [
                {
                    label: 'Deaths',
                    backgroundColor: '#dc3545',
                    data: this.totalDeaths
                },
                {
                    label: 'Hospitalized',
                    backgroundColor: '#6c757d',
                    data: this.totalHospitalized
                },
                {
                    label: 'Cases',
                    backgroundColor: '#ffc107',
                    data: this.totalCases
                },
            ]           
        }       
    }
  },
  computed: {
        totalCases(){
            return this.agg.map(p => p.positive || 0);
        },
        totalHospitalized(){
            return this.agg.map(p => p.hospitalized || 0);
        },
        totalDeaths(){
            return this.agg.map(p => p.death || 0);
        },
        dateReported(){
            return this.agg.map(p => moment(p.dateChecked).format('MM/DD'));
        }
  },
 mounted () {
    this.loaded = false

     if(this.cases.length > 0){
        this.agg = this.cases;
        this.fillData();
        this.loaded = true;
    }
  }
}
</script>
