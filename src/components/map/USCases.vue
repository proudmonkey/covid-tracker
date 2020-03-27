
<template>
  <div class="USMap" ref="mapdiv">
  </div>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usa from "@amcharts/amcharts4-geodata/usaLow";


export default {
  props: ['cases'],
  name: 'USMap',
  mounted() {

    // we will create the chart here
    let map = am4core.create(this.$refs.mapdiv, am4maps.MapChart);
    map.geodata = am4geodata_region_usa;
    map.projection = new am4maps.projections.AlbersUsa();

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

    const dataPlot = this.cases.map((i) =>{
        return {
            id: 'US-'+ i.state,
            value: i.positive
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

    }
}
</script>

<style scoped>
.USMap {
  width: 100%;
  height: 400px;
}
</style>