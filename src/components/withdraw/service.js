import store from '@/store'
import auth from '@/auth/helpers'

export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }

  getWithdrawOverview (mode = 'bank') {
    return auth.get('/withdraw/overview', {mode: mode})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
  triggerWithdrawl (data) {
    return auth.post('/withdraw', data)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
  uploadAccountIdentityDocs (files, config = false) {
    let configuration = config || {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return auth.post('/upload/image', files, configuration)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
}
