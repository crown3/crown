import defaultConfig from '@/background/default-config'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

interface ChangeItemConfigPayload {
  type: 'bookmark' | 'tab' | 'RCT'
  key: 'isDefault' | 'keyword'
  value: string | boolean
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    config: defaultConfig,
  },
  mutations: {
    changeItemConfig(state, payload: ChangeItemConfigPayload) {
      state.config.itemSet[payload.type][payload.key] = payload.value
    },
  },
  plugins: [createPersistedState()],
})
