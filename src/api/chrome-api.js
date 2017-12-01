import async from 'async-es'
import _ from "lodash"

const chrome = window.chrome

/**
 * search your bookmarks
 * @param {string} str
 * @return {Array}
 */
function queryBMItem(sItem, callback) {
  // filter some useless bookmarks
  chrome.bookmarks.search(sItem, rep => callback(null, rep))
}

function queryBM(arr) {
  // 并发查询多个搜索结果 然后去重 + 去除无效数据
  return new Promise((resolve, reject) => {
    async.concat(arr, queryBMItem, (err, results) => {
      if (err) {
        reject(err.message)
      } else {
        const temp = []
        _.uniqBy(results, 'id').forEach(item => {
          if (!item.dateGroupModified &&
            arr.every(item1 =>
              new RegExp(`${item1}`, 'gi').test(`${item.url} ${item.title}`))) {
            temp.push({
              type: 'bookmark',
              title: item.title ? item.title : item.url, // title 不能为空
              subtitle: item.url,
            })
          }
        })
        console.log('​queryBM -> results', temp)
        resolve(temp)
      }
    })
  })
}

/**
 * search your tabs in current win
 * @param {string} str
 * @return {Array}
 */
function queryTabItem(str, callback) {
  // use Regex to query tab what we need in current window
  chrome.tabs.query({
      windowId: chrome.windows.WINDOW_ID_CURRENT,
      windowType: 'normal'
    },
    rep => callback(null, rep)
  )
}

function queryTab(arr) {
  // 并发查询多个搜索结果 然后去重 + 去除无效数据
  return new Promise((resolve, reject) => {
    async.concat(arr, queryTabItem, (err, results) => {
      if (err) {
        reject(err.message)
      } else {
        const temp = []
        _.uniqBy(results, 'id').forEach(item => {
          if (arr.every(item1 =>
              new RegExp(`${item1}`, 'gi').test(`${item.url} ${item.title}`))) {
            temp.push({
              type: 'tab',
              title: item.title,
              subtitle: item.url,

              active: item.highlighted && item.active,
              id: item.id,
            })
          }
        })
        console.log('​queryTab -> results', temp)
        resolve(temp)
      }
    })
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
  return new Promise(resolve => {
    chrome.storage.sync.set({
        crown: JSON.stringify(config)
      }, () =>
      resolve({
        error: false,
        msg: `配置已更新为 ${JSON.stringify(config)}`
      })
    )
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

}
