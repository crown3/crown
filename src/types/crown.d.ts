declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.styl'
declare module '*.json' {
  const value: any
  export default value
}

interface QueryResultItem {
  /** item of search result's type */
  type: 'tab' | 'bookmark' | 'closedTab' | 'keyword'
  /** item of search result's main text */
  title: string | undefined
  /** item of search result's sub text */
  subtitle: string | undefined
  /** the status is active(selected) ? */
  active?: boolean
  /** item id */
  id?: number | string
  /** item keyword */
  keyword?: string
}

interface ItemConfig {
  /** Is set as default search option? */
  isDefault: boolean
  /** The keyword that triggered the search */
  keyword: string
  /** Related description */
  desc: string
}

interface ItemSetting {
  /** The related settings of bookmark */
  bookmark: ItemConfig
  /** The related settings of tab */
  tab: ItemConfig
  /** The related settings of recently closed tab */
  closedTab: ItemConfig
}

interface ExtConfig {
  /** Single setting */
  itemSetting: ItemSetting
}

interface MsgToTab {
  type?: 'openExtension'
  data?: any
}

interface MsgToOthers {
  data?: any
}

interface Searchitem {
  type: string
  strArr: string[]
}

interface OmniboxSearchItem {
  content: string
  description: string
}
