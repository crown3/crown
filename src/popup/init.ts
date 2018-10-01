import store from '@/store'
import Vue, { VueConstructor } from 'vue'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify)

// init popup
function init(ele: string, app: VueConstructor<Vue>) {
  new Vue({
    store,
    render: h => h(app)
  }).$mount(ele)
}

export default init
