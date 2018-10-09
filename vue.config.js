const { resolve } = require('path')
const ExtensionReload = require('webpack-chrome-extension-reloader')

module.exports = {
  pages: {
    main: 'src/main.ts',
    'content-script': 'src/content-script.ts',
    background: 'src/background/main.ts'
  },

  // custom webpack config
  productionSourceMap: !!process.env.HOT_RELOADING_ENABLED,
  filenameHashing: false,

  chainWebpack: config => {
    if (process.env.HOT_RELOADING_ENABLED) {
      config.plugin('extension-hotreload').use(ExtensionReload)
    }

    config.plugins.delete('html-content-script').delete('html-background')

    config.resolve.alias
      .set('@c', resolve('src/components')) // common alias
      .set('lodash-es', 'lodash') // reduce lodash size

    // Image Compression
    config.module
      .rule('imgCompression')
      .test(/\.(jpe?g|png|gif|svg)$/)
      .pre()
      .use('image-webpack-loader')
      .loader('image-webpack-loader')

    // vuetify
    config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options =>
      Object.assign(options, {
        transformAssetUrls: {
          'v-img': [ 'src', 'lazy-src' ],
          'v-card': 'src',
          'v-card-media': 'src',
          'v-responsive': 'src'
          //...
        }
      })
    )
  }
}
