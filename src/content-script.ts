import { browser } from 'webextension-polyfill-ts'

const frag = document.createElement('div')
frag.id = 'Test'
frag.innerHTML = `<iframe id="TestIframe" src="${browser.runtime.getURL('main.html#/content')}"></iframe>`
document.body.appendChild(frag)
