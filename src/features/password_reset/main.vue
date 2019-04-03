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
          form.form.custom-form(@submit.prevent="resetPassword()")
            .form-group(:class="{'has-error': emailError}")
              input.form-control(placeholder='Email*' type='text' v-model.trim="email")
              small.form-control-feedback(v-show="emailError")
                | {{emailError}}
            .form-group
              button.btn.btn-round.btn-info Submit
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

export default {
  name: 'PasswordReset',
  mixins: [mixin, userRegistrationMixin],
  data () {
    return {
      email: '',
      error: false,
      emailError: false
    }
  },
  mounted () {
    this.scrollToTop()
  },
  methods: {
    resetPassword () {
      this.error = false
      if (this.emailValidate()) {
      }
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
