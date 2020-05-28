import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

import Devices from '../views/Devices.vue'
import Editor from '../views/Editor.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/Devices',
    name: 'Devices',
    component: Devices,
  },
  {
    path: '/Editor',
    name: 'Editor',
    component: Editor,
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings,
  },
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
