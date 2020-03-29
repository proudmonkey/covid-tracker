<template>
  <div class="MNMap" ref="mapdiv">
  </div>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usa_mn from "@amcharts/amcharts4-geodata/region/usa/mnHigh";

export default {
    props: ['cases'],
    name: 'MNMap',
    geoMN: {},
    methods: {
    truncate: (key) => {
        return key.split(",")[0];
    },
    getCase: (name,obj) => {
            for(let i = 0; i < obj.length; i++){
                let county = obj[i].county.replace('St.','Saint');
                if(county == name){
                    return(obj[i].cases);
                }
            }      
        }
    },
    mounted() {

        // we will create the chart here
        let map = am4core.create(this.$refs.mapdiv, am4maps.MapChart);
        map.geodata = am4geodata_region_usa_mn;
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

        let geoMN = [];
        fetch('https://www.amcharts.com/lib/4/geodata/json/region/usa/mnLow.json')
            .then(r => r.json())
            .then(json => {
                geoMN = json.features;
                        
                const cases = this.cases.map((i) =>{
                return {
                    county: this.truncate(i.Combined_Key),
                    cases: i.Confirmed
                }
            });

            const dataPlot = geoMN.map((i) => {
                return {
                    id: i.properties.id,
                    value: this.getCase(i.properties.name, cases)
                }
            });

            polygonSeries.data= dataPlot;
            polygonTemplate.propertyFields.fill = "fill";
        });

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
.MNMap {
  width: 100%;
  height: 417px;
}
</style>