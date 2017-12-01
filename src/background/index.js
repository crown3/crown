import async from "async-es"

import chromeAPI from '../api/chrome-api'
import getSearchData from './filter-data'
import omnibox from './omnibox'

import defaultSetting from './default-setting'

import util from '../util'

chromeAPI.getConfig()

// init extension setting if
chromeAPI
  .getConfig()
  .then(data => util.Echo('init getConfig', data))
  .catch((error) => {
    util.Echo('set config', error)
    chromeAPI.setConfig(defaultSetting)
  })

chromeAPI.listenCommand(async command => {
  // find current tab, then send a message to show(or insert) extension dom
  if (command === 'open-in-current-page') {
    const oTab = await chromeAPI.findActiveTab()
    console.log('​command', oTab)
    chromeAPI.sendMsgInTab(oTab.id, {
      type: 'openExtension'
    })
  }
})

/**
 * @param req Object
 * {
 *  action: 'CrownQuery' || 'CrownContentQuery' //来自 contentPage or 其它地方
 *  searchStr: '123' // 输入的字符串
 * }
 */
chromeAPI.listenMsg(req => {
  // 忽略一些其他不相干的系统消息
  if (!req.action) return
  util.Echo('​listen msg req', req)

  async.auto({
    get_search_data(callback) {
      getSearchData(req.searchStr).then(temp => {
        callback(null, temp)
      })
    },

    get_msg_source(callback) {
      if (req.action === 'CrownQuery') {
        callback(null, 'normal', '')
      }
      if (req.action === 'CrownContentQuery') {
        chromeAPI.findActiveTab().then(oTab => {
          callback(null, 'isWebpage', oTab)
        })
      }
    },

    send_data: ['get_search_data', 'get_msg_source', (results, callback) => {
      if (results.get_msg_source[0] === 'isWebpage') {
        chromeAPI.sendMsgInTab(results.get_msg_source[1].id, {
          data: results.get_search_data
        })
        callback(null, 'Successfully sent to webpage')
      } else {
        chromeAPI.sendMsg({
          data: results.get_search_data
        })
        callback(null, 'Successfully sent')
      }
    }]
  }, (err, results) => {
    if (err) console.error(err)
    util.Echo('​final results', results)
  })
})

// handle omnibox event
omnibox()
