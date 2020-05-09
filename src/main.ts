import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import NiaComponents from '@/plugins/nia'

Vue.config.productionTip = false

// Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(NiaComponents)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
