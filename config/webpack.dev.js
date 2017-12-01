const utils = require('./utils')
const webpack = require('webpack')
const config = require('./index')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true,
      extract: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./dev.env')
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // copy custom static assets
    new ChromeExtensionReloader({
      entries: {
        popup: 'popup',
        options: 'options',
        background: 'background',
        contentScript: 'content'
      }
    })
  ]
})

module.exports = devWebpackConfig
