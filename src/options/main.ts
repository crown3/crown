import store from '@/store'
import Vue from 'vue'
import App from './App.vue'

import VApp from 'vuetify/es5/components/VApp'
import VGrid from 'vuetify/es5/components/VGrid'
import VIcon from 'vuetify/es5/components/VIcon'
import VSwitch from 'vuetify/es5/components/VSwitch'
import VTabs from 'vuetify/es5/components/VTabs'
import VTextField from 'vuetify/es5/components/VTextField'
import VToolbar from 'vuetify/es5/components/VToolbar'
import Vuetify from 'vuetify/es5/components/Vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VIcon,
    VSwitch,
    VTabs,
    VTextField,
    VToolbar
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
