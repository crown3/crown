declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.styl'
declare module '*.json' {
  const value: any
  export default value
}

interface SingleQueryResults {
  /** item of search result's type */
  type: 'tab' | 'bookmark' | 'closedTab' | 'keyword'
  /** item of search result's main text */
  title: string | undefined
  /** item of search result's sub text */
  subtitle: string | undefined
  /** item id */
  id: number | string
  /** the status is active(selected) ? */
  active?: boolean
  /** item keyword */
  keyword?: string
}

interface ItemConfig {
  /** Is set as default search option? */
  isDefault: boolean
  /** The keyword to trigger the search */
  keyword: string
  /** Related description */
  desc: string
}

interface ItemConfigSet {
  /** The related settings of bookmark */
  bookmark: ItemConfig
  /** The related settings of tab */
  tab: ItemConfig
  /** The related settings of recently closed tab */
  recentlyClosedTab: ItemConfig
}

interface ExtConfig {
  /** Single setting */
  itemSet: ItemConfigSet
}

interface MsgToTab {
  type: 'openExtension'
}

interface MsgToOthers {
  action: 'QueryReq' | 'WebQueryReq' | 'Select'
  searchStr?: string
  item?: SingleQueryResults
}

interface SingleSearch {
  type: string
  searchQueue: string[]
}

interface SingleOmniboxSearch {
  content: string
  description: string
}
