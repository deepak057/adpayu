<template lang="pug">
.main
  section.module.login-register
    .container
      .row.min-h-300
        .col-sm-6.col-sm-offset-3.mb-sm-40
          h4.font-alt Login
          hr.divider-w.mb-10
          .alert.alert-danger(v-show="error")
             | {{error}}
          form.form.custom-form(onSubmit="return false")
            .form-group
              input.form-control(required='', placeholder='Email*', type='text', v-model.trim="credentials.username")
            .form-group
              input.form-control(required='', placeholder='Password*', type='password', v-model="credentials.password")
            .form-group
              button.btn.btn-round.btn-info(@click="login") Login
            .form-group
              <router-link to="/passwordReset">
                | Forgot Password?
              </router-link>
            .form-group
              | Don't have an account?
              <router-link to="signup">
                |  Sign Up
              </router-link>
</template>
<script>
import auth from '@/auth/helpers'
import mixin from '../../globals/mixin'
export default {
  name: 'LoginPage',
  mixins: [mixin],
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
  mounted () {
    this.scrollToTop()
  },
  methods: {
    login () {
      this.loading = true

      const credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      auth.login(credentials, this.getRedirectPath(), ({isSuccess, data, errorMessage}) => {
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
