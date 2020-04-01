<template>
  <div class="StateCountyCaseChart">
    <line-chart
      v-if="loaded"
      :width="300" 
      :height="300"
      :chart-data="chartData"/>
  </div>
</template>

<script>
import LineChart from './LineChartPublicDynamic.vue'

export default {
  name: 'LineChartContainer',
  props: ['cases'],
  components: { LineChart },
  data() {
      return {
        loaded: false,
        agg:[]
      }
  },
  methods:{
    fillData(){
        this.chartData = {
            labels: this.totalCounty,
            datasets: [
            {
                label: 'Deaths',
                backgroundColor: '#dc3545',
                data: this.totalDeaths
            },
            {
                label: 'Recovered',
                backgroundColor: '#28a745',
                data: this.totalRecovery
            },
            {
                label: 'Active',
                backgroundColor: '#fd7e14',
                data: this.totalActive
            },
            {
                label: 'Cases',
                backgroundColor: '#ffc107',
                data: this.totalCases
            }
        ]           
        }       
    }
  },
  computed: {
        totalCases(){
            return this.agg.map(p => p.Confirmed);
        },
        totalRecovery(){
            return this.agg.map(p => p.Recovered);
        },
        totalDeaths(){
            return this.agg.map(p => p.Deaths);
        },
        totalActive(){
            return this.agg.map(p => p.Active);
        },
        totalCounty(){
            return this.agg.map(p => p.Combined_Key.split(",")[0]);
        },
},
 mounted () {
    this.loaded = false;
    if(this.cases.length > 0){
        this.agg = this.cases;
        this.fillData();
        this.loaded = true;
    }
  }
}
</script>
