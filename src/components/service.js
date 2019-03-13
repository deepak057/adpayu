import store from '@/store'
import auth from '@/auth/helpers'

export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }

  getTags () {
    return auth.get('/tags/user', {})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  getNotifications () {
    return auth.get('/notifications', {})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
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
}
