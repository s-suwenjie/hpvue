import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import Axios from 'axios'
import '@/assets/index.js'
import '@/assetsApp/index.js'
import { Photoshop } from 'vue-color'

import echarts from "echarts"
Vue.prototype.$echarts = echarts

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(Photoshop)


import "../staticApp/global.css";

import "../static/staticHStyle/common.css";
import "../static/staticHStyle/manager.css";
import "../static/staticHStyle/chooseBtn.css";
import "../static/common.css";
import "../static/select.css";
import "../static/tbStyle.css";
import "../static/global.css";
import "../static/test.css";
import "../static/bjFlow.css";

Vue.prototype.$ = $
Vue.prototype.$ajax = Axios
Axios.defaults.withCredentials = true

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
