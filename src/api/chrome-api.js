import _ from "lodash-es"
import util from '../util/index'

const chrome = window.chrome

function queryBM(arr) {
  // 多个查询只需要在第一编查询出来的结果上进行去重即可, 不必再去查询第二遍
  return new Promise(resolve => {
    const len = arr.length
    if (!len) resolve([])
    else {
      chrome.bookmarks.search(arr[0], rep => {
        const tmp = []
        for (let index = 0; index < rep.length; index += 1) {
          const item = rep[index]
          // 去除无效数据并去重
          if (!item.dateGroupModified && (len === 1 || util.isEachEligible(arr, `${item.url} ${item.title}`))) {
            tmp.push({
              type: 'bookmark',
              title: item.title ? item.title : item.url, // title 不能为空
              subtitle: item.url,
            })
          }
        }
        resolve(tmp)
      })
    }
  })
}

function queryTab(arr) {
  // 同上面的 queryBM 方法
  return new Promise(resolve => {
    const len = arr.length
    // tab 检索时默认出现所有的tab页
    if (len === 0) arr.push('')
    chrome.tabs.query({
        windowId: chrome.windows.WINDOW_ID_CURRENT,
        windowType: 'normal'
      },
      rep => {
        const tmp = []
        for (let index = 0; index < rep.length; index += 1) {
          const item = rep[index]
          /**
           * length === 0: 默认出现所有所有 tab 页
           * length === 1 : 不需要进行后面的多个单词匹配
           */
          if (len < 2 || util.isEachEligible(arr, `${item.url} ${item.title}`)) {
            tmp.push({
              type: 'tab',
              title: item.title,
              subtitle: item.url,

              active: item.highlighted && item.active,
              id: item.id,
            })
          }
        }
        resolve(tmp)
      }
    )
  })
}

/**
 * get crown extension config
 */
function getConfig() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['crown'], result => {
      // Is result a empty object?
      if (_.isEmpty(result) || _.isEmpty(JSON.parse(result.crown))) {
        reject({
          error: true,
          msg: '配置获取失败'
        })
      } else {
        resolve(JSON.parse(result.crown))
      }
    })
  })
}

/**
 * set crown extension config
 * @param {JSON} config
 */
function setConfig(config) {
  chrome.storage.sync.set({
    crown: JSON.stringify(config)
  })
}

/**
 * send message in the tab
 * Note that extensions cannot send messages to content scripts using chrome.runtime.sendMessage. To send messages to content scripts, use tabs.sendMessage.
 * @param {int} tabId
 * @param {String} label
 */
function sendMsgInTab(tabId, oData) {
  chrome.tabs.sendMessage(tabId, oData)
}

/**
 * send message using chrome.runtime
 * @param Object oData
 */
function sendMsg(oData) {
  chrome.runtime.sendMessage(oData)
}

/**
 * find active tab which you focus
 * @param {func} callback
 */
function findActiveTab() {
  return new Promise(resolve => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      resolve(tabs[0])
    })
  })
}

function updateTabStatus(tabId, status = {
  highlighted: true,
  active: true
}) {
  chrome.tabs.update(tabId, status)
}

function openNewTab(openUrl) {
  chrome.tabs.create({
    url: openUrl
  })
}

function listenCommand(callback) {
  chrome.commands.onCommand.addListener(callback)
}

function listenMsg(callback) {
  chrome.runtime.onMessage.addListener(callback)
}

function queryRecentLyClosed(arr) {
  return new Promise(resolve => {
    const len = arr.length
    if (len === 0) arr.push('')
    chrome.sessions.getRecentlyClosed({
      maxResults: 25
    }, (rep) => {
      const tmp = []
      for (let index = 0; index < rep.length; index += 1) {
        const item = rep[index].tab
        // 只取 tab 类型, 不要 win 类型
        if (item) {
          /**
           * length === 0: 默认出现所有所有 最近关闭的标签页
           * length === 1 : 不需要进行后面的多个单词匹配
           */
          if (len < 2 || util.isEachEligible(arr, `${item.url} ${item.title}`)) {
            tmp.push({
              type: 'closedTab',
              title: item.title,
              subtitle: item.url,

              id: item.sessionId,
            })
          }
        }
      }
      resolve(tmp)
    })

  })

}

function restoreRecentTab(sessionId) {
  chrome.sessions.restore(sessionId)
}

export default {
  findActiveTab,
  getConfig,
  listenCommand,
  listenMsg,
  queryBM,
  queryTab,
  sendMsg,
  sendMsgInTab,
  setConfig,
  updateTabStatus,
  openNewTab,
  queryRecentLyClosed,
  restoreRecentTab
}
