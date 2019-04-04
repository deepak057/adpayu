<template lang="pug">
.main
  section.module.login-register
    .container
      .row.min-h-300
        .text-center.m-t-40
          div(v-if="loader")
            <preloader/>
            p.m-t-10  Verifying the link.....
          .alert.alert-danger(v-if="keyError")
            | {{keyError}}
          .alert.alert-success(v-show="success")
             | Account password changed successfully. You may now
             <router-link to="/login">
               |  login
             </router-link>
             |   to continue.
        .col-sm-6.col-sm-offset-3.mb-sm-40(v-if="!loader && !keyError && !success")
          h4.font-alt Change Account Password
          p Choose a new password for your account
          hr.divider-w.mb-10
          .alert.alert-danger(v-show="error")
             | {{error}}
          form.form.custom-form(@submit.prevent="resetPassword()")
            .form-group(:class="{'has-error': passwordError}")
              input.form-control(placeholder='New Password*' type='password' v-model.trim="password")
              small.form-control-feedback(v-show="passwordError")
                | {{passwordError}}
            .form-group(:class="{'has-error': confirmPasswordError}")
              input.form-control(placeholder='Confirm Password*' type='password' v-model.trim="confirmPassword")
              small.form-control-feedback(v-show="confirmPasswordError")
                | {{confirmPasswordError}}
            .form-group
              button.btn.btn-round.btn-info Reset Password
              span.preloader-next-to-buttton(v-if="btnLoader")
                <preloader />
            .form-group
              | Already have an account?
              <router-link to="/login">
                |  Sign In
              </router-link>
            .form-group
              | Don't have an account?
              <router-link to="signup">
                |  Sign Up
              </router-link>
</template>

<script>
import mixin from '../../globals/mixin'
import userRegistrationMixin from '../../globals/user-register'
import Service from './service'
import Preloader from '../../components/preloader'

export default {
  name: 'ChangePassword',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin, userRegistrationMixin],
  data () {
    return {
      password: '',
      passwordError: false,
      keyError: false,
      error: false,
      success: false,
      confirmPassword: '',
      confirmPasswordError: false,
      loader: true,
      key: false,
      btnLoader: false
    }
  },
  watch: {
  },
  mounted () {
    this.scrollToTop()
    if (this.checkKey()) {
      this.$options.service.getUserByResetPasswordKey(this.key)
        .then((d) => {
          this.loader = false
          if (d.success) {
            this.keyError = false
          } else {
            this.keyError = d.error
          }
        })
        .catch((dErr) => {
          this.showNotification('Something went wrong while trying to verify the key', 'error')
        })
    }
  },
  methods: {
    getKey () {
      return this.$route.query.k || false
    },
    checkKey () {
      if (!this.getKey()) {
        this.loader = false
        this.keyError = 'Error: no secret key provided'
        return false
      } else {
        this.key = this.getKey()
        return true
      }
    },
    resetPassword () {
      if (this.validate() && !this.btnLoader) {
        this.btnLoader = true
        this.$options.service.updatePassword(this.key, this.password)
          .then((d) => {
            this.btnLoader = false
            if (d.success) {
              this.success = d.message
            } else {
              this.error = d.error
            }
          })
          .catch((pErr) => {
            this.btnLoader = false
            this.showNotification('Something went wrong while trying to update your password.', 'error')
          })
      }
    },
    validate () {
      return this.passwordValidate() && this.confirmPasswordValidate()
    },
    passwordValidate () {
      if (this.validatePassword(this.password)) {
        this.passwordError = false
        return true
      } else {
        this.passwordError = 'Please enter a valid password'
        return false
      }
    },
    confirmPasswordValidate () {
      if (this.confirmPassword === this.password) {
        this.confirmPasswordError = false
        return true
      } else {
        this.confirmPasswordError = 'Passwords do not match'
        return false
      }
    }
  }
}
</script>
