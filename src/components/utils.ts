/**
 * https://stackoverflow.com/questions/35802159/chrome-omnibox-special-characters-throw-error
 * handle a error about (omnibox description xmlParseEntityRef: no name)
 */
function encodeXml(xml: string): string {
  const dom: HTMLElement = document.createElement('div')
  dom.textContent = xml
  return dom.innerHTML
}

/**
 * Whether each item is eligible
 */
function isEachEligible(arr: any[], tested: string): boolean {
  return arr.every((item) => new RegExp(`${item}`, 'gi').test(tested))
}

export { encodeXml, isEachEligible }
