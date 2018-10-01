<template>
<div id="CrownWrapper" v-show="isShow">
  <div class="crown-mask">
    <div class="crown-container">
      <SearchView :mainWidth="700" :isInContent="true"></SearchView>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import SearchView from '@/popup/SearchView.vue'
import Vue from 'vue'
import {
  browser
} from 'webextension-polyfill-ts'
// I need help !!!
export default Vue.extend({
  components: {
    SearchView
  },
  data() {
    return {
      isShow: false
    }
  },
  created() {
    browser.runtime.onMessage.addListener(response => {
      if (response.type === 'openExtension') {
        this.isShow= true
      }
    })
  }
})
</script>

<style lang="stylus" scoped>
@import '~@c/vuetify';
@import './content';
</style>