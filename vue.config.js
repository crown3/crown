const { resolve } = require('path')
const ExtensionReload = require('webpack-chrome-extension-reloader')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  pages: {
    main: 'src/main.ts',
    'content-script': 'src/content-script.ts',
    background: 'src/background/main.ts',
  },

  // custom webpack config
  filenameHashing: false,

  configureWebpack: {
    optimization: {
      // just split js
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\\/]node_modules[\\\/].*js/, // eslint-disable-line no-useless-escape
            minChunks: 2,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: 'chunk-common',
            test: /\.js$/,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      },
    },
  },

  chainWebpack: config => {
    if (isDev) {
      config
        .plugin('extension-hotreload')
        .use(ExtensionReload, [{ reloadPage: true }])
    }

    // generate manifest json
    config
      .plugin('generate-manifest')
      .use(GenerateJsonPlugin, [
        'manifest.json',
        require('./src/genarate-manifest.ts'),
        undefined,
        isDev ? 2 : 0,
      ])

    // Don't generate content-script's html file
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
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options =>
        Object.assign(options, {
          transformAssetUrls: {
            'v-img': ['src', 'lazy-src'],
            'v-card': 'src',
            'v-card-media': 'src',
            'v-responsive': 'src',
            //...
          },
        })
      )
  },
}
