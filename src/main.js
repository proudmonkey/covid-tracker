import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons  } from 'bootstrap-vue'
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import App from './App.vue'
import MNStats from './components/MNStats.vue'
import USStats from './components/USStats.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)

Vue.use(vueNumeralFilterInstaller);

const routes = [
  { path: '/', component: MNStats },
  { path: '/us', component: USStats }
]
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
