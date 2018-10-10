import '@/stylus/content-script.styl'
import { browser } from 'webextension-polyfill-ts'

const frag = document.createElement('div')
frag.id = 'CrownExtensionWrapper'
frag.innerHTML = `<iframe id="CrownExtensionIframe" scrolling="no" src="${browser.runtime.getURL(
  'main.html#/content'
)}"></iframe>`
document.body.appendChild(frag)

const ele = document.getElementById('CrownExtensionWrapper') as HTMLElement
browser.runtime.onMessage.addListener((response: CMessage) => {
  if (response.type === 'openExtension') {
    ele.style.display = 'block'
  }
})

document.body.addEventListener('click', (event: Event) => {
  if (!(ele === event.target || ele.contains(event.target as Element))) {
    ele.style.display = 'none'
  }
})
