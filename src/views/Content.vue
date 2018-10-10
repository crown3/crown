<template>
  <searchView isInContent :mainWidth="666"></searchView>
</template>

<script lang="ts">
import searchView from '@c/searchView.vue'
import Vue from 'vue'
export default Vue.extend({
  components: { searchView },
  created() {
    document.documentElement.style.height = '100%'
    const test = null
  },
})
</script>
