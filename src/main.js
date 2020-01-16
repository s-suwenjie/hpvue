import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import Axios from 'axios'
import '@/assets/index.js'
import '@/assetsApp/index.js'
import VueClipboard from 'vue-clipboard2'
import { ImagePreview,Tabbar, TabbarItem ,Tab,Tabs} from 'vant'
import 'vant/lib/index.css';
Vue.use(ImagePreview).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs)
Vue.use(VueClipboard)

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
