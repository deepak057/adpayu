import store from '@/store'
import auth from '@/auth/helpers'

export default class Service {
  constructor (options) {
    this.id = store.state.auth.user.id
  }

  getPaymentToken (data) {
    return auth.get('/payment/getToken', data)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
  checkPaymentStatus (orderId) {
    return auth.get('/payment/checkOrderStatus/' + orderId)
      .then((response) => {
        return new Promise((resolve) => { resolve(response) })
      })
      .catch((error) => {
        return new Promise((resolve, reject) => { reject(error) })
      })
  }
}
