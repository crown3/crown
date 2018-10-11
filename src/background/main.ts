import { findActiveTab, sendMsg, sendMsgToActiveTab } from '@/api'
import filterSearchData from '@/background/filter-search-data'
import handleSelectedItem from '@/background/handle-selected-item'
import bindOmniboxEvent from '@/background/omnibox'
import { browser } from 'webextension-polyfill-ts'

browser.commands.onCommand.addListener(async command => {
  // custom command
  if (command === 'open-in-content') {
    // find current tab, then send a message to show(or insert) extension dom
    sendMsgToActiveTab({
      from: 'background',
      to: 'content-script',
      type: 'openExtension',
    })
  }
})

browser.runtime.onMessage.addListener(async (request: CMessage) => {
  if (request.type === 'select') {
    handleSelectedItem(request.content)
    return
  }
  if (request.type === 'queryRequest') {
    const result = await filterSearchData(request.content)
    switch (request.from) {
      case 'popup':
        sendMsg({
          from: 'background',
          to: 'popup',
          type: 'queryResult',
          content: result,
        })
        break
      case 'content':
        sendMsgToActiveTab({
          from: 'background',
          to: 'content',
          type: 'queryResult',
          content: result,
        })
        break
      default:
        break
    }
    return
  }
})

// handle omnibox event
bindOmniboxEvent()
