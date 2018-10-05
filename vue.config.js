const { resolve } = require('path')

module.exports = {
  pages: {
    'popup/popup': {
      entry: 'src/popup/main',
      title: 'Popup - Crown'
    },
    'options/options': {
      entry: 'src/options/main',
      title: 'Options - Crown'
    }
  },
  pluginOptions: {
    browserExtension: {
      components: {
        background: true,
        popup: true,
        options: true
      },
      api: 'chrome',
      componentOptions: {
        background: {
          entry: 'src/background/main'
        }
      }
    }
  },

  // custom webpack config
  productionSourceMap: false,

  chainWebpack: config => {
    // remove the prefetch && preload plugin
    config.plugins.delete('prefetch').delete('preload')

    config.resolve.alias
      .set('@c', resolve('src/common')) // common alias
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
