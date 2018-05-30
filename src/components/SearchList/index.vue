<template>
  <ul
    ref="lists"
    class="search-lists">
    <li
      v-for="(item,idx) in searchResults"
      :key="idx"
      :class="{active : idx === activeIndex}"
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
import _ from 'lodash-es'
import chromeAPI from '../../api/chrome-api'

export default {
  props: {
    str: {
      type: String,
      default: '',
    },
    isWebpage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchResults: [],
      activeIndex: 0,
      activeIntervalStartIdx: 0, // active 显示出来的区间的左侧
    }
  },
  watch: {
    str(newVal, oldVal) {
      if (newVal.trim() !== oldVal.trim()) {
        this.searchEvent()
      }
    },
    activeIndex(newVal, oldVal) {
      if (newVal === oldVal || this.searchResults.length < 10) return
      // 在用键盘进行正常移动
      if (Math.abs(newVal - oldVal) === 1) {
        // 在向下移动
        if (newVal > this.activeIntervalStartIdx + 8) this.activeIntervalStartIdx += 1
        // 在向上移动
        if (newVal < this.activeIntervalStartIdx) this.activeIntervalStartIdx -= 1
      }
      // 特殊情况下的 activeIndex 定位, 例如指定初始 activeIndex , 或者操作键盘移动时超过了上下边界时的情况
      else if (newVal < 9) this.activeIntervalStartIdx = 0
      else if (newVal < this.searchResults.length - 9) this.activeIntervalStartIdx = newVal - 9
      else if (newVal < this.searchResults.length)
        this.activeIntervalStartIdx = this.searchResults.length - 9
    },
    activeIntervalStartIdx(newVal) {
      this.$nextTick(() => {
        this.$refs.lists.scrollTop = newVal * 49
      })
    },
  },
  created() {
    chromeAPI.listenMsg(rep => {
      this.searchResults = rep.data
      // 初始化 active item 位置
      const hasDefaultActive = rep.data.some((item, idx) => {
        if (item.active) {
          this.activeIndex = idx
          return true
        }
        return false
      })

      if (!hasDefaultActive) this.activeIndex = 0
    })
  },
  methods: {
    searchEvent: _.debounce(function sendQueryReq() {
      chromeAPI.sendMsg({
        action: this.isWebpage ? 'WebQueryReq' : 'QueryReq',
        searchStr: this.str,
      })
    }, 300),
    changeMatchTextColor(str) {
      // 修改相关匹配文字的颜色
      return str.replace(new RegExp(`${this.str.replace(/\s+/g, '|')}`, 'gi'), '<em>$&</em>')
    },
    selectItem(item) {
      // 处理被选择的选项
      if (item.type === 'keyword') {
        this.$parent.$refs.searchInput.focus()
        this.$parent.searchStr = `${item.keyword} `
      } else {
        chromeAPI.sendMsg({
          action: 'Selected',
          item,
        })
      }
    },
    keydownEnter() {
      this.selectItem(this.searchResults[this.activeIndex])
    },
  },
}
</script>

<style lang="scss">
@import './search-list.scss';
</style>
