<template lang="pug">
 .login-register(style='background-image:url(static/assets/images/background/login-register.jpg);')
    .login-box.card
      .card-body
        form#loginform.form-horizontal.form-material(onSubmit="return false")
          h3.box-title.m-b-20 Sign In
          .form-group
            .col-xs-12
              input.form-control(required='', placeholder='Username', type='text')(v-model="credentials.username")
          .form-group
            .col-xs-12
              input.form-control(required='', placeholder='Password', type='password')(v-model="credentials.password")
          .form-group
            .col-md-12
              .checkbox.checkbox-primary.pull-left.p-t-0
                input#checkbox-signup(type='checkbox')
                label(for='checkbox-signup')  Remember me
              a#to-recover.text-dark.pull-right(href='javascript:void(0)')
                i.fa.fa-lock.m-r-5
                |  Forgot pwd?
          .form-group.text-center.m-t-20
            .col-xs-12
              button.btn.btn-info.btn-lg.btn-block.text-uppercase.waves-effect.waves-light(type='submit')(@click="login") Log In
          .row
            .col-xs-12.col-sm-12.col-md-12.m-t-10.text-center
              .social
                a.btn.btn-facebook(href='javascript:void(0)', data-toggle='tooltip', title='Login with Facebook')
                  i.fa.fa-facebook(aria-hidden='true')
                a.btn.btn-googleplus(href='javascript:void(0)', data-toggle='tooltip', title='Login with Google')
                  i.fa.fa-google-plus(aria-hidden='true')
          .form-group.m-b-0
            .col-sm-12.text-center
              p
                | Don't have an account?
                a.text-info.m-l-5(href='register.html')
                  b Sign Up
        form#recoverform.form-horizontal(action='index.html')
          .form-group
            .col-xs-12
              h3 Recover Password
              p.text-muted Enter your Email and instructions will be sent to you!
          .form-group
            .col-xs-12
              input.form-control(required='', placeholder='Email', type='text')
          .form-group.text-center.m-t-20
            .col-xs-12
              button.btn.btn-primary.btn-lg.btn-block.text-uppercase.waves-effect.waves-light(type='submit') Reset
</template>

<script>
import auth from '@/auth/helpers'

export default {
  name: 'LoginPage',

  data () {
    return {
      passwordHidden: true,
      credentials: {
        username: 'user@user.com',
        password: 'password'
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

      // auth.login(credentials, 'dashboard', ({isSuccess, data, errorMessage}) => {
      auth.fakeLogin(credentials, 'dashboard')
        .then((data) => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-login
    background-color: $app-primary

    &__logo
      max-width: 46px
      padding-left: 12px
      padding-top: 4px

    &__logo-name

      img
        max-width: 200px
        width: 100%

    &__subheading
      color: white
      padding-top: 10px
      padding-bottom: 20px

    &__card
      max-width: 370px
      margin: 0 auto

    &__card-title
      justify-content: center

    &__card-actions
      justify-content: center

</style>
