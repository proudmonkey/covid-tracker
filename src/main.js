import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin  } from 'bootstrap-vue'
import vueNumeralFilterInstaller from 'vue-numeral-filter'
import App from './App.vue'
import MNStats from './components/MNStats.vue'
import USStats from './components/USStats.vue'
import GlobalStats from './components/GlobalStats.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(vueNumeralFilterInstaller)

const routes = [
  { path: '/', component: MNStats },
  { path: '/us', component: USStats },
  { path: '/global', component: GlobalStats }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

