<template>
  <v-app style="width: 700px;">
    <v-content>
      <v-container class="pa-0" fluid>
        <h3 class="title" id="bookmark"># {{ I18n('bookmark') }}</h3>
        <v-layout align-center>
          <v-flex class="pr-3" xs6>
            <v-switch
              :disabled="!config.tab.isDefault && !config.RCT.isDefault"
              :input-value="config.bookmark.isDefault"
              :label="I18n('isSetDefault', I18n('bookmark'))"
              @change="value => updateIsDefault('bookmark', value)"
              class="body-1"
            ></v-switch>
          </v-flex>
          <v-flex class="pl-3" xs6>
            <v-text-field
              :label="I18n('keywordOfSet', I18n('bookmark'))"
              :rules="rules.keyword"
              :value="config.bookmark.keyword"
              @change="value => updateKeyword('bookmark', value)"
              ref="key_bookmark"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <h3 class="title" id="tab"># {{ I18n('tab') }}</h3>
        <v-layout align-center>
          <v-flex class="pr-3" xs6>
            <v-switch
              :disabled="!config.bookmark.isDefault && !config.RCT.isDefault"
              :input-value="config.tab.isDefault"
              :label="I18n('isSetDefault', I18n('tab'))"
              @change="value => updateIsDefault('tab', value)"
            ></v-switch>
          </v-flex>
          <v-flex class="pl-3" xs6>
            <v-text-field
              :label="I18n('keywordOfSet', I18n('tab'))"
              :rules="rules.keyword"
              :value="config.tab.keyword"
              @change="value => updateKeyword('tab', value)"
              ref="key_tab"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center>
          <v-flex class="pr-3" xs6>
            <v-switch
              :disabled="!config.tab.isDefault && !config.bookmark.isDefault"
              :input-value="config.RCT.isDefault"
              :label="I18n('isSetDefault', I18n('RCT'))"
              @change="value => updateIsDefault('RCT', value)"
            ></v-switch>
          </v-flex>
          <v-flex class="pl-3" xs6>
            <v-text-field
              :label="I18n('keywordOfSet', I18n('RCT'))"
              :rules="rules.keyword"
              :value="config.RCT.keyword"
              @change="value => updateKeyword('RCT', value)"
              ref="key_RCT"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { browser } from 'webextension-polyfill-ts'
import { mapState } from 'vuex'

const notEmptyTip = browser.i18n.getMessage('tip_notEmpty')

type ChangeConfigType = 'bookmark' | 'tab' | 'RCT'

export default Vue.extend({
  computed: {
    ...mapState({ config: 'config' }),
  },
  data() {
    return {
      rules: {
        keyword: [(value: string = '') => value.length > 0 || notEmptyTip],
      },
    }
  },
  methods: {
    updateConfig(
      type: ChangeConfigType,
      key: 'isDefault' | 'keyword',
      value: string | boolean
    ) {
      this.$store.commit('changeItemConfig', {
        type,
        key,
        value,
      })
    },
    updateIsDefault(type: ChangeConfigType, value: boolean) {
      this.updateConfig(type, 'isDefault', value)
    },
    updateKeyword(type: ChangeConfigType, value: string) {
      if ((this.$refs['key_' + type] as any).valid) {
        this.updateConfig(type, 'keyword', value)
      }
    },
    // get msg translation from browser.i18n
    I18n(name: string, other?: any) {
      return browser.i18n.getMessage(name, other)
    },
  },
})
</script>

<style lang="stylus">
@import '~@/stylus/options';
</style>
