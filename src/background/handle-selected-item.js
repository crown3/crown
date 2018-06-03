import chromeAPI from '../api/chrome-api'

function handleSelectedItem(item) {
  switch (item.type) {
    case 'bookmark':
      chromeAPI.openNewTab(item.subtitle)
      break
    case 'tab':
      chromeAPI.updateTabStatus(item.id)
      break
    case 'recentlyClosed':
      chromeAPI.restoreRecentTab(item.id)
      break

    default:
      break
  }
}

export default handleSelectedItem
