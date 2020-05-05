import store from '@/store'
import auth from '@/auth/helpers'

export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }

  getTimelineFeed (uid, page) {
    return auth.get('/posts/timelineFeed/' + uid, {page: page})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  getFriends () {
    return auth.get('/friends')
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  getReferralCode () {
    return auth.get('/referral/getRefCode')
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
}
