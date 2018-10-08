<template>
<v-app style="width: 700px;">
  <v-toolbar app>
    <v-layout align-center justify-space-between>
      <v-tabs color="transparent">
        <v-tab @click="goTo('#bookmark')">
          <v-icon>book</v-icon>
        </v-tab>

        <v-tab @click="goTo('#tab')">
          <v-icon>tab</v-icon>
        </v-tab>
      </v-tabs>
      <v-icon @click="toProjectHomePage">link</v-icon>
    </v-layout>
  </v-toolbar>

  <v-content>
    <v-container fluid class="pa-0">
      <h3 class="headline" id="bookmark"># {{getI18nMsg('bookmark')}}</h3>
      <v-layout align-center>
        <v-flex xs6 class="pr-3">
          <v-switch :label="getI18nMsg('opt_searchByDefault', 'bookmarks')" v-model="isBMDefault"></v-switch>
        </v-flex>
        <v-flex xs6 class="pl-3">
          <v-text-field v-model="BMKeyword" :rules="rules.name" :label="getI18nMsg('opt_setKeyword', 'bookmarks')"></v-text-field>
        </v-flex>
      </v-layout>

      <h3 class="headline" id="tab"># {{getI18nMsg('tab')}}</h3>
      <v-layout align-center>
        <v-flex xs6 class="pr-3">
          <v-switch :label="getI18nMsg('opt_searchByDefault', 'tabs')" v-model="isTabDefault"></v-switch>
        </v-flex>
        <v-flex xs6 class="pl-3">
          <v-text-field v-model="TabKeyword" :rules="rules.name" :label="getI18nMsg('opt_setKeyword', 'tabs')"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout align-center>
        <v-flex xs6 class="pr-3">
          <v-switch :label="getI18nMsg('opt_searchByDefault', 'recently closed tabs')" v-model="isRCTDefault"></v-switch>
        </v-flex>
        <v-flex xs6 class="pl-3">
          <v-text-field v-model="RCTKeyword" :rules="rules.name" :label="getI18nMsg('opt_setKeyword', 'recently closed tabs')"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</v-app>
</template>

<script lang="ts">
import defaultConfig from '@/background/default-config'
import Vue from 'vue'
import {
  browser
} from 'webextension-polyfill-ts'

export default Vue.extend({
  computed: {
    isBMDefault: {
      get(): boolean {
        return this.$store.state.config.itemSet.bookmark.isDefault
      },
      set(value: boolean) {
        this.$store.commit('changeItemConfig', {
          type: 'bookmark',
          key: 'isDefault',
          value
        })
      }
    },
    isTabDefault: {
      get(): boolean {
        return this.$store.state.config.itemSet.tab.isDefault
      },
      set(value: boolean) {
        this.$store.commit('changeItemConfig', {
          type: 'tab',
          key: 'isDefault',
          value
        })
      }
    },
    isRCTDefault: {
      get(): boolean {
        return this.$store.state.config.itemSet.recentlyClosedTab.isDefault
      },
      set(value: boolean) {
        this.$store.commit('changeItemConfig', {
          type: 'recentlyClosedTab',
          key: 'isDefault',
          value
        })
      }
    },
    BMKeyword: {
      get(): string {
        return this.$store.state.config.itemSet.bookmark.keyword
      },
      set(value: string) {
        this.$store.commit('changeItemConfig', {
          type: 'bookmark',
          key: 'keyword',
          value
        })
      }
    },
    TabKeyword: {
      get(): string {
        return this.$store.state.config.itemSet.tab.keyword
      },
      set(value: string) {
        this.$store.commit('changeItemConfig', {
          type: 'tab',
          key: 'keyword',
          value
        })
      }
    },
    RCTKeyword: {
      get(): string {
        return this.$store.state.config.itemSet.recentlyClosedTab.keyword
      },
      set(value: string) {
        this.$store.commit('changeItemConfig', {
          type: 'recentlyClosedTab',
          key: 'keyword',
          value
        })
      }
    }
  },
  data() {
    return {
      rules: {
        name: [(value: string = '') => value.length > 0 || 'This field i required']
      }
    }
  },
  methods: {
    toProjectHomePage() {
      window.open('https://crown3.github.io/crown/', '__blank')
    },
    goTo(target: string) {
      this.$vuetify.goTo(target, {
        offset: -60,
        duration: 100
      })
    },
    // get msg translation from browser.i18n
    getI18nMsg(name: string, other ? : any) {
      return browser.i18n.getMessage(name, other)
    }
  }
})
</script>

<style lang="stylus">
@import './options';
</style>
