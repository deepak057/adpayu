import store from '@/store'
import auth from '@/auth/helpers'

export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }

  createComment (postId, comment) {
    return auth.post('/comments/' + postId, comment)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  postLike (postId, action) {
    return auth.post('/like/post/' + postId, {})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  removePostLike (postId, action) {
    return auth.delete('/like/post/' + postId, {})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  commentLike (commentId, action) {
    return auth.post('/like/comment/' + commentId, {})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  removeCommentLike (commentId, action) {
    return auth.delete('/like/comment/' + commentId, {})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  consumeAd (postId, action = 'impression') {
    return auth.post('/ad/adConsumed/' + action + '/' + postId)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  deletePost (postId) {
    return auth.delete('/posts/' + postId)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  loadComments (postId, userFeed = false) {
    return auth.get('/comments/' + postId + '?userFeed=' + userFeed)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  updatePost (postObj) {
    return auth.put('/posts', postObj)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
  updateComment (commentId, comment) {
    return auth.put('/comments/edit/' + commentId, {comment: comment})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
  loadReactions (commentId, page = 1) {
    return auth.get('/reactions/' + commentId + '?page=' + page)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
  saveReaction (commentId, reaction) {
    return auth.post('/reactions/add/' + commentId, {reaction: reaction})
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }

  removeReaction (reactionId) {
    return auth.delete('/reactions/' + reactionId)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
}
