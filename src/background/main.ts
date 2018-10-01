import { findActiveTab, sendMsg, sendMsgToTab } from '@/api'
import filterSearchData from '@/background/filter-search-data'
import handleSelectedItem from '@/background/handle-selected-item'
import bindOmniboxEvent from '@/background/omnibox'
import { browser } from 'webextension-polyfill-ts'

browser.commands.onCommand.addListener(async command => {
  // custom command
  if (command === 'open-in-content') {
    // find current tab, then send a message to show(or insert) extension dom
    const { id } = await findActiveTab()
    sendMsgToTab(id as number, {
      type: 'openExtension'
    })
  }
})

browser.runtime.onMessage.addListener(async request => {
  // Ignore some other useless messages
  if (!request.action) {
    return
  }
  switch (request.action) {
    case 'Select':
      // Process selected options
      handleSelectedItem(request.item)
      break
    case 'QueryReq':
      // Query normally
      const temp = await filterSearchData(request.searchStr)
      sendMsg(temp)
      break
    case 'WebQueryReq':
      // Query requests from web pages
      const { id } = await findActiveTab()
      const data = await filterSearchData(request.searchStr)
      sendMsgToTab(id as number, data)
      break

    default:
      break
  }
})

// handle omnibox event
bindOmniboxEvent()
