// 默认设置

export default {
  // 不同项目的搜索设置
  itemSetting: {
    /**
     * isDefault: 在不指定 keyword 的情况下是否进入搜索队列
     * keyword: 搜索触发的关键字
     */
    // 书签
    bookmark: {
      isDefault: true,
      keyword: 'bm',
      desc: 'Bookmarks'
    },
    // 当前标签页
    tab: {
      isDefault: true,
      keyword: 't',
      desc: 'Tabs'
    },
    // 最近关闭的标签页
    closedTab: {
      isDefault: false,
      keyword: 'rc',
      desc: 'Recently Closed Tabs'
    },
  }

}
