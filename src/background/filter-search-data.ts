import { getConfig, queryBM, queryRecentLyClosed, queryTab } from '@/api'
import { isEachEligible } from '@/components/utils'
import { concat } from 'async'

let config: ExtConfig

getConfig()
  .then(response => {
    config = response
  })
  .catch(() => {
    throw new Error('get setting error in filter-data.js')
  })

// Real time update setting configuration
chrome.storage.onChanged.addListener(changes => {
  if (changes.crown) {
    config = JSON.parse(changes.crown.newValue)
  }
})

// Match related keyword list
function searchKeyword(splitSearchStr: string[]): Promise<QueryResultItem[]> {
  return new Promise(resolve => {
    const tmp: QueryResultItem[] = []
    Object.values(config.itemSetting).forEach(item => {
      if (isEachEligible(splitSearchStr, `${item.desc} ${item.keyword}`)) {
        tmp.push({
          type: 'keyword',
          title: `Search ${item.desc}`,
          subtitle: `Search ${item.desc} for "..."`,
          keyword: item.keyword
        })
      }
    })
    resolve(tmp)
  })
}

// Get an array which need to search
function filterKeyword(splitSearchStr: string[]): Searchitem[] {
  let tmp: Searchitem[] = []
  Object.entries(config.itemSetting).some(([ key, value ]) => {
    if (value.keyword === splitSearchStr[0]) {
      // Only search for a category
      tmp = [
        {
          type: key,
          strArr: splitSearchStr.slice(1)
        }
      ]
      return true
    }
    if (value.isDefault) {
      tmp.push({
        type: key,
        strArr: splitSearchStr
      })
    }
    return false
  })
  // Whether it is all default search or only search for a category, the keyowrd category should show
  return [
    {
      type: 'keyword',
      strArr: splitSearchStr
    },
    ...tmp
  ]
}

// Search different items based on different categories
function searchFromType(item: Searchitem, callback: (arg1: null, arg2: QueryResultItem[]) => void) {
  switch (item.type) {
    case 'keyword':
      searchKeyword(item.strArr).then(tmp => callback(null, tmp))
      break
    case 'bookmark':
      queryBM(item.strArr).then(tmp => callback(null, tmp))
      break
    case 'tab':
      queryTab(item.strArr).then(tmp => callback(null, tmp))
      break
    case 'closedTab':
      queryRecentLyClosed(item.strArr).then(tmp => callback(null, tmp))
      break

    default:
      break
  }
}

function filterSearchData(searchStr: string): Promise<QueryResultItem[]> {
  return new Promise((resolve, reject) => {
    // handle multi space
    const strArr = searchStr.replace(/  +/g, ' ').split(' ')
    concat(filterKeyword(strArr), searchFromType, (err, results) => {
      if (!err) {
        reject(err)
      }
      if (results) {
        resolve(results as QueryResultItem[])
      }
    })
  })
}

export default filterSearchData
