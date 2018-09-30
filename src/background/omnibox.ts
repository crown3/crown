import filterSearchData from '@/background/filter-search-data'
import handleSelectedItem from '@/background/handle-selected-item'
import { encodeXml } from '@/components/utils'
import { debounce } from 'lodash'

// Cache search results
let searchResults: QueryResultItem[] = []

// Set a default prompt
function setSuggestion(describe: string) {
  /**
   *  The supported tags are
   * 'url' (for a literal URL),
   * 'match' (for highlighting text that matched what the user's query),
   * 'dim' (for dim helper text).
   * @example '<url><match>src:</match></url> Search Chromium <dim>source</dim>'
   */
  chrome.omnibox.setDefaultSuggestion({
    description: describe
  })
}

function hanldeStr(str: string, suggest: (suggestResults: chrome.omnibox.SuggestResult[]) => void) {
  // 搜索文字为空时return
  if (!str) {
    return
  }
  filterSearchData(str).then(temp => {
    // chrome address bar lists.length <= 5
    const results: OmniboxSearchItem[] = []
    const regex = new RegExp(`${str.replace(/\s+/g, '|')}`, 'gi')
    searchResults = []

    temp.some(item => {
      // 提前终止循环
      if (item.type !== 'keyword') {
        results.push({
          content: `${item.title} @index=${results.length + 1}`,
          description: `<match>${item.type}</match>: ${`${encodeXml(
            item.title as string
          )} - <url>${encodeXml(item.subtitle as string)}</url>`.replace(regex, '<match>$&</match>')}`
        })

        searchResults.push(item)

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
  chrome.omnibox.onInputChanged.addListener(debounce(hanldeStr, 300))

  // handle selecting omnibox list item
  chrome.omnibox.onInputEntered.addListener((...args: string[]) => {
    /**
     * @param
     * str: adressbar text
     * disposition: <Enum> "currentTab", "newForegroundTab", or "newBackgroundTab".  This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab.
     */
    const index = +args[0].split('@index=').slice(-1)
    handleSelectedItem(searchResults[index - 1])
  })
}

export default bindOmniboxEvent
