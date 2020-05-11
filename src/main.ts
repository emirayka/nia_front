import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'

import '@/components/nia'

Vue.config.productionTip = false

// Vue.use(NiaComponents)

const vue: Vue = new Vue({
  router,
  store: store.original,
  render: h => h(App),
})

vue.$mount('#app')
