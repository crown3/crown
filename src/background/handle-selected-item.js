import chromeAPI from '../api/chrome-api'

function handleItem(item) {
  switch (item.type) {
    case 'bookmark':
      chromeAPI.openNewTab(item.subtitle)
      break
    case 'tab':
      chromeAPI.updateTabStatus(item.id)
      break

    default:
      break
  }
}

export default handleItem
