<template>
  <div class="GlobalMap" ref="mapdiv">
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_world from "@amcharts/amcharts4-geodata/worldLow";
import country_codes from './json/countrycodes.json'


export default {
  props: ['cases'],
  name: 'GlobalMap',
    data () {
    return {
        codes: country_codes
    }
  },
  methods: {
    getCase: (name,obj) => {
            for(let i = 0; i < obj.length; i++){
                let county = obj[i].Country_Region;
                if(county == name){
                    return(obj[i].Confirmed);
                }
            }      
        }
    },
  mounted() {

    // we will create the chart here
    let map = am4core.create(this.$refs.mapdiv, am4maps.MapChart);
    map.geodata = am4geodata_world;
    map.projection = new am4maps.projections.Miller();

    let polygonSeries = new am4maps.MapPolygonSeries();
    map.series.push(polygonSeries);
    polygonSeries.useGeodata = true;

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.fill = am4core.color("#74B266");

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#6c757d");

    const dataPlot = this.codes.map((i) => {
                return {
                    id: i.code,
                    value: this.getCase(i.name, this.cases)
                }
        });

    polygonSeries.data= dataPlot;
    polygonTemplate.propertyFields.fill = "fill";

    polygonSeries.heatRules.push({
        "property": "fill",
        "target": polygonSeries.mapPolygons.template,
        "min": am4core.color("#f2eca7"),
        "max": am4core.color("#ffc107")
    });

    this.chart = map;

    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}
</script>

<style scoped>
.GlobalMap {
  width: 100%;
  height: 592px;
}
</style>