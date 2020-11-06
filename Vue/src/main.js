import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
