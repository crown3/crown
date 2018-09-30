import { findActiveTab, getConfig, listenCommand, listenMsg, sendMsg, sendMsgInTab, setConfig } from '@/api'
import defaultConfig from '@/background/default-config'
import filterSearchData from '@/background/filter-search-data'
import handleSelectedItem from '@/background/handle-selected-item'
import bindOmniboxEvent from '@/background/omnibox'
import { parallel } from 'async'

// Initialize the extension configuration when the configuration is empty
getConfig().catch(() => {
  setConfig(defaultConfig)
})

listenCommand(command => {
  // custom command
  if (command === 'open-in-current-page') {
    // find current tab, then send a message to show(or insert) extension dom
    findActiveTab().then(tab => {
      sendMsgInTab(tab.id as number, {
        type: 'openExtension'
      })
    })
  }
})

listenMsg(req => {
  // Ignore some other useless messages
  if (!req.action) {
    return
  }

  switch (req.action) {
    case 'Selected':
      // Process selected options
      handleSelectedItem(req.item)
      break
    case 'QueryReq':
      // Query normally
      filterSearchData(req.searchStr).then(temp => {
        sendMsg({
          data: temp
        })
      })
      break
    case 'WebQueryReq':
      // Query requests from web pages
      parallel(
        {
          search_data(callback) {
            filterSearchData(req.searchStr).then(temp => {
              callback(undefined, temp)
            })
          },
          active_tab(callback) {
            findActiveTab().then(tab => {
              callback(undefined, tab)
            })
          }
        },
        (err, result) => {
          if (!err && result.active_tab) {
            sendMsgInTab((result.active_tab as chrome.tabs.Tab).id as number, {
              data: result.search_data
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
bindOmniboxEvent()
