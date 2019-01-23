import store from '@/store'
import auth from '@/auth/helpers'

export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }

  follow (tagId) {
    return auth.put('/tags/follow/' + tagId)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        alert('Something went wrong while following the tag')
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  unfollow (tagId) {
    return auth.delete('/tags/unfollow/' + tagId)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        alert('Something went wrong while unfollowing the tag')
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
}
