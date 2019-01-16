export default {
  methods: {
    validateName (name) {
      if (!name) {
        return false
      }
      let userName = name.split(' ')
      return userName[0] && userName[1]
    },
    validateEmail (email) {
      return email.length && this.validEmail(email)
    },
    validatePassword (password) {
      return password.length
    },
    validEmail (email) {
      // eslint-disable-next-line no-useless-escape
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
