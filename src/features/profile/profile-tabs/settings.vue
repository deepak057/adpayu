<template lang="pug">
.card-body
  form.form-horizontal.form-material
    .form-group
      label.col-md-12 Full Name
      .col-md-12
        input.form-control.form-control-line(placeholder='Enter Name', type='text')
    .form-group
      label.col-md-12(for='example-email') Email
      .col-md-12
        input#example-email.form-control.form-control-line(placeholder='Enter email', name='example-email', type='email')
    .form-group
      label.col-md-12 Password
      .col-md-12
        input.form-control.form-control-line(value='password', type='password')
    .form-group
      label.col-md-12 Phone No
      .col-md-12
        input.form-control.form-control-line(placeholder='123 456 7890', type='text')
    .form-group
      label.col-md-12 Message
      .col-md-12
        textarea.form-control.form-control-line(rows='5')
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
      .col-sm-12
        button.btn.btn-success Update Profile
</template>
<script>
import mixin from '../../../globals/mixin.js'
// import Preloader from './../../../components/preloader'
import Service from './service'

export default {
  name: 'Settings',
  service: new Service(),
  components: {},
  mixins: [mixin],
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      user: this.currentUser
    }
  }
}
</script>
