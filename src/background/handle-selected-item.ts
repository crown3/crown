import { openNewTab, restoreRecentTab, updateTabStatus } from '@/api'

function handleSelectedItem(item: SingleQueryResults) {
  switch (item.type) {
    case 'bookmark':
      openNewTab(item.subtitle as string)
      break
    case 'tab':
      updateTabStatus(item.id as number)
      break
    case 'closedTab':
      restoreRecentTab(item.id as string)
      break

    default:
      break
  }
}

export default handleSelectedItem
