import NiaCodeEditor from './NiaCodeEditor.vue'
import NiaConsole from './NiaConsole.vue'
import NiaNavbar from './NiaNavbar.vue'
import NiaNavbarBrand from './NiaNavbarBrand.vue'
import NiaNavbarNav from './NiaNavbarNav.vue'
import NiaNavItem from './NiaNavItem.vue'
import NiaTab from './NiaTab.vue'
import NiaTabs from './NiaTabs.vue'
import NiaToolbar from './NiaToolbar.vue'
import NiaToolbarItem from './NiaToolbarItem.vue'

export default {
  install: function (Vue, options: object) {
    Vue.component('NiaCodeEditor', NiaCodeEditor)
    Vue.component('NiaConsole', NiaConsole)
    Vue.component('NiaNavbar', NiaNavbar)
    Vue.component('NiaNavbarBrand', NiaNavbarBrand)
    Vue.component('NiaNavbarNav', NiaNavbarNav)
    Vue.component('NiaNavItem', NiaNavItem)
    Vue.component('NiaTab', NiaTab)
    Vue.component('NiaTabs', NiaTabs)
    Vue.component('NiaToolbar', NiaToolbar)
    Vue.component('NiaToolbarItem', NiaToolbarItem)
  },
}