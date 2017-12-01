<template>
  <div
    id="CrownApp"
    class="app-container">

    <div class="header-search">
      <div class="logo-crown"/>
      <input
        ref="searchInput"
        v-model="searchStr"
        type="text"
        class="input-crown"
        autofocus="autofocus"
        placeholder="My Lord ...">
    </div>

    <SearchList
      :str="searchStr"
      @select="handleItemReq"/>
  </div>
</template>

<style lang="scss">
@import './popup.scss';
</style>

<script>
import SearchList from '@/components/SearchList'

import handleItem from '../background/handle-selected-item'

export default {
  components: {
    SearchList,
  },
  data() {
    return {
      searchStr: '',
    }
  },
  methods: {
    handleItemReq(item) {
      // 处理被选择的选项
      if (item.type === 'keyword') {
        this.$refs.searchInput.focus()
        this.searchStr = `${item.keyword} `
      } else {
        handleItem(item)
      }
    },
  },
}
</script>
