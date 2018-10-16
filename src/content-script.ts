import '@/stylus/content-script.styl'
import { browser } from 'webextension-polyfill-ts'

const frag = document.createElement('div')
frag.id = 'CrownExtensionWrapper'
document.body.appendChild(frag)

const ele = document.getElementById('CrownExtensionWrapper') as HTMLElement
browser.runtime.onMessage.addListener((response: CMessage) => {
  switch (response.type) {
    case 'openExtension':
      if (!document.getElementById('CrownExtensionIframe')) {
        ele.innerHTML = `<iframe id="CrownExtensionIframe" scrolling="no" src="${browser.runtime.getURL(
          'main.html#/content'
        )}"></iframe>`
      }
      ele.style.display = 'block'
      break
    case 'closeExtension':
      ele.innerHTML = ''
      ele.style.display = 'none'
      break

    default:
      break
  }
})

document.body.addEventListener('click', (event: Event) => {
  if (!(ele === event.target || ele.contains(event.target as Element))) {
    ele.style.display = 'none'
  }
})
