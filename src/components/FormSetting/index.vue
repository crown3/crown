<template>
  <div class="form-setting">
    <ul class="left-nav">
      <li class="item">Bookmark</li>
      <li class="item">Tab</li>
    </ul>

    <div class="form-content">
      <div
        v-for="item in setting.itemSetting"
        :key="item.type"
        class="row-container">
        <h3 class="anchor"># {{ item.type }} {{ getI18nMsg('opt_relatedSettings') }}</h3>
        <p class="row">
          <CheckboxSelect v-model="item.isDefault"/>
          <span>{{ getI18nMsg('opt_searchByDefault',[item.type]) }}</span>
        </p>
        <p class="row">
          <span>{{ getI18nMsg('opt_setKeyword',[item.type]) }}</span>
          <input
            v-model="item.keyword"
            type="text"
            class="input-modify">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxSelect from '../Checkbox-Select/index'

import chromeAPI from '../../api/chrome-api'

import defaultSetting from '../../background/default-setting'

export default {
  components: {
    CheckboxSelect
  },
  data() {
    return {
      setting: defaultSetting
    }
  },
  watch: {
    setting: {
      handler(val) {
        chromeAPI.setConfig(val).then(status => {
          console.log(status)
        })
      },
      deep: true
    }
  },
  created() {
    chromeAPI
      .getConfig()
      .then(setting => {
        this.setting = setting
      })
      .catch(() => {
        throw new Error('get setting error in options')
      })
  },
  methods: {
    getI18nMsg(...args) {
      return chrome.i18n.getMessage(...args)
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
