<template lang="pug">
.main
  section.module
    .container
      .row.min-h-300
        .col-sm-6.col-sm-offset-3.mb-sm-40
          h4.font-alt Login
          hr.divider-w.mb-10
          .alert.alert-danger(v-show="error")
             | {{error}}
          form.form(onSubmit="return false")
            .form-group
              input.form-control(required='', placeholder='Email', type='text')(v-model="credentials.username")
            .form-group
              input.form-control(required='', placeholder='Password', type='password')(v-model="credentials.password")
            .form-group
              button.btn.btn-round.btn-info(@click="login") Login
            .form-group
              a(href='') Forgot Password?
            .form-group
              | Don't have an account?
              <router-link to="signup">
                |  Sign Up
              </router-link>
</template>

<script>
import auth from '@/auth/helpers'

export default {
  name: 'LoginPage',

  data () {
    return {
      passwordHidden: true,
      credentials: {
        username: '',
        password: ''
      },
      error: '',
      loading: false
    }
  },

  methods: {
    login () {
      this.loading = true

      const credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      auth.login(credentials, 'dashboard', ({isSuccess, data, errorMessage}) => {
        // console.log('Look here ' + data)
      })
        .then((data) => {
          if (!data.success) {
            this.error = data.error
          }
        })
      /* auth.fakeLogin(credentials, 'dashboard')
        .then((data) => {
          this.loading = false
        }) */
    }
  }
}
</script>
