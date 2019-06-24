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
    },
    validatePhoneNumber (number) {
      let phoneno = /^\d{10}$/
      return number && !isNaN(number) && number.match(phoneno)
    },
    validateCountry (country) {
      return country && country.length
    },
    getUserFirstAndLastName (newName) {
      let first = ''
      let last = ''
      if (newName.indexOf(' ') >= 0) {
        let name = newName.split(' ')
        first = name[0]
        if (name.length > 2) {
          for (let i = 1; i < name.length; i++) {
            last += name[i] + ' '
          }
          last = last.trim()
        } else {
          last = name[1]
        }
      }
      return {
        first: first,
        last: last
      }
    }
  }
}
