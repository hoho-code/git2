import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap';
//引入bootstrap
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
//iview框架

import axios from "axios"
Vue.prototype.$axios=axios
import qs from 'qs';
Vue.prototype.$qs=qs


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
