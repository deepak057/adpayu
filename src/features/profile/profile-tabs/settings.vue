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
    .form-group
      label.col-md-12 Tagline
      .col-md-12
        input.form-control.form-control-line(type="text" v-model.trim="user.tagline" placeholder="Enter your tagline")
    h4 Security
    .form-group.m-t-20
      label.col-md-12(for='up-user-email') Email
      .col-md-12
        input#up-user-email.form-control.form-control-line(placeholder='Enter email', type='email' v-model = "user.email" readonly autocomplete="off")
    .form-group
      label.col-md-12 New Password
      .col-md-12
        input.form-control.form-control-line(type='password' placeholder="Enter new password")
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
      nameError: false
    }
  },
  watch: {
    '$store.state.auth.user' (user) {
      this.user = user
    }
  },
  methods: {
    updateProfile () {
      if (!this.validateName(this.name)) {
        this.nameError = 'Please enter a valid name'
      } else {
        this.nameError = false
        let t = this.name.split(' ')
        this.user.first = t[0]
        this.user.last = t[1]
        this.showNotification('Saving, please wait....', 'warn', -1)
        auth.updateCurrentUser(this.user)
          .then((data) => {
            this.showNotification('Profile updated successfully', 'success')
          })
          .catch((errUser) => {
            alert('Something went wrong while updating the profile')
          })
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
    }
  }
}
</script>
