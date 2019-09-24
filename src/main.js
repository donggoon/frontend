// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuetify from 'vuetify'
import { store } from './store/store'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$appName = '시설공사'
Vue.use(Vuetify)
Vue.prototype.$path = location.host === 'localhost:9090' ? '/corp' : ''
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err)
  alert(`요청하신 페이지에서 에러가 발생하였습니다.\n죄송합니다.\n관리자에게 문의해 주시기 바랍니다.\n잠시 후 정산서 현황 페이지로 돌아갑니다.`)
  router.push({
    name: 'WorkList'
  })
}
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
