<template>
  <div class="content-container">
    <div class="nav">
      <p class="versions">版本: <span class="versions-num">2.0.0</span></p>
      <div class="tabs">
        <div
          :class="{'is-active': activeTab===1}"
          class="tab-item"
          @click="activeTab=1">设置</div>
        <div
          :class="{'is-active': activeTab===2}"
          class="tab-item"
          @click="activeTab=2">关于</div>
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
}
</script>

<style lang="scss">
@import './options.scss';
</style>
