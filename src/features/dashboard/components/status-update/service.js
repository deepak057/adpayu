import store from '@/store'
import auth from '@/auth/helpers'

export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }

  createPost (feed) {
    return auth.post('/posts', feed)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  tagsAutoSuggestions (tag) {
    return auth.get('/tags', {tag: tag})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  uploadImages (images) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return auth.post('/upload/images', images, config)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
}
