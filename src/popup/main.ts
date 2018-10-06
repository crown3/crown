import store from '@/store'
import Vue from 'vue'
import App from './App.vue'

import VApp from 'vuetify/es5/components/VApp'
import VGrid from 'vuetify/es5/components/VGrid'
import VList from 'vuetify/es5/components/VList'
import VTextField from 'vuetify/es5/components/VTextField'
import VToolbar from 'vuetify/es5/components/VToolbar'
import Vuetify from 'vuetify/es5/components/Vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VList,
    VTextField,
    VToolbar
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
