import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'

import '@/components/nia'

import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

import FontAwesomeIcon from '@/utils/font-awesome-loader'

Vue.component('fa-icon', FontAwesomeIcon)

Vue.use(PerfectScrollbar)

Vue.config.productionTip = false

const vue: Vue = new Vue({
  router,
  store: store.original,
  render: h => h(App),
})

vue.$mount('#app')
