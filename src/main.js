import Vue from 'vue'
import VueSession from 'vue-session'
import 'babel-polyfill'

import App from './App'
import router from './router'
import store from './store'
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueTextareaAutosize)
Vue.use(VueSession)
Vue.config.productionTip = false
const moment = require('moment')
require('moment/locale/tr')

Vue.use(require('vue-moment'), {
  moment
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
