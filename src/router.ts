import Vue from 'vue'
import Router from 'vue-router'
import Popup from './views/Popup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Popup,
    },
    {
      path: '/options',
      name: 'options',
      component: () =>
        import(/* webpackChunkName: "options" */ './views/Options.vue'),
    },
    {
      path: '/content',
      name: 'content',
      component: () =>
        import(/* webpackChunkName: "content" */ './views/Content.vue'),
    },
  ],
})
