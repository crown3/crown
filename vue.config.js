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
        options: true,
        contentScripts: true
      },
      api: 'chrome',
      componentOptions: {
        background: {
          entry: 'src/background/main'
        },
        contentScripts: {
          entries: {
            'content_scripts/main': [ 'src/content_scripts/main' ]
          }
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
      .set('@c', resolve('src/components')) // conponents alias
      .set('lodash-es', 'lodash') // reduce lodash size

    // Image Compression
    config.module
      .rule('imgCompression')
      .test(/\.(jpe?g|png|gif|svg)$/)
      .pre()
      .use('image-webpack-loader')
      .loader('image-webpack-loader')

    // *.svg use svg-url-loader, not file-loader
    config.module.rule('svg').uses.clear().end().use('svg-url-loader').loader('svg-url-loader')
  }
}
