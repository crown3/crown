<template>
  <searchView :mainWidth="400"></searchView>
</template>

<script lang="ts">
import searchView from '@c/searchView.vue'
import Vue from 'vue'
export default Vue.extend({
  components: { searchView },
})
</script>

<style lang="stylus">
@import '~@/stylus/popup';
</style>