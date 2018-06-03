import async from "async-es"

import chromeAPI from '../api/chrome-api'

let setting

chromeAPI
  .getConfig()
  .then(oSetting => {
    setting = oSetting
  })
  .catch(() => {
    throw new Error('get setting error in filter-data.js')
  })

// 实时更新 setting 配置
chrome.storage.onChanged.addListener(changes => {
  if (changes.crown) setting = JSON.parse(changes.crown.newValue)
})

// 从配置中检索相关关键字
function searchKeyword(arr) {
  return new Promise(resolve => {
    const temp = []
    setting.itemSetting.forEach(item => {
      if (arr.every(item1 =>
          new RegExp(`${item1}`, 'gi').test(`${item.type} ${item.keyword}`))) {
        temp.push({
          type: 'keyword',
          title: `Search ${item.type}`,
          subtitle: `Search ${item.type} for "..."`,
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
  for (let idx = 0; idx < setting.itemSetting.length; idx += 1) {
    const item = setting.itemSetting[idx]
    if (item.keyword === strArr[0]) {
      // 搜索单个子列
      tmp = [{
        type: item.type,
        strArr: strArr.slice(1)
      }]
      break
    } else if (item.isDefault)
      tmp.push({
        type: item.type,
        strArr
      })
  }
  console.log(tmp)
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
    case 'recentlyClosed':
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
