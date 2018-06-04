function Echo(...args) {
  if (args.length === 1) {
    console.log('no intro', args[0])
    return args[0]
  }

  if (args.length === 2) {
    console.log(args[0], args[1])
    return args[1]
  }
}

/**
 * https://stackoverflow.com/questions/35802159/chrome-omnibox-special-characters-throw-error
 * handle a error about (omnibox description xmlParseEntityRef: no name)
 */
function encodeXml(str) {
  const dom = document.createElement('div')
  dom.textContent = str
  return dom.innerHTML
}

/**
 * Whether each is eligible
 * @param {Array} arr
 * @param {String} testedStr
 */
function isEachEligible(arr, testedStr) {
  return arr.every(item => new RegExp(`${item}`, 'gi').test(testedStr))
}

export default {
  Echo,
  encodeXml,
  isEachEligible
}
