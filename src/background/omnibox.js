import _ from 'lodash-es'

import filterSearchData from './filter-search-data'
import handleSelectedItem from './handle-selected-item'
import util from '../util/index'

// 缓存搜索结果
let SearchResults = []

function setSuggestion(decs) {
  /**
   *  The supported tags are
   * 'url' (for a literal URL),
   * 'match' (for highlighting text that matched what the user's query),
   * 'dim' (for dim helper text).
   * @example '<url><match>src:</match></url> Search Chromium <dim>source</dim>'
   */
  chrome.omnibox.setDefaultSuggestion({
    description: decs
  })
}

function hanldeStr(str, suggest) {
  // 搜索文字为空时return
  if (!str) return
  filterSearchData(str).then(temp => {
    // chrome address bar lists.length <= 5
    const results = []
    const regex = new RegExp(`${str.replace(/\s+/g, '|')}`, 'gi')
    SearchResults = []

    temp.some(item => {
      // 提前终止循环
      if (item.type !== 'keyword') {
        results.push({
          content: `${item.title} @index=${results.length+1}`,
          description: `<match>${item.type}</match>: ${`${util.encodeXml(item.title)} - <url>${util.encodeXml(item.subtitle)}</url>`.replace(regex, '<match>$&</match>')}`
        })

        SearchResults.push(item)

        return results.length > 4
      }
      return false
    })

    suggest(results)
  })
}

function bindOmniboxEvent() {
  // User has started a keyword input session by typing the extension's keyword.
  chrome.omnibox.onInputStarted.addListener(() => {
    setSuggestion('<match>My lord</match> <dim>...</dim>')
  })

  // handle search results
  chrome.omnibox.onInputChanged.addListener(_.debounce(hanldeStr, 300))

  // handle selecting omnibox list item
  chrome.omnibox.onInputEntered.addListener(((...args) => {
    /**
     * @param
     * str: adressbar text
     * disposition: <Enum> "currentTab", "newForegroundTab", or "newBackgroundTab".  This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab.
     */
    const index = +args[0].split('@index=').slice(-1)
    handleSelectedItem(SearchResults[index - 1])
  }))
}

export default bindOmniboxEvent
