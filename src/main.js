import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'

// import '../static/css/theme-green/index.css';       // 浅绿色主题
import 'babel-polyfill'

import indexServer from './api/indexServer.js'
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.prototype.$indexServer = indexServer

Vue.use(ElementUI)
Vue.prototype.$axios = axios
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
