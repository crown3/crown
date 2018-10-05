import store from '@/store'
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
