<template lang="pug">
.card-body
  form.form-horizontal.form-material(onSubmit="return false")
    h4 Basic Details
      br
      small.text-muted More information you provide, more relevant ads you'll see
    .form-group.m-t-20(:class="{'has-danger': nameError}")
      label.col-md-12(for='up-user-name-field') Full Name
      .col-md-12
        input#up-user-name-field.form-control.form-control-line(placeholder='Enter Name', type='text' v-model="userFullName" autocomplete="off")
        small.form-control-feedback(v-show="nameError")
          | {{nameError}}
    .form-group
      label.col-sm-12 Select Country
      .col-sm-12
        select.form-control.form-control-line
          option London
          option India
          option Usa
          option Canada
          option Thailand
    .form-group
      label.col-md-12 About
      .col-md-12
        textarea.form-control.form-control-line(rows='2')
    h4 Security
    .form-group.m-t-20
      label.col-md-12(for='up-user-email') Email
      .col-md-12
        input#up-user-email.form-control.form-control-line(placeholder='Enter email', type='email' v-model = "user.email" readonly autocomplete="off")
    .form-group
      label.col-md-12 Password
      .col-md-12
        input.form-control.form-control-line(value='password', type='password')
    .form-group
      .col-sm-12
        button.btn.btn-success(@click= "updateProfile()") Update Profile
</template>
<script>
import mixin from '../../../globals/mixin.js'
import userRegistrationMixin from '../../../globals/user-register'

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
      nameError: false
    }
  },
  computed: {
    userFullName: {
      get () {
        return this.user.first + ' ' + this.user.last
      },
      set (newV) {
        let name = newV.split(' ')
        this.user.first = name[0]
        this.user.last = name[1]
      }
    }
  },
  methods: {
    updateProfile () {
      if (!this.validateName(this.userFullName)) {
        this.nameError = 'Please enter a valid name'
      } else {
        this.nameError = false
      }
    }
  }
}
</script>
