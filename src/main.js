import Vue from 'vue'
import App from './App'
import utils from './utils/index'
import store from './store/index.js'
//原型上绑定配置文件
import config from './config/index'
Vue.prototype.$config = config
Vue.prototype.$store = store

Vue.config.productionTip = false
Vue.use(utils)

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
