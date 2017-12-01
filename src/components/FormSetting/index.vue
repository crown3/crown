<template>
  <div class="form-setting">

    <div class="table-row">
      <div class="row-left">默认搜索</div>
      <div class="row-right">

        <div
          v-for="item in setting.itemSetting"
          :key="item.type"
          class="row">
          <div class="input-container">
            <CheckboxSelect v-model="item.isDefault"/>
          </div>
          <div class="text-intro">是否默认搜索<span class="special-text">{{ item.type }}</span>的内容</div>
        </div>

      </div>
    </div>

    <div class="table-row">
      <div class="row-left">单项设置</div>
      <div class="row-right">

        <div
          v-for="item in setting.itemSetting"
          :key="item.type"
          class="row">
          <div class="input-container">
            <CheckboxOn2Off v-model="item.isDefault"/>
          </div>
          <div class="text-intro">
            <div>是否打开搜索{{ item.type }}的功能</div>
            <div v-show="item.isDefault">
              修改搜索关键字?
              <input
                v-model="item.keyword"
                type="text"
                class="input-modify">
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import CheckboxOn2Off from '../Checkbox-On2Off/index'
import CheckboxSelect from '../Checkbox-Select/index'

import chromeAPI from '../../api/chrome-api'

import defaultSetting from '../../background/default-setting'

export default {
  components: {
    CheckboxOn2Off,
    CheckboxSelect,
  },
  data() {
    return {
      setting: defaultSetting,
    }
  },
  watch: {
    setting: {
      handler(val) {
        chromeAPI.setConfig(val)
      },
      deep: true,
    },
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
}
</script>

<style lang="scss">
@import './index.scss';
</style>
