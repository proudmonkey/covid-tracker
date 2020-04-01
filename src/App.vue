<template>
<div id="app">
<b-container>
  <b-card no-body
        header-bg-variant="dark"
        header-text-variant="white"
        align="left">
        <template v-slot:header>
          <h5 class="mb-0"><b-icon icon="graph-up" variant="warning"></b-icon> COVID-19 Pandemic Tracker</h5>
          <TipsTicker />
        </template>
  </b-card>
  <b-card no-body>
    <b-card-header header-tag="nav" footer-tag="footer" >
      <b-nav card-header tabs >
        <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
        <b-nav-item to="/" exact exact-active-class="active"><b-spinner type="grow" variant="danger" small></b-spinner>MN</b-nav-item>
        <b-nav-item to="/state" exact exact-active-class="active"><b-spinner type="grow" variant="danger" small></b-spinner>STATE</b-nav-item>
        <b-nav-item to="/us" exact exact-active-class="active"><b-spinner type="grow" variant="danger" small></b-spinner>US</b-nav-item>
        <b-nav-item to="/global" exact exact-active-class="active"><b-spinner type="grow" variant="danger" small></b-spinner>GLOBAL</b-nav-item>
        <b-nav-item to="/news" exact exact-active-class="active">NEWS</b-nav-item>
        
      </b-nav>
    </b-card-header>

    <b-card-body>
      <!-- Child route gets rendered in <router-view> or <nuxt-child> -->
      <router-view></router-view>
      <!-- Or if using Nuxt.js
      <nuxt-child></nuxt-child>
      -->
    </b-card-body>
    <template v-slot:footer>
        <div style="font-size:.5em;">
          THIS WEBSITE SERVES AS AN ALTERNATIVE RESOURCE TO HELP KEEP THE PUBLIC UPDATED ON THE STATUS OF THE NCOV VIRUS. THE CONTENT OF THIS WEBSITE USES A NUMBER OF OPEN SOURCE DATASETS FROM AVAILABLE API SERVICES, INCLUDING DATA, MAPS, PLOTS AND LINKS. THE CREATOR OF THIS WEBSITE DOES NOT OWN, MAINTAIN, MODIFY THE DATASETS AND PROVIDES NO WARRANTIES, CLAIMS OR REPRESENTATIONS–WHETHER EXPRESSED, IMPLIED, OR STATUTORY–WITH RESPECT TO THIS WEBSITE, INCLUDING, WITHOUT LIMITATION, WARRANTIES OF QUALITY, PERFORMANCE, NON–INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE, AND DISAVOWS ANY WARRANTIES CREATED BY COURSE OF DEALING, COURSE OF PERFORMANCE, OR TRADE USAGE. RELIANCE ON THE WEBSITE FOR MEDICAL GUIDANCE IS STRICTLY PROHIBITED.
        </div>
        <div class="mt-2 mb-2">
          Sources: <a href="https://www.health.state.mn.us/diseases/coronavirus/situation.html" target="_blank" class="card-link">MN Department of Health</a> 
          | <a href="https://covidtracking.com/" target="_blank">US COVID Tracking Project</a>
          | <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">JHU CSSE</a>
          | <a href="https://coronavirus-resources.esri.com/" target="_blank">ArcGIS and ESRI</a>
          | <a href="https://bao.arcgis.com/InfographicsPlayer/ArcGISPro/BA_Covid19Files/minnesota.html" target="_blank">ArcGIS Cases and Planning Report</a>
        </div>
        <SocialShare />
        
        <p class="mt-2">
          If you find this project useful — or just feeling generous, consider buying me a beer or a coffee.
        </p>
        <div class="donate">
          <a href="https://www.buymeacoffee.com/ImP9gONBW"><img src="https://proudmonkeystorage.blob.core.windows.net/cdn/common/donate_coffee.png"></a>
          <a href="https://www.paypal.me/vmsdurano"><img src="https://proudmonkeystorage.blob.core.windows.net/cdn/common/donate_paypal.svg" height="37"></a>
        </div>
        <div class="mt-3">
          2020 By <a href="https://vmsdurano.com/" target="_blank">Vincent Maverick Durano</a> 
        </div>
    </template>
  </b-card>
  </b-container>
</div>
</template>

<script>
import SocialShare from "./components/SocialShare";
import TipsTicker from "./components/TipsTicker";

export default {
  name: "App",
  components: {
    SocialShare,
    TipsTicker
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 10px;
}
.container{
   max-width: 1400px; 
}

.donate > a {
  padding: .5em;
}
.donate > a > img{
  margin-bottom:.5em;
}

.main-card-header {
    color: white !important;
    background-color: #343a40 !important;
}
</style>
