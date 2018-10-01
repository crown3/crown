import init from '@/popup/init'
import App from './App.vue'

if (!document.getElementById('CrownApp')) {
  // init page when first load
  const temp = document.createElement('div')
  temp.id = 'CrownApp'
  document.body.appendChild(temp)

  // init popup in content
  init('#CrownApp', App)
}
