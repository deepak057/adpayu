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
        last: creds.last,
        location: creds.location
      })
    })
      .then((response) => {
        auth.storeToken(response)

        if (redirect) router.push(redirect)
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

        if (redirect) router.push(redirect)
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

  logout () {
    store.dispatch('common/clear')
    router.push({ name: 'home' })
    window.location = '/'
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

  deleteComment (commentId) {
    return Vue.http({
      method: 'delete',
      url: constants.API_BASE_URL + '/comments/' + commentId
    })
      .then((response) => {
        return new Promise((resolve) => { resolve(response.data) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  },

  uploadImage (image) {
    return Vue.http({
      method: 'post',
      url: constants.API_BASE_URL + '/upload/image',
      data: image
    })
      .then((response) => {
        return new Promise((resolve) => { resolve(response.data) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  },

  createPost (feed) {
    return Vue.http({
      method: 'post',
      url: constants.API_BASE_URL + '/posts',
      data: feed
    })
      .then((response) => {
        return new Promise((resolve) => { resolve(response.data) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  },

  getPost (postId, checkOwner = false) {
    return Vue.http({
      method: 'get',
      url: constants.API_BASE_URL + '/post/' + postId,
      params: {checkOwner: checkOwner}
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
  saveLocalPost (post) {
    store.state.auth.post = post
    store.dispatch('auth/update', store.state.auth)
  },
  getLocalPost () {
    return store.state.auth.post
  },
  saveLocalRevenue (totalRevenue) {
    store.state.auth.totalRevenue = totalRevenue
    store.dispatch('auth/update', store.state.auth)
  },
  getLocalRevenue () {
    return store.state.auth.totalRevenue
  },
  getLocalOptions () {
    return store.state.auth.options
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
        return this.sendRequest(friendId)
      case 'add':
        return this.acceptFriendship(friendId)
      default:
        return this.removeFriendship(friendId)
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
        return new Promise((resolve) => {
          this.updateUserState(response.data.user)
          resolve(response.data)
        })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
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
  }
}
