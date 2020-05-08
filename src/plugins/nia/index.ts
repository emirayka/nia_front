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

import Vue from 'vue'

export default {
  install: function (_vue: typeof Vue, options: object) {
    _vue.component('NiaCodeEditor', NiaCodeEditor)
    _vue.component('NiaConsole', NiaConsole)
    _vue.component('NiaNavbar', NiaNavbar)
    _vue.component('NiaNavbarBrand', NiaNavbarBrand)
    _vue.component('NiaNavbarNav', NiaNavbarNav)
    _vue.component('NiaNavItem', NiaNavItem)
    _vue.component('NiaTab', NiaTab)
    _vue.component('NiaTabs', NiaTabs)
    _vue.component('NiaToolbar', NiaToolbar)
    _vue.component('NiaToolbarItem', NiaToolbarItem)
  },
}