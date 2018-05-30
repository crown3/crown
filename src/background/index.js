import async from 'async-es'

import chromeAPI from '../api/chrome-api'
import filterSearchData from './filter-search-data'
import omnibox from './omnibox'

import defaultSetting from './default-setting'
import handleSelectedItem from './handle-selected-item'

import util from '../util'

chromeAPI.getConfig()

// init extension setting if
chromeAPI
  .getConfig()
  .then(data => util.Echo('init getConfig', data))
  .catch(error => {
    util.Echo('set config', error)
    chromeAPI.setConfig(defaultSetting).then(status => {
      console.log(status)
    })
  })

chromeAPI.listenCommand(async command => {
  // find current tab, then send a message to show(or insert) extension dom
  if (command === 'open-in-current-page') {
    const oTab = await chromeAPI.findActiveTab()
    chromeAPI.sendMsgInTab(oTab.id, {
      type: 'openExtension'
    })
  }
})

/**
 * @param req Object
 * {
 *  action: 'QueryReq' || 'WebQueryReq' //来自 contentPage or 其它地方
 *  searchStr: '123' // 输入的字符串
 * }
 */
chromeAPI.listenMsg(req => {
  // 忽略一些其他不相干的系统消息
  if (!req.action) return
  util.Echo('​listen msg req', req)

  switch (req.action) {
    case 'Selected':
      // 处理被选中的选项
      handleSelectedItem(req.item)
      break

    case 'QueryReq':
      // 正常地查询请求
      filterSearchData(req.searchStr).then(temp => {
        chromeAPI.sendMsg({
          data: temp
        })
      })
      break

    case 'WebQueryReq':
      // 来自网页地查询请求
      async.parallel({
          search_data(callback) {
            filterSearchData(req.searchStr).then(temp => {
              callback(null, temp)
            })
          },
          active_tab(callback) {
            chromeAPI.findActiveTab().then(oTab => {
              callback(null, oTab)
            })
          }
        },
        (err, results) => {
          if (err) console.error(err)
          else {
            chromeAPI.sendMsgInTab(results.active_tab.id, {
              data: results.search_data
            })
          }
        }
      )
      break

    default:
      break
  }
})

// handle omnibox event
omnibox()
