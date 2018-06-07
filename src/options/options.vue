<template>
  <div class="content-container">
    <div class="nav">
      <p class="versions">{{ getI18nMsg('versions') }}: <span class="versions-num">2.0.0</span></p>
      <div class="tabs">
        <div
          :class="{'is-active': activeTab===1}"
          class="tab-item"
          @click="activeTab=1">{{ getI18nMsg('opt_setting') }}</div>
        <div
          :class="{'is-active': activeTab===2}"
          class="tab-item"
          @click="activeTab=2">{{ getI18nMsg('opt_about') }}</div>
      </div>
    </div>

    <div class="content has-padding">
      <FormSetting v-show="activeTab===1"/>
      <Content v-show="activeTab===2"/>
    </div>
  </div>
</template>

<script>
import Content from '@/components/content'
import FormSetting from '@/components/FormSetting/index'

export default {
  components: {
    Content,
    FormSetting,
  },
  data() {
    return {
      activeTab: 1,
    }
  },
  methods: {
    getI18nMsg(...args) {
      return chrome.i18n.getMessage(...args)
    },
  },
}
</script>

<style lang="styl">
@import './options.styl';
</style>
