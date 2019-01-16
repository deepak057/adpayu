<template lang="pug">
.card-body
  form.form-horizontal.form-material(onSubmit="return false")
    h4 Basic Details
      br
      small.text-muted More information you provide, more relevant ads you'll see
    .form-group.m-t-20(:class="{'has-danger': nameError}")
      label.col-md-12(for='up-user-name-field') Full Name
      .col-md-12
        input#up-user-name-field.form-control.form-control-line(placeholder='Enter Name' type='text' v-model.trim="name" autocomplete="off")
        small.form-control-feedback(v-show="nameError")
          | {{nameError}}
    .form-group
      label.col-sm-12 Gender
      .col-sm-12
        select.form-control.form-control-line(v-model="user.gender")
          option(value="" selected disabled hidden) Choose here
          option(value="male") Male
          option(value="female") Female
          option(value="other") Other
    .form-group
      label.col-sm-12 Select Country
      .col-sm-12
        select.form-control.form-control-line(v-model="user.location")
          option(value="" selected disabled hidden) Choose here
          option London
          option India
          option Usa
          option Canada
          option Thailand
    .form-group(:class="{'has-danger': taglineError}")
      label.col-md-12 Tagline
      .col-md-12
        input.form-control.form-control-line(type="text" v-model.trim="user.tagline" placeholder="Enter your tagline")
        small.form-control-feedback(v-show="taglineError")
          | {{taglineError}}
    h4 Security
    .form-group.m-t-20
      label.col-md-12(for='up-user-email') Email
      .col-md-12
        input#up-user-email.form-control.form-control-line(placeholder='Enter email', type='email' v-model = "user.email" readonly autocomplete="off")
    .form-group(:class="{'has-danger': passwordError}")
      label.col-md-12 New Password
      .col-md-12
        input.form-control.form-control-line(type='password' placeholder="Enter new password" v-model="newPassword")
        small.form-control-feedback(v-show="passwordError")
          | {{passwordError}}
    .form-group
      .col-sm-12
        button.btn.btn-success(@click= "updateProfile()") Update Profile
</template>
<script>
import mixin from '../../../globals/mixin.js'
import userRegistrationMixin from '../../../globals/user-register'
import auth from '@/auth/helpers'

// import Preloader from './../../../components/preloader'
import Service from './service'

export default {
  name: 'Settings',
  service: new Service(),
  components: {},
  mixins: [mixin, userRegistrationMixin],
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      user: Object.assign({}, this.currentUser),
      name: this.userName(this.currentUser),
      nameError: false,
      taglineError: false,
      maxTaglineChars: 100,
      newPassword: '',
      passwordError: false
    }
  },
  watch: {
    '$store.state.auth.user' (user) {
      this.user = user
    }
  },
  methods: {
    updateProfile () {
      if (this.nameValidate() && this.validateTagLine() && this.passwordVaildate()) {
        this.showNotification('Saving profile, please wait....', 'warn', -1)
        auth.updateCurrentUser(this.getUserObject())
          .then((data) => {
            this.showNotification('Profile updated successfully', 'success')
            this.reset()
          })
          .catch((errUser) => {
            this.showNotification('Something went wrong, please try again', 'error')
          })
      }
    },
    // get updated properties of
    // User object after successfull validation
    getUserObject () {
      let t = this.name.split(' ')
      this.user.first = t[0]
      this.user.last = t[1]
      this.user.newPassword = this.newPassword
      return this.user
    },
    nameValidate () {
      if (!this.validateName(this.name)) {
        this.nameError = 'Please enter your full name'
        return false
      } else {
        this.nameError = false
        return true
      }
    },
    validateTagLine () {
      if (!this.user.tagline || (this.user.tagline && this.user.tagline.length < this.maxTaglineChars)) {
        this.taglineError = false
        return true
      } else {
        this.taglineError = 'Max ' + this.maxTaglineChars + ' chars allowed. You have entered ' + this.user.tagline.length
        return false
      }
    },
    passwordVaildate () {
      if (!this.newPassword || (this.newPassword && this.validatePassword(this.newPassword))) {
        this.passwordError = false
        return true
      } else {
        this.passwordError = 'Please enter a valid password'
        return false
      }
    },
    showNotification (content, classType, duration = 3000) {
      this.$notify({
        group: 'appNotifications',
        clean: true
      })
      this.$notify({
        group: 'appNotifications',
        title: '',
        text: content,
        type: classType,
        duration: duration
      })
    },
    reset () {
      this.newPassword = ''
    }
  }
}
</script>
