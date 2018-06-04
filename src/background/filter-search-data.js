import async from "async-es"

import chromeAPI from '../api/chrome-api'
import util from '../util/index'

let setting = {}

chromeAPI
  .getConfig()
  .then(rep => {
    setting = rep
  })
  .catch(() => {
    throw new Error('get setting error in filter-data.js')
  })

// 实时更新 setting 配置
chrome.storage.onChanged.addListener(changes => {
  if (changes.crown) setting = JSON.parse(changes.crown.newValue)
})

// 匹配相关关键字列表
function searchKeyword(arr) {
  return new Promise(resolve => {
    const temp = []
    Object.values(setting.itemSetting).forEach(item => {
      if (util.isEachEligible(arr, `${item.desc} ${item.keyword}`)) {
        temp.push({
          type: 'keyword',
          title: `Search ${item.desc}`,
          subtitle: `Search ${item.desc} for "..."`,
          keyword: item.keyword
        })
      }
    })
    resolve(temp)
  })
}

// 获取需要检索的队列数组
function filterKeyword(strArr) {
  let tmp = []
  Object.entries(setting.itemSetting).some(([key, value]) => {
    if (value.keyword === strArr[0]) {
      // 搜索单个子列
      tmp = [{
        type: key,
        strArr: strArr.slice(1)
      }]
      return true
    } else if (value.isDefault)
      tmp.push({
        type: key,
        strArr
      })
    return false
  })
  // 不管是默认搜索还是单项的搜索, 都要出现 keyowrd 类别的提示(如果有对应的话)
  return [{
    type: 'keyword',
    strArr
  }, ...tmp]
}

// 根据不同的种类来检索不同的项目
function searchFromType(item, callback) {
  switch (item.type) {
    case 'keyword':
      searchKeyword(item.strArr).then(tmp => callback(null, tmp))
      break
    case 'bookmark':
      chromeAPI.queryBM(item.strArr).then(tmp => callback(null, tmp))
      break
    case 'tab':
      chromeAPI.queryTab(item.strArr).then(tmp => callback(null, tmp))
      break
    case 'closedTab':
      chromeAPI.queryRecentLyClosed(item.strArr).then(tmp => callback(null, tmp))
      break

    default:
      break
  }
}

function filterSearchData(str) {
  return new Promise((resolve, reject) => {
    // handle multi space
    const strArr = str.replace(/  +/g, ' ').split(' ')

    async.concat(filterKeyword(strArr), searchFromType, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

export default filterSearchData
