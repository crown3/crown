import { isEachEligible } from '@/common/utils'
import { browser } from 'webextension-polyfill-ts'

/**
 * To get some bookmark that meets the requirements
 */
async function queryBM(queryQueue: string[]) {
  /**
   * Multiple queries only need to be deduplicated on the results of the first query,
   * without having to query the second pass
   */
  const len = queryQueue.length
  if (!len) {
    return []
  }
  const result = await browser.bookmarks.search(queryQueue[0])
  const temp: QueryResultItem[] = []
  for (const item of result) {
    if (item.dateGroupModified) {
      break
    }
    if (len === 1 || isEachEligible(queryQueue, `${item.url} ${item.title}`)) {
      temp.push({
        type: 'bookmark',
        title: item.title || item.url,
        subtitle: item.url,
        id: item.id,
      })
    }
  }
  return temp
}

/**
 * To get some tab that meets the requirements
 */
async function queryTab(queryQueue: string[]) {
  // Similar to the above queryBM method
  const result = await browser.tabs.query({
    windowId: browser.windows.WINDOW_ID_CURRENT,
    windowType: 'normal',
  })
  const temp: QueryResultItem[] = []
  for (const item of result) {
    // if length === 0, show all tabs data
    if (
      queryQueue.length === 0 ||
      isEachEligible(queryQueue, `${item.url} ${item.title}`)
    ) {
      temp.push({
        type: 'tab',
        title: item.title,
        subtitle: item.url,

        active: item.highlighted && item.active,
        id: item.id as number,
      })
    }
  }
  return temp
}

/**
 * send message to the special tab.
 * @link that extensions cannot send messages to content scripts using browser.runtime.sendMessage. To send messages to content scripts, use tabs.sendMessage.
 */
async function sendMsgToActiveTab(data: CMessage) {
  try {
    const { id } = await findActiveTab()
    await browser.tabs.sendMessage(id as number, data)
  } catch (error) {
    // if currnet tab isn't available, alert a tip
    alert(browser.i18n.getMessage('contentScript_unavailable'))
  }
}

/**
 * send message with using browser.runtime
 */
function sendMsg(data: CMessage) {
  browser.runtime.sendMessage(data)
}

/**
 * find active tab which you are focusing
 */
async function findActiveTab() {
  const result = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })
  return result[0]
}

/**
 * update the specified tab status
 */
function updateTabStatus(
  id: number,
  status = {
    highlighted: true,
    active: true,
  }
) {
  browser.tabs.update(id, status)
}

/**
 * open a new tab with the specified url
 */
function openNewTab(url: string) {
  browser.tabs.create({ url })
}

/**
 * query recently cloed tab
 */
async function queryRecentLyClosed(queryQueue: string[]) {
  const result = await browser.sessions.getRecentlyClosed({ maxResults: 25 })
  const temp: QueryResultItem[] = []
  for (const item of result) {
    // filter tab
    if (!item.tab) {
      break
    }
    if (
      queryQueue.length === 0 ||
      isEachEligible(queryQueue, `${item.tab.url} ${item.tab.title}`)
    ) {
      temp.push({
        type: 'closedTab',
        title: item.tab.title,
        subtitle: item.tab.url,
        id: item.tab.sessionId as string,
      })
    }
  }
  return temp
}

/**
 * reopen the tab which recently closed
 */
function restoreRecentTab(sessionId: string) {
  browser.sessions.restore(sessionId)
}

export {
  findActiveTab,
  openNewTab,
  queryBM,
  queryRecentLyClosed,
  queryTab,
  restoreRecentTab,
  sendMsg,
  sendMsgToActiveTab,
  updateTabStatus,
}
