import store from '@/store'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VApp from 'vuetify/es5/components/VApp'
import VChip from 'vuetify/es5/components/VChip'
import VGrid from 'vuetify/es5/components/VGrid'
import VList from 'vuetify/es5/components/VList'
import VSwitch from 'vuetify/es5/components/VSwitch'
import VTextField from 'vuetify/es5/components/VTextField'
import VToolbar from 'vuetify/es5/components/VToolbar'
import Vuetify from 'vuetify/es5/components/Vuetify'

import '@/stylus/vuetify.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VList,
    VTextField,
    VToolbar,
    VSwitch,
    VChip,
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
