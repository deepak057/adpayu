import Vue from 'vue'
import store from './store'
import { sync } from 'vuex-router-sync'
import { http, router } from './http'
import auth from './auth'
import Vuetify from 'vuetify'
import URLSearchParams from 'url-search-params'
import App from './app'
import Loading from './components/loading'
import Appbar from './components/app-bar'
import Appfooter from './components/app-footer'
import ToggleButton from 'vue-js-toggle-button'
import wysiwyg from 'vue-wysiwyg'
import VueTimeago from 'vue-timeago'
import infiniteScroll from 'vue-infinite-scroll'
import Notifications from 'vue-notification'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.config.productionTip = false

// Polyfills
global.URLSearchParams = URLSearchParams

// Sync router to store, as `store.state.route`.
sync(store, router)

// Http and Auth plugins
Vue.use(http)
Vue.use(auth)

// Switch button
Vue.use(ToggleButton)

// WYSIWYG editor
Vue.use(wysiwyg, {})

// Vue Time Ago
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en' // Default locale
})

// Infinie Scroll
Vue.use(infiniteScroll)

// Vuetify
Vue.use(Vuetify, {
  theme: {
    primary: '#21CE99',
    secondary: '#D81B60',
    accent: '#805441'
  }
})

// Vue Notifications
Vue.use(Notifications)

// Plugin that detects when an element is visible
// in client's browser
Vue.use(VueObserveVisibility)

// Styles
require('./styles/scss/main.scss')
require('./styles/stylus/main.styl')

// Global Components
Vue.component('loading', Loading)
Vue.component('Appbar', Appbar)
Vue.component('Appfooter', Appfooter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
