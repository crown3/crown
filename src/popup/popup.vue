<template>
  <div
    id="CrownApp"
    :class="{'is-circular': isWebpage}"
    class="app-container">

    <div class="header-search">
      <div class="logo-crown"/>
      <input
        ref="searchInput"
        v-model="searchStr"
        type="text"
        class="input-crown"
        autofocus="autofocus"
        placeholder="My Lord ..."
        @keydown.up.prevent="ctrlActiveItem('up')"
        @keydown.down.prevent="ctrlActiveItem('down')"
        @keydown.enter.prevent="ctrlActiveItem('enter')">
    </div>

    <SearchList
      :str="searchStr"
      :is-webpage="isWebpage"/>
  </div>
</template>

<style lang="styl">
@import './popup.styl';
</style>

<script>
import SearchList from '@/components/SearchList'

export default {
  components: {
    SearchList
  },
  data() {
    return {
      searchStr: '',
      isWebpage: !!document.getElementsByClassName('crown-mask').length // 是否在网页中
    }
  },
  mounted() {
    if (this.isWebpage) {
      const crownMask = document.getElementsByClassName('crown-mask')[0]
      document.addEventListener(
        'keydown',
        e => {
          if (crownMask.style.display !== 'none' && e.which === 27) {
            // 按下 esc
            this.searchStr = ''
            crownMask.style.display = 'none'
          }
        },
        false
      )
    }
  },
  methods: {
    ctrlActiveItem(direction) {
      const child0 = this.$children[0]
      switch (direction) {
        case 'up':
          child0.activeIndex = this.handleLoopArrIndex(
            child0.activeIndex - 1,
            child0.searchResults.length
          )
          break
        case 'down':
          child0.activeIndex = this.handleLoopArrIndex(
            child0.activeIndex + 1,
            child0.searchResults.length
          )
          break
        case 'enter':
          child0.keydownEnter()
          break

        default:
          break
      }
    },
    handleLoopArrIndex(idx, len) {
      /**
       * 只处理我们可能遇到的情况
       * e.g. len = 20
       * -1 => 19
       * 0~19 => 0~19
       * 20 => 0
       */
      if (idx < 0) {
        return len + idx
      }
      if (idx >= len) {
        return idx % len
      }
      return idx
    }
  }
}
</script>
