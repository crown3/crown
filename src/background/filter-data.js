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

// 从配置中检索相关关键字
function searchKeyword(arr) {
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
  return temp
}

// 根据不同的种类来检索不同的项目
function searchFromType(type, arr) {
  let temp
  switch (type) {
    case 'bookmark':
      temp = chromeAPI.queryBM(arr)
      break
    case 'tab':
      temp = chromeAPI.queryTab(arr)
      break

    default:
      break
  }
  return temp
}

function getSearchData(str) {
  // handle multi space
  const strArr = str.replace(/  +/g, ' ').split(' ')

  return new Promise((resolve, reject) => {
    async.auto({
      resolve_str(callback) {
        // 解析传过来的str
        const bool = setting.itemSetting.some((item) => {
          if (item.keyword === strArr[0]) {
            // 查询单个组
            callback(null, item.type)
            return true
          }
          // 查询所有默认查找选项
          return false
        })
        if (!bool) callback(null, 'default')
      },

      search_keyword: ['resolve_str', (results, callback) => {
        if (results.resolve_str === 'default') {
          callback(null, searchKeyword(strArr))
        } else {
          callback(null, [])
        }
      }],

      search_data: ['resolve_str', (results, callback) => {
        if (results.resolve_str === 'default') {
          // 查询所有默认查找选项
          async.concat(setting.itemSetting, (item, callback1) => {
            if (item.isDefault) {
              searchFromType(item.type, strArr).then(temp => callback1(null, temp))
            }
          }, (err, results1) => {
            callback(null, results1)
          })
        } else {
          // 查询单个组
          searchFromType(results.resolve_str, strArr.slice(1)).then(temp => callback(null, temp))
        }
      }],
    }, (err, results) => {
      if (err) reject(err)
      resolve([...results.search_keyword, ...results.search_data])
    })

  })

}

export default getSearchData
