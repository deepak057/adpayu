import store from '@/store'
import auth from '@/auth/helpers'

export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }

  search (type, keyword, page, otherParameters = false) {
    let paramObj = {
      k: keyword,
      page: page
    }

    if (otherParameters) {
      for (let i in otherParameters) {
        if (otherParameters.hasOwnProperty(i)) {
          paramObj[i] = otherParameters[i]
        }
      }
    }

    return auth.get('/search/' + type, paramObj)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
}
