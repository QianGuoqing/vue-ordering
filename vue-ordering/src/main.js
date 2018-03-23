// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://wd2468178309upkmpi.wilddogio.com/'

// 配置Vue原型（在任何组件中都可以正常使用axios，而不需要另外导入axios了）
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

