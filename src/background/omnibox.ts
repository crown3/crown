import filterSearchData from '@/background/filter-search-data'
import handleSelectedItem from '@/background/handle-selected-item'
import { encodeXml } from '@/common/utils'
import { browser } from 'webextension-polyfill-ts'

// Cache search results
const searchResults: QueryResultItem[] = []

// Set a default prompt
function setSuggestion(describe: string) {
  /**
   *  The supported tags are
   * 'url' (for a literal URL),
   * 'match' (for highlighting text that matched what the user's query),
   * 'dim' (for dim helper text).
   * @example '<url><match>src:</match></url> Search Chromium <dim>source</dim>'
   */
  browser.omnibox.setDefaultSuggestion({
    description: describe,
  })
}

function bindOmniboxEvent() {
  // User has started a keyword input session by typing the extension's keyword.
  browser.omnibox.onInputStarted.addListener(() => {
    setSuggestion('<match>My lord</match> <dim>...</dim>')
  })

  // handle search results
  browser.omnibox.onInputChanged.addListener(async (text, suggest) => {
    if (!text) {
      return
    }
    const result = await filterSearchData(text)
    const temp: SingleOmniboxSearch[] = []
    const regex = new RegExp(`${text.replace(/\s+/g, '|')}`, 'gi')
    searchResults.length = 0

    result.some(item => {
      // 提前终止循环
      if (item.type !== 'keyword') {
        temp.push({
          content: `${item.title} @index=${temp.length + 1}`,
          description: `<match>${item.type}</match>: ${`${encodeXml(
            item.title as string
          )} - <url>${encodeXml(item.subtitle as string)}</url>`.replace(
            regex,
            '<match>$&</match>'
          )}`,
        })

        searchResults.push(item)

        return temp.length > 4
      }
      return false
    })

    suggest(temp)
  })

  // handle selecting omnibox list item
  browser.omnibox.onInputEntered.addListener((...args: string[]) => {
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
