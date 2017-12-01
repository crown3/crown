import Vue from 'vue'

import App from '../popup/popup'
import './content.scss'
import util from '../util'

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
  util.Echo('​req', req)
  // req.action is a JSON which you send
  if (req.type === 'openExtension') {
    // insert crown dom if it doesn't exit
    if (!document.getElementById('#CrownApp')) initCrown()
    // TODO: 在网页中打开窗口
  }
})
