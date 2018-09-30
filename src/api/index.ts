import { isEachEligible } from '@/components/utils'
import { isEmpty } from 'lodash'

/**
 * To get some bookmark that meets the requirements
 */
function queryBM(queryQueue: string[]): Promise<QueryResultItem[]> {
  /**
   * Multiple queries only need to be deduplicated on the results of the first query,
   * without having to query the second pass
   */
  return new Promise(resolve => {
    const len = queryQueue.length
    if (!len) {
      resolve([])
    } else {
      chrome.bookmarks.search(queryQueue[0], response => {
        const tmp: QueryResultItem[] = []
        for (const item of response) {
          if (item.dateGroupModified) {
            break
          }
          if (len === 1 || isEachEligible(queryQueue, `${item.url} ${item.title}`)) {
            tmp.push({
              type: 'bookmark',
              title: item.title || item.url,
              subtitle: item.url
            })
          }
        }
        resolve(tmp)
      })
    }
  })
}

/**
 * To get some tab that meets the requirements
 */
function queryTab(queryQueue: string[]): Promise<QueryResultItem[]> {
  // Similar to the above queryBM method
  return new Promise(resolve => {
    chrome.tabs.query(
      {
        windowId: chrome.windows.WINDOW_ID_CURRENT,
        windowType: 'normal'
      },
      response => {
        const tmp: QueryResultItem[] = []
        for (const item of response) {
          // if length === 0, show all tabs data
          if (queryQueue.length === 0 || isEachEligible(queryQueue, `${item.url} ${item.title}`)) {
            tmp.push({
              type: 'tab',
              title: item.title,
              subtitle: item.url,

              active: item.highlighted && item.active,
              id: item.id
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
function getConfig(): Promise<ExtConfig> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([ 'crown' ], result => {
      // Is result a empty object?

      if (isEmpty(result) || isEmpty(JSON.parse(result.crown))) {
        reject({
          error: true,
          msg: 'get error when get config'
        })
      } else {
        resolve(JSON.parse(result.crown))
      }
    })
  })
}

/**
 * set crown extension config
 */
function setConfig(config: ExtConfig) {
  chrome.storage.sync.set({
    crown: JSON.stringify(config)
  })
}

/**
 * send message to the tab.
 * @link that extensions cannot send messages to content scripts using chrome.runtime.sendMessage. To send messages to content scripts, use tabs.sendMessage.
 */
function sendMsgInTab(id: number, data: MsgToTab) {
  chrome.tabs.sendMessage(id, data)
}

/**
 * send message using chrome.runtime
 */
function sendMsg(data: MsgToOthers) {
  chrome.runtime.sendMessage(data)
}

/** find active tab which you are focusing */
function findActiveTab(): Promise<chrome.tabs.Tab> {
  return new Promise(resolve => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      response => {
        resolve(response[0])
      }
    )
  })
}

/** update the specified tab status */
function updateTabStatus(
  id: number,
  status = {
    highlighted: true,
    active: true
  }
) {
  chrome.tabs.update(id, status)
}

/** open a new tab with the specified url */
function openNewTab(url: string) {
  chrome.tabs.create({ url })
}

/** add a listener about coommand */
function listenCommand(callback: (command: string) => void) {
  chrome.commands.onCommand.addListener(callback)
}

/** add a listener about msg */
function listenMsg(
  callback: (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => void
) {
  chrome.runtime.onMessage.addListener(callback)
}

/** query recently cloed tab */
function queryRecentLyClosed(queryQueue: string[]): Promise<QueryResultItem[]> {
  return new Promise(resolve => {
    chrome.sessions.getRecentlyClosed(
      {
        maxResults: 25
      },
      response => {
        const tmp: QueryResultItem[] = []
        for (const item of response) {
          // filter tab
          if (item.tab) {
            if (queryQueue.length === 0 || isEachEligible(queryQueue, `${item.tab.url} ${item.tab.title}`)) {
              tmp.push({
                type: 'closedTab',
                title: item.tab.title,
                subtitle: item.tab.url,
                id: +(item.tab.sessionId as string)
              })
            }
          }
        }
        resolve(tmp)
      }
    )
  })
}

/** reopen the tab which recently closed */
function restoreRecentTab(sessionId: string) {
  chrome.sessions.restore(sessionId)
}

export {
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
