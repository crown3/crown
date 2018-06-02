<template>
  <label class="checkbox-on2off">
    <input
      :checked="value"
      type="checkbox"
      class="checkbox-on2off__toggle"
      @change="$emit('input', $event.target.checked)">
    <span class="checkbox-on2off__checker"/>
    <span class="checkbox-on2off__txt-left">On</span>
    <span class="checkbox-on2off__txt-right">Off</span>
    <svg
      class="checkbox-on2off__bg"
      space="preserve"
      style="enable-background:new 0 0 110 43.76;"
      version="1.1"
      viewBox="0 0 110 43.76">
      <path
        class="shape"
        d="M88.256,43.76c12.188,0,21.88-9.796,21.88-21.88S100.247,0,88.256,0c-15.745,0-20.67,12.281-33.257,12.281,S38.16,0,21.731,0C9.622,0-0.149,9.796-0.149,21.88s9.672,21.88,21.88,21.88c17.519,0,20.67-13.384,33.263-13.384,S72.784,43.76,88.256,43.76z"/>
    </svg>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="styl">
@import './index.styl';
</style>
