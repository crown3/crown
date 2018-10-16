declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.styl'
declare module '*.json' {
  const value: any
  export default value
}

interface ItemConfig {
  /** Is set as default search option? */
  isDefault: boolean
  /** The keyword to trigger the search */
  keyword: string
  /** Related description */
  desc: string
}

interface ExtensionConfig {
  /** Single setting */
  itemSet: ItemConfigSet
}

interface SingleOmniboxSearch {
  content: string
  description: string
}

type CSource = 'background' | 'content' | 'content-script' | 'popup'

interface CMessageBasic {
  from: CSource
  to: CSource
}

interface CMessage1 extends CMessageBasic {
  type: 'select'
  content: QueryResultItem
}

interface CMessage2 extends CMessageBasic {
  type: 'openExtension' | 'closeExtension'
}

interface CMessage3 extends CMessageBasic {
  type: 'queryResult'
  content: QueryResultItem[]
}
interface CMessage4 extends CMessageBasic {
  type: 'queryRequest'
  content: string
}

type CMessage = CMessage1 | CMessage2 | CMessage3 | CMessage4

type CMessageType = 'tab' | 'bookmark' | 'RCT' | 'keyword'

interface QueryResultItem {
  /** item of search result's type */
  type: CMessageType
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

interface SingleSearch {
  type: CMessageType
  searchQueue: string[]
}

interface ItemConfigSet {
  /** The related settings of bookmark */
  bookmark: ItemConfig
  /** The related settings of tab */
  tab: ItemConfig
  /** The related settings of recently closed tab */
  RCT: ItemConfig
}
