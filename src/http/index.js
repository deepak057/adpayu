import axios from 'axios'
import router from './router'
import Vue from 'vue'
import store from '@/store'
import * as constants from '@/constants'

export const http = {
  install (Vue, options) {
    Vue.prototype.$http = Vue.http = axios.create()
    this.addInterceptors()
  },
  addInterceptors () {
    if (store.state.auth.accessToken) {
      Vue.http.defaults.headers.common['Authorization'] = store.state.auth.accessToken
    }

    // Watch for accessToken changes and update our common Auth header.
    store.watch((state) => {
      return state.auth.accessToken
    }, (accessToken) => {
      /* if (!constants.DEBUG) { */
      Vue.http.defaults.headers.common['Authorization'] = accessToken
      /* Vue.auth.defaults.transformRequest = [(data, headers) => {
          // data.access_token = accessToken
          return data
        }] */
      /* } */

      if (constants.DEBUG) {
        console.log('token set')
      }
    }, {
      deep: true
    })

    // Intercept the response and refresh (one retry) if invalid token.
    Vue.http.interceptors.response.use(function (response) {
      return Promise.resolve(response)
      /* if (constants.DEBUG) return Promise.resolve(response) */

    /*  if (this.isInvalidToken(response)) {
        return this.refreshToken(response.request)
      } */
    }, function (error) {
      return Promise.reject(error)
    })
  }
}

export { router }
