<template>
  <v-app :style="'width: '+mainWidth+'px; min-height: 70px'">
    <v-toolbar app height="70">
      <v-layout align-center>
        <v-flex xs2 sm1>
          <img src="~@/assets/logo.svg" height="36" width="36">
        </v-flex>
        <v-flex xs10 sm11>
          <v-text-field
            autofocus
            placeholder="My Lord ..."
            ref="input"
            v-model="inputMsg"
            @keydown.up.prevent="controlSelectedItem('up')"
            @keydown.down.prevent="controlSelectedItem('down')"
            @keydown.enter.prevent="selectItem(items[selectedIndex])"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-content v-show="items.length">
      <v-container fluid ref="scrollTarget" class="pa-0" style="max-height: 500px;overflow: auto;">
        <v-list two-line>
          <!-- <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header">
            {{ item.header }}
          </v-subheader>

          <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
          </template>-->

          <v-list-tile
            avatar
            v-for="(item, index) in items"
            :key="item.id"
            :class="{'is-active': selectedIndex === index}"
            @click="selectItem(item)"
          >
            <v-list-tile-avatar tile>
              <img v-if="item.type === 'tab'" src="~@/assets/tab.svg">
              <img v-else-if="item.type === 'bookmark'" src="~@/assets/bookmark.svg">
              <img v-else-if="item.type === 'closedTab'" src="~@/assets/lamp.svg">
              <img v-else-if="item.type === 'keyword'" src="~@/assets/keyword.svg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { sendMsg } from '@/api'
import Vue from 'vue'
import { browser } from 'webextension-polyfill-ts'
export default Vue.extend({
  props: {
    isInContent: {
      type: Boolean,
      default: false,
    },
    mainWidth: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      inputMsg: '',
      items: [],
      selectedIndex: 0,
    }
  },
  watch: {
    inputMsg(newVal, oldVal) {
      this.requestUpdateList(newVal)
    },
  },
  created() {
    browser.runtime.onMessage.addListener(response => {
      if (!this.inputMsg) {
        this.items = []
        return
      }
      this.items = response
    })
  },
  methods: {
    requestUpdateList(str: string) {
      sendMsg({
        action: this.isInContent ? 'WebQueryReq' : 'QueryReq',
        searchStr: str,
      })
    },
    selectItem(item: SingleQueryResults) {
      if (!this.items.length) {
        return
      }
      if (item.type === 'keyword') {
        this.inputMsg = item.keyword + ' '
        ;(this.$refs.input as HTMLElement).focus()
        return
      }
      sendMsg({
        action: 'Select',
        item,
      })
    },
    controlSelectedItem(direction: 'up' | 'down') {
      switch (direction) {
        case 'up':
          this.selectedIndex -= 1
          break
        case 'down':
          this.selectedIndex += 1
          break
        default:
          break
      }
      const len = this.items.length
      if (this.selectedIndex >= len || this.selectedIndex < 0) {
        this.selectedIndex = (this.selectedIndex + len) % len
      }

      this.$nextTick(() => {
        (this.$refs.scrollTarget as HTMLElement).scrollTop =
          72 * this.selectedIndex
      })
    },
  },
})
</script>

<style lang="stylus">
@import '~@/stylus/popup';
</style>
