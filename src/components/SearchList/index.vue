<template>
  <ul class="search-lists">
    <li
      v-for="(item,idx) in searchResults"
      :key="idx"
      :class="{active: item.active}"
      class="item"
      @click="selectItem(item)">
      <div
        :class="item.type"
        class="icon" />

      <div class="text-box">
        <div
          class="title"
          v-html="changeMatchTextColor(item.title)"/>
        <div
          class="subtitle"
          v-html="changeMatchTextColor(item.subtitle)"/>
      </div>

      <div class="key-enter"/>
    </li>
  </ul>
</template>

<script>
import _ from 'lodash'
import chromeAPI from '../../api/chrome-api'
import util from '../../util'

export default {
  props: {
    str: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchResults: [],
    }
  },
  watch: {
    str(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.searchEvent()
      }
    },
  },
  created() {
    chromeAPI.listenMsg(rep => {
      util.Echo('​created -> rep', rep)
      this.searchResults = rep.data
    })
  },
  methods: {
    searchEvent: _.debounce(function sendQueryReq() {
      if (document.getElementsByClassName('crown-mask').length) {
        chromeAPI.sendMsg({
          action: 'CrownContentQuery',
          searchStr: this.str,
        })
      } else {
        chromeAPI.sendMsg({
          action: 'CrownQuery',
          searchStr: this.str,
        })
      }
    }, 300),
    changeMatchTextColor(str) {
      // 修改相关匹配文字的颜色
      return str.replace(new RegExp(`${this.str.replace(/\s+/g, '|')}`, 'gi'), '<em>$&</em>')
    },
    selectItem(item) {
      this.$emit('select', item)
    },
  },
}
</script>

<style lang="scss">
@import './search-list.scss';
</style>
