import defaultConfig from '@/background/default-config'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

interface ChangeConfigPayload {
  type: 'bookmark' | 'tab' | 'RCT'
  key: 'isDefault' | 'keyword'
  value: string | boolean
}

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    config: defaultConfig,
  },
  mutations: {
    changeItemConfig(state, { type, key, value }: ChangeConfigPayload) {
      state.config[type][key] = value
    },
  },
  plugins: [
    createPersistedState({
      key: process.env.VUE_APP_VERSION,
    }),
  ],
})
