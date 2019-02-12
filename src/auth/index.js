import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import * as constants from '@/constants'

// const CLIENT_SECRET = 'demopass' // Base64(client_id:client_secret) "demoapp:demopass"

export default {

  install (Vue, options) {
    Vue.prototype.$auth = Vue.auth = axios.create()

    this.setDefaults()
    this.addInterceptors()
  },

  setDefaults () {
    Vue.auth.defaults.baseURL = constants.API_BASE_URL
  },

  addInterceptors () {
    if (store.state.auth.accessToken) {
      Vue.auth.defaults.headers.common['Authorization'] = store.state.auth.accessToken
    }

    // Watch for accessToken changes and update our common Auth header.
    store.watch((state) => {
      return state.auth.accessToken
    }, (accessToken) => {
      /* if (!constants.DEBUG) { */
      Vue.auth.defaults.headers.common['Authorization'] = accessToken
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
    Vue.auth.interceptors.response.use(function (response) {
      return Promise.resolve(response)
      /* if (constants.DEBUG) return Promise.resolve(response) */

    /*  if (this.isInvalidToken(response)) {
        return this.refreshToken(response.request)
      } */
    }, function (error) {
      return Promise.reject(error)
    })
  },

  isInvalidToken (response) {
    const status = response.status
    const error = response.data.error

    // Customize this to your Oauth server.
    return (status === 401 && (error === 'invalid_token' || error === 'expired_token'))
  },

  refreshToken (request) {
    return axios({
      method: 'post',
      url: constants.REFRESH_TOKEN_URL,
      // headers: {'Authorization': 'Basic ' + CLIENT_SECRET},
      data: {
        grant_type: 'refresh_token',
        refresh_token: store.state.auth.refreshToken
      }
    })
      .then((response) => {
        this.storeToken(response)
        return this.retry(request)
      })
      .catch((errorResponse) => {
        if (this.isInvalidToken(errorResponse)) { this.logout() }
        return errorResponse
      })
  },

  storeToken (response) {
    const auth = store.state.auth

    auth.isLoggedIn = true
    auth.accessToken = response.data.token
    auth.refreshToken = response.data.refreshToken
    auth.user = response.data.user
    // auth.options = response.data.options
    /*
    // @TODO: get user's name from response from Oauth server.
    auth.user.name = response.data.user.first + ' ' + response.data.user.last
    auth.user.first = response.data.user.first
    auth.user.last = response.data.user.last
    auth.user.id = response.data.user.id
    auth.user.email = response.data.user.email
    */
    store.dispatch('auth/update', auth)
  },

  retry (request) {
    return Vue.auth(request)
      .then((response) => { return response })
      .catch((response) => { return response })
  }
}
