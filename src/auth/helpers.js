import Vue from 'vue'
import { router } from '@/http'
import store from '@/store'
import auth from './'
import * as constants from '@/constants'

// const CLIENT_SECRET = 'ZGVtb2FwcDpkZW1vcGFzcw==' // Base64(client_id:client_secret) "demoapp:demopass"

export default {
  URLSearchParams (obj) {
    var params = new URLSearchParams()

    for (var [key, value] of Object.entries(obj)) params.append(key, value)

    return params
  },

  signup (creds, redirect, callback) {
    return Vue.http({
      method: 'post',
      url: constants.API_BASE_URL + '/users',
      // headers: {
      //  'Authorization': 'Basic ' + CLIENT_SECRET,
      //  'Content-Type': 'application/x-www-form-urlencoded'
      // },
      data: this.URLSearchParams({
        email: creds.email,
        password: creds.password,
        first: creds.first,
        last: creds.last
      })
    })
      .then((response) => {
        auth.storeToken(response)

        if (redirect) router.push({ name: redirect })
        return response.data
      })
      .catch((error) => {
        /* let errorMessage = null */
        return error.response.data
        /* if (error.response) errorMessage = error.response.status
        else if (error.request) errorMessage = 'no response from server'
        else errorMessage = error.message

        return errorMessage */
      })
  },

  login (creds, redirect, callback) {
    return Vue.http({
      method: 'post',
      url: constants.API_BASE_URL + '/users/login',
      // headers: {
      //  'Authorization': 'Basic ' + CLIENT_SECRET,
      //  'Content-Type': 'application/x-www-form-urlencoded'
      // },
      data: this.URLSearchParams({
        grant_type: 'password',
        client_id: 'demoapp',
        client_secret: 'demopass',
        email: creds.username,
        password: creds.password
      })
    })
      .then((response) => {
        auth.storeToken(response)

        if (redirect) router.push({ name: redirect })
        return response.response.data
      })
      .catch((error) => {
        /* let errorMessage = null */
        return error.response.data
        /* if (error.response) errorMessage = error.response.status
        else if (error.request) errorMessage = 'no response from server'
        else errorMessage = error.message

        return errorMessage */
      })
  },

  logout () {
    store.dispatch('common/clear')
    router.push({ name: 'login' })
  },

  getUser () {
    return store.state.auth.user
  },

  getNotifications (page = 1, autoMarkSeen = false) {
    return Vue.http({
      method: 'get',
      url: constants.API_BASE_URL + '/notifications',
      params: {
        page: page,
        autoMarkSeen: autoMarkSeen
      }
    })
      .then((response) => {
        return new Promise((resolve) => { resolve(response.data) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  },

  getPost (postId) {
    return Vue.http({
      method: 'get',
      url: constants.API_BASE_URL + '/post/' + postId
    })
      .then((response) => {
        return new Promise((resolve) => { resolve(response.data) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  },

  updateUserState (user) {
    store.state.auth.user = user
    store.dispatch('auth/update', store.state.auth)
  },

  updateUserTags (tags, action) {
    let userTags = store.state.auth.userTags
    if (action) {
      if (action === 'add') {
        userTags.push(tags)
      } else {
        for (let i in userTags) {
          if (userTags[i].id === tags.id) {
            userTags.splice(i, 1)
            break
          }
        }
      }
    } else {
      userTags = tags
    }
    store.state.auth.userTags = userTags
    store.dispatch('auth/update', store.state.auth)
  },

  friendshipUpdate (action, friendId) {
    switch (action) {
      case 'request':
        this.sendRequest(friendId)
        break
      case 'add':
        this.acceptFriendship(friendId)
        break
      default:
        this.removeFriendship(friendId)
        break
    }
  },

  sendRequest (friendId) {
    return Vue.http({
      method: 'post',
      url: constants.API_BASE_URL + '/friends/request/' + friendId
    })
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  },

  removeFriendship (friendId) {
    return Vue.http({
      method: 'delete',
      url: constants.API_BASE_URL + '/friends/remove/' + friendId
    })
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  },

  acceptFriendship (friendId) {
    return Vue.http({
      method: 'put',
      url: constants.API_BASE_URL + '/friends/add/' + friendId
    })
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  },

  updateCurrentUser (user) {
    return Vue.http({
      method: 'put',
      url: constants.API_BASE_URL + '/users',
      // headers: {
      //  'Authorization': 'Basic ' + CLIENT_SECRET,
      //  'Content-Type': 'application/x-www-form-urlencoded'
      // },
      data: this.URLSearchParams(user)
    })
      .then((response) => {
        this.updateUserState(response.data.user)
        return response.data
      })
      .catch((error) => {
        /* let errorMessage = null */
        return error.response.data
        /* if (error.response) errorMessage = error.response.status
        else if (error.request) errorMessage = 'no response from server'
        else errorMessage = error.message

        return errorMessage */
      })
  },

  fakeLogin (creds, redirect) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        auth.storeToken({data: { accessToken: '123456789', refreshToken: '77777777' }})
        if (redirect) router.push({ name: redirect })
        resolve({})
      }, 500)
    })
  },

  // Standardizes errors. A place to add logging if needed.
  get (url, params = {}) {
    const config = {
      params: {
      }
    }

    config.params = Object.assign(config.params, params)

    return Vue.auth.get(constants.API_BASE_URL + url, config)
      .then((response) => {
        return new Promise((resolve) => {
          // @TODO check for no response.data.data?
          resolve(response.data)
        })
      })
      .catch((error) => {
        // Standardize errors.
        let errorMessage = null

        if (error.response) {
          errorMessage = error.response.statusText || error.response.status
        } else if (error.request) {
          errorMessage = 'no response from server'
        } else {
          errorMessage = error.message
        }

        return new Promise((resolve, reject) => {
          reject(new Error(errorMessage))
        })
      })
  },

  post (url, data = {}, config = {}) {
    return Vue.auth.post(constants.API_BASE_URL + url, data, config)
      .then((response) => {
        if (response.data.errors) {
          return new Promise((resolve, reject) => {
            reject(new Error(response.data.errors[0].user_message))
          })
        }

        return new Promise((resolve) => {
          // @TODO check for no response.data.data?
          resolve(response.data)
        })
      })
      .catch((error) => {
        // Standardize errors.
        let errorMessage = null

        if (error.response) {
          errorMessage = error.response.statusText || error.response.status
        } else if (error.request) {
          errorMessage = 'no response from server'
        } else {
          errorMessage = error.message
        }

        return new Promise((resolve, reject) => {
          reject(new Error(errorMessage))
        })
      })
  },
  delete (url, data = {}, config = {}) {
    return Vue.auth.delete(constants.API_BASE_URL + url, data, config)
      .then((response) => {
        if (response.data.errors) {
          return new Promise((resolve, reject) => {
            reject(new Error(response.data.errors[0].user_message))
          })
        }

        return new Promise((resolve) => {
          // @TODO check for no response.data.data?
          resolve(response.data)
        })
      })
      .catch((error) => {
        // Standardize errors.
        let errorMessage = null

        if (error.response) {
          errorMessage = error.response.statusText || error.response.status
        } else if (error.request) {
          errorMessage = 'no response from server'
        } else {
          errorMessage = error.message
        }

        return new Promise((resolve, reject) => {
          reject(new Error(errorMessage))
        })
      })
  },
  put (url, data = {}, config = {}) {
    /* const config = {}

    const defaultData = {
      username: store.state.auth.user.id,
      orgId: store.state.auth.user.orgId
    }
    data = Object.assign(defaultData, data) */

    return Vue.auth.put(constants.API_BASE_URL + url, data, config)
      .then((response) => {
        if (response.data.errors) {
          return new Promise((resolve, reject) => {
            reject(new Error(response.data.errors[0].user_message))
          })
        }

        return new Promise((resolve) => {
          // @TODO check for no response.data.data?
          resolve(response.data.data)
        })
      })
      .catch((error) => {
        // Standardize errors.
        let errorMessage = null

        if (error.response) {
          errorMessage = error.response.statusText || error.response.status
        } else if (error.request) {
          errorMessage = 'no response from server'
        } else {
          errorMessage = error.message
        }

        return new Promise((resolve, reject) => {
          reject(new Error(errorMessage))
        })
      })
  }
}
