import store from '@/store'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VApp from 'vuetify/es5/components/VApp'
import VGrid from 'vuetify/es5/components/VGrid'
import VIcon from 'vuetify/es5/components/VIcon'
import VList from 'vuetify/es5/components/VList'
import VSwitch from 'vuetify/es5/components/VSwitch'
import VTabs from 'vuetify/es5/components/VTabs'
import VTextField from 'vuetify/es5/components/VTextField'
import VToolbar from 'vuetify/es5/components/VToolbar'
import Vuetify from 'vuetify/es5/components/Vuetify'

import '@/stylus/vuetify.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VList,
    VTextField,
    VToolbar,
    VIcon,
    VSwitch,
    VTabs
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
