<template>
<SearchView></SearchView>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchView from './SearchView.vue'
export default Vue.extend({
  components: {
    SearchView
  },
})
</script>

<style lang="stylus">
@import '~@c/vuetify';
@import './SearchView';
</style>
