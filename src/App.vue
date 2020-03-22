<template>
<div id="app">
  <b-card no-body>
    <b-card-header header-tag="nav" footer-tag="footer" >
      <b-nav card-header tabs>
        <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
        <b-nav-item to="/" exact exact-active-class="active"><b-spinner type="grow" small></b-spinner>MN</b-nav-item>
        <b-nav-item to="/us" exact exact-active-class="active"><b-spinner type="grow" small></b-spinner>US</b-nav-item>
        <b-nav-item to="/global" exact exact-active-class="active"><b-spinner type="grow" small></b-spinner>Global</b-nav-item>
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
        <SocialShare />
        <br/>
        <a href="https://vmsdurano.com/" target="_blank">Vincent Maverick Durano</a> © 2020
        <p>
          If you find this project useful — or just feeling generous, consider buying me a beer or a coffee.
        </p>
        <p>
          <a href="https://www.paypal.me/vmsdurano"><img src="https://proudmonkeystorage.blob.core.windows.net/cdn/common/donate_paypal.svg" height="37"></a>
            |  <a href="https://www.buymeacoffee.com/ImP9gONBW"><img src="https://proudmonkeystorage.blob.core.windows.net/cdn/common/donate_coffee.png"></a>
        </p>
    </template>
  </b-card>
</div>
</template>

<script>
import SocialShare from "./components/SocialShare";

export default {
  name: "App",
  components: {
    SocialShare
  }
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 10px;
}
</style>
