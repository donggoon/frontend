// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$appName = '시설공사'
Vue.use(Vuetify)
Vue.prototype.$path = location.host === 'localhost:9090' ? '/corp' : ''

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
