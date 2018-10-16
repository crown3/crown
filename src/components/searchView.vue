<template>
  <v-app :style="'width: ' + mainWidth + 'px; min-height: 70px'">
    <v-toolbar app height="70">
      <v-layout align-center>
        <v-flex sm1 xs2>
          <img height="36" src="~@/assets/logo.svg" width="36" />
        </v-flex>
        <v-flex sm11 xs10>
          <v-text-field
            :placeholder="I18n('searchPlaceholder')"
            @keydown.down.prevent="controlSelectedItem('down')"
            @keydown.enter.prevent="selectItem(items[selectedIndex])"
            @keydown.esc.prevent="hideInActiveTab"
            @keydown.up.prevent="controlSelectedItem('up')"
            autofocus
            ref="input"
            v-model="inputMsg"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-content v-show="items.length">
      <v-container
        class="pa-0"
        fluid
        ref="scrollTarget"
        style="max-height: 500px;overflow: auto;"
      >
        <v-list two-line>
          <v-list-tile
            :class="{ 'is-active': selectedIndex === index }"
            :key="item.id"
            @click="selectItem(item)"
            v-for="(item, index) in items"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title>
                <v-chip class="ml-0" color="warning" small text-color="white">
                  {{ I18n(item.type + '_label') }}
                </v-chip>
                {{ item.subtitle }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { findActiveTab, sendMsg, sendMsgToActiveTab } from '@/api'
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
    browser.runtime.onMessage.addListener((response: CMessage) => {
      if (response.type === 'openExtension') {
        this.focusInput()
      }
      if (
        response.type !== 'queryResult' ||
        response.to !== (this.isInContent ? 'content' : 'popup')
      ) {
        return
      }

      if (!this.inputMsg) {
        this.items = []
        return
      }
      ;(this.items as QueryResultItem[]) = response.content
    })
  },
  methods: {
    requestUpdateList(str: string) {
      sendMsg({
        from: this.isInContent ? 'content' : 'popup',
        to: 'background',
        type: 'queryRequest',
        content: str,
      })
    },
    selectItem(item: QueryResultItem) {
      if (!this.items.length) {
        return
      }
      if (item.type === 'keyword') {
        this.inputMsg = item.keyword + ' '
        this.focusInput()
        return
      }
      sendMsg({
        from: this.isInContent ? 'content' : 'popup',
        to: 'background',
        type: 'select',
        content: item,
      })
    },
    focusInput() {
      ;(this.$refs.input as HTMLElement).focus()
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
        ;(this.$refs.scrollTarget as HTMLElement).scrollTop =
          72 * this.selectedIndex
      })
    },
    hideInActiveTab() {
      if (!this.isInContent) {
        return
      }
      sendMsgToActiveTab({
        from: 'background',
        to: 'content-script',
        type: 'closeExtension',
      })
    },
    // get msg translation from browser.i18n
    I18n(name: string, other?: any) {
      return browser.i18n.getMessage(name, other)
    },
  },
})
</script>
