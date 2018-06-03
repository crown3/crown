// 默认设置

export default {
  // 不同项目的搜索设置
  itemSetting: [
    /**
     * @param
     * isDefault: 在不指定 keyword 的情况下是否进入搜索队列
     * keyword: 搜索的关键字
     */
    {
      type: 'bookmark',
      isDefault: true,
      keyword: 'bm'
    }, {
      type: 'tab',
      isDefault: true,
      keyword: 't'
    }, {
      type: 'recentlyClosed',
      keyword: 'rc'
    },
  ]

}
