<template lang="pug">
.main
  section.module.login-register
    .container
      .row.min-h-300
        .col-sm-6.col-sm-offset-3.mb-sm-40
          h4.font-alt Reset Password
          p Enter your registered email
          hr.divider-w.mb-10
          .alert.alert-danger(v-show="error")
             | {{error}}
          .alert.alert-success(v-show="success")
             | {{success}}
          form.form.custom-form(@submit.prevent="resetPassword()")
            .form-group(:class="{'has-error': emailError}")
              input.form-control(placeholder='Email*' type='text' v-model.trim="email")
              small.form-control-feedback(v-show="emailError")
                | {{emailError}}
            .form-group
              button.btn.btn-round.btn-info {{btnText}}
              span.preloader-next-to-buttton(v-if="loader")
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
  name: 'PasswordReset',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin, userRegistrationMixin],
  data () {
    return {
      email: '',
      error: false,
      success: false,
      emailError: false,
      loader: false,
      btnText: 'Submit'
    }
  },
  watch: {
    email () {
      this.btnText = 'Submit'
    }
  },
  mounted () {
    this.scrollToTop()
  },
  methods: {
    resetPassword () {
      this.error = false
      this.success = false
      if (this.emailValidate() && !this.loader) {
        this.loader = true
        this.$options.service.sendResetPasswordMail(this.email, this.getLinkVerificationURL())
          .then((data) => {
            this.loader = false
            if (!data.success) {
              this.error = data.error
            } else {
              this.success = data.message + ' Hit Resend button if you did not receive it.'
              this.btnText = 'Resend'
            }
          })
          .catch((mErr) => {
            this.loader = false
            this.showNotification('Soemthing went wrong while trying to send mail. ', 'error')
          })
      }
    },
    getLinkVerificationURL () {
      return this.getBaseURL() + '/changePassword'
    },
    emailValidate () {
      if (this.validateEmail(this.email)) {
        this.emailError = false
        return true
      } else {
        this.emailError = 'Please enter a valid email'
        return false
      }
    }
  }
}
</script>
