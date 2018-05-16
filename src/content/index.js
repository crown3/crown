import Vue from 'vue'

import App from '../popup/popup'
import './content.scss'

Vue.config.productionTip = false

function initCrown() {
  const docfrag = document.createDocumentFragment()
  const tmpNode = document.createElement('div')
  tmpNode.classList.add('crown-mask')
  tmpNode.innerHTML = '<div class="crown-container"><div id="CrownApp"></div></div>'
  docfrag.appendChild(tmpNode)
  document.body.appendChild(docfrag)

  /* eslint-disable no-new */
  new Vue({
    el: '#CrownApp',
    render: h => h(App)
  })
}

chrome.runtime.onMessage.addListener(req => {
  // req.action is a JSON which you send
  if (req.type === 'openExtension') {
    // insert crown dom if it doesn't exit
    if (!document.getElementById('CrownApp')) initCrown()
    else {
      const crownMack = document.getElementsByClassName('crown-mask')[0]
      if (crownMack.style.display !== 'block') {
        crownMack.style.display = 'block'
        document.getElementsByClassName('input-crown')[0].focus()
      }
    }
  }
})
