import { queryBM, queryRecentLyClosed, queryTab } from '@/api'
import { isEachEligible } from '@/common/utils'
import store from '@/store'

const extConfig: Readonly<ExtensionConfig> = store.state.config

// Match related keyword list
function searchKeyword(splitSearchStr: string[]) {
  const temp: QueryResultItem[] = []
  Object.values(extConfig.itemSet).forEach(item => {
    if (isEachEligible(splitSearchStr, `${item.desc} ${item.keyword}`)) {
      temp.push({
        type: 'keyword',
        title: `Search ${item.desc}`,
        subtitle: `Search ${item.desc} for "..."`,
        keyword: item.keyword,
        id: item.desc,
      })
    }
  })
  return temp
}

// Get an array which need to search
function filterKeyword(splitSearchStr: string[]) {
  const temp: SingleSearch[] = []
  Object.entries(extConfig.itemSet).some(([key, value]) => {
    if (value.keyword === splitSearchStr[0]) {
      // Only search for a category
      temp.length = 0
      temp.push({
        type: key,
        searchQueue: splitSearchStr.slice(1),
      })
      return true
    }
    if (value.isDefault) {
      temp.push({
        type: key,
        searchQueue: splitSearchStr,
      })
    }
    return false
  })
  // Whether it is all default search or only search for a category, the keyowrd category should show
  temp.unshift({
    type: 'keyword',
    searchQueue: splitSearchStr,
  })
  return temp
}

// Search different items based on different categories
async function searchFromType(item: SingleSearch) {
  let result: QueryResultItem[] = []
  switch (item.type) {
    case 'keyword':
      result = searchKeyword(item.searchQueue)
      break
    case 'bookmark':
      result = await queryBM(item.searchQueue)
      break
    case 'tab':
      result = await queryTab(item.searchQueue)
      break
    case 'closedTab':
      result = await queryRecentLyClosed(item.searchQueue)
      break
    default:
      break
  }
  return result
}

async function filterSearchData(searchStr: string) {
  const temp: QueryResultItem[] = []
  const strArr = searchStr.replace(/  +/g, ' ').split(' ')
  const searchPromises = filterKeyword(strArr).map(async item => {
    const itemResult = await searchFromType(item)
    return itemResult
  })
  for (const searchPromise of searchPromises) {
    temp.push(...(await searchPromise))
  }
  return temp
}

export default filterSearchData
