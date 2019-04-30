<template lang="pug">
.main
  section.module.p-80.login-register
    .container
      .row.min-h-450
        .col-sm-6.col-sm-offset-3.mb-sm-40
          h4.font-alt Sign Up
            span.small  (It's totally free)
          hr.divider-w.mb-10
          form.form.custom-form(onSubmit="return false")
            .alert.alert-danger(v-show="error")
              | {{error}}
            .form-group(:class="{'has-error': nameError.length}")
               .col-xs-12
               input.form-control(placeholder='Full Name*', type='text' v-model.trim='name' :class="{'form-control-danger': nameError.length}")
               small.form-control-feedback(v-show="nameError.length")
                 | {{nameError}}
            .form-group(:class="{'has-error': emailError.length}")
               .col-xs-12
               input.form-control(placeholder='Email*', type='text' v-model.trim='email' :class="{'form-control-danger': emailError.length}")
               small.form-control-feedback(v-show="emailError.length")
                 | {{emailError}}
            .form-group(:class="{'has-error': passwordError.length}")
               .col-xs-12
               input.form-control(placeholder='Password*', type='password' v-model.trim='password' :class="{'form-control-danger': passwordError.length}")
               small.form-control-feedback(v-show="passwordError.length")
                 | {{passwordError}}
            .form-group(:class="{'has-error': locationError.length}")
               .col-xs-12
               select.form-control.form-control-line(v-model="location")
                 option(value="" selected disabled hidden) Country*
                 option(v-for="country in countryList" :value='country.code') {{country.text}}
               small.form-control-feedback(v-show="locationError.length")
                   | {{locationError}}
            .form-group(:class="{'has-error': termsError.length}")
               .checkbox.checkbox-success.p-t-0.p-l-10
               input#checkbox-signup(type='checkbox' v-model='terms' :class="{'form-control-danger': termsError.length}")
               label(for='checkbox-signup')
                 |  I agree to all
                 a(:href="getPageURL('terms')" target='_blank' class="m-l-5")
                   | Terms & Conditions
               small.form-control-feedback.block.m-t-10(v-show="termsError.length")
                 | {{termsError}}
            .form-group
              button.btn.btn-round.btn-info(@click="signup") Sign Up
            .form-group
              | Already have an account?
              <router-link :to="redirectURLs('login')">
                |  Sign In
              </router-link>
</template>

<script>
import auth from '@/auth/helpers'
import mixin from '../../globals/mixin'
import userRegistrationMixin from '../../globals/user-register'
import countryList from '../../globals/countries.js'

export default {
  name: 'SignupPage',
  mixins: [mixin, userRegistrationMixin, countryList],
  data () {
    return {
      name: '',
      nameError: '',
      first: '',
      last: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      terms: false,
      termsError: '',
      error: '',
      location: '',
      locationError: ''
    }
  },
  watch: {
    name (newName) {
      if (newName.indexOf(' ') >= 0) {
        var name = newName.split(' ')
        this.first = name[0]
        this.last = name[1]
      } else {
        this.first = ''
        this.last = ''
      }
    }
  },
  mounted () {
    this.scrollToTop()
  },
  methods: {
    signup () {
      this.validate()
    },
    validate () {
      if (this.nameValidate() && this.emailValidate() && this.passwordValidate() && this.countryValidate() && this.termsValidate()) {
        var data = {
          email: this.email,
          password: this.password,
          first: this.first,
          last: this.last,
          location: this.location
        }
        auth.signup(data, this.getRedirectPath(), ({isSuccess, data, errorMessage}) => {
        })
          .then((data) => {
            if (!data.success) {
              this.error = data.error
            } else {
              this.error = ''
              this.showNotification('Registration successful. Welcome! ', 'success')
            }
          })
      }
    },
    nameValidate () {
      if (!this.validateName(this.first + ' ' + this.last)) {
        this.nameError = 'Please enter your full name'
        return false
      } else {
        this.nameError = ''
        return true
      }
    },
    emailValidate () {
      if (this.validateEmail(this.email)) {
        this.emailError = ''
        return true
      } else {
        this.emailError = 'Please enter a valid email'
        return false
      }
    },
    passwordValidate () {
      if (this.validatePassword(this.password)) {
        this.passwordError = ''
        return true
      } else {
        this.passwordError = 'Please enter a valid password'
        return false
      }
    },
    countryValidate () {
      if (this.validateCountry(this.location)) {
        this.locationError = ''
        return true
      } else {
        this.locationError = 'Please choose your country'
        return false
      }
    },
    termsValidate () {
      if (this.terms) {
        this.termsError = ''
        return true
      } else {
        this.termsError = 'Please agree to our terms'
        return false
      }
    }
  }
}
</script>
