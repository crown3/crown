<template>
  <div class="form-setting">
    <ul class="left-nav">
      <li class="item">Bookmark</li>
      <li class="item">Tab</li>
    </ul>

    <div class="form-content">
      <!-- Bookmark setting -->
      <div class="row-container">
        <h3 class="anchor"># {{ getI18nMsg('bookmark') }} {{ getI18nMsg('opt_relatedSettings') }}</h3>
        <p class="row">
          <CheckboxSelect v-model="setting.itemSetting.bookmark.isDefault"/>
          <span>{{ getI18nMsg('opt_searchByDefault',[getI18nMsg('bookmark')]) }}</span>
        </p>
        <p class="row">
          <input
            v-model="setting.itemSetting.bookmark.keyword"
            type="text"
            class="input-modify">
          <span>{{ getI18nMsg('opt_setKeyword',[getI18nMsg('bookmark')]) }}</span>
        </p>
      </div>

      <!-- Tab setting -->
      <div class="row-container">
        <h3 class="anchor"># {{ getI18nMsg('tab') }} {{ getI18nMsg('opt_relatedSettings') }}</h3>
        <p class="row">
          <CheckboxSelect v-model="setting.itemSetting.tab.isDefault"/>
          <span>{{ getI18nMsg('opt_searchByDefault',[getI18nMsg('tab')]) }}</span>
        </p>
        <p class="row">
          <input
            v-model="setting.itemSetting.tab.keyword"
            type="text"
            class="input-modify">
          <span>{{ getI18nMsg('opt_setKeyword',[getI18nMsg('tab')]) }}</span>
        </p>
        <p class="row">
          <input
            v-model="setting.itemSetting.closedTab.keyword"
            type="text"
            class="input-modify">
          <span>{{ getI18nMsg('opt_setKeyword',[getI18nMsg('closedTab')]) }}</span>
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
        chromeAPI.setConfig(val)
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

<style lang="styl">
@import './index.styl';
</style>
