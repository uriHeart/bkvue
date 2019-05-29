// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'expose-loader?$J!expose-loader?jQuery!jquery'
// import 'v-slim-dialog/dist/v-slim-dialog.css'

Vue.prototype.$rootPath = 'http://localhost:5000'
//Vue.prototype.$rootPath = ''

Vue.prototype.$http = axios

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
