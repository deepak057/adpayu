<template lang="pug">
section#contact.module
    .container
        .row
            .col-sm-6.col-sm-offset-3
                h2.module-title.font-alt Get in touch
                .module-subtitle.font-serif Let us know if you have any questions, comments or suggestions by filling the form below.
        .row
            .col-sm-6.col-sm-offset-3
                form.custom-form#contactForm(role='form' @submit.prevent="sendMessage()")
                    .form-group(:class="{'has-error': emailError}")
                        label.sr-only(for='email') Email
                        input#email.form-control(type='email', name='email', placeholder='Your Email*', v-model.trim="email")
                        small.form-control-feedback(v-show="emailError")
                          | {{emailError}}
                    .form-group(:class="{'has-error': messageError}")
                        textarea#message.form-control(rows='7', name='message', placeholder='Your Message*', data-validation-required-message='Please enter your message.' , v-model.trim='message')
                        small.form-control-feedback(v-show="messageError")
                          | {{messageError}}
                    .text-center
                        button#cfsubmit.btn.btn-block.btn-round.btn-info(type='submit') {{btnText}}
                #contactFormResponse.ajax-response.font-alt
        .row
            .col-sm-6.col-sm-offset-3
                .m-t-50.text-center
                    | Alternatively, you can contact our support team directly at
                    a(:href="'mailto:'+contactEmail")  {{contactEmail}}
                    |  or call us on our headquarter numbers
                    a(:href="'tel:'+contactPhone")  {{contactPhone}}
                    |  or
                    a(:href="'tel:'+contactPhone2")   {{contactPhone2}}
                    | .
</template>
<script>
import mixin from '../../globals/mixin'
import userRegister from '../../globals/user-register'
import Service from './service'
import * as constants from '@/constants'

function contactInitialState () {
  return {
    btnText: 'Submit',
    email: '',
    message: '',
    emailError: false,
    messageError: false,
    contactEmail: constants.CONTACT_EMAIL,
    contactPhone: constants.CONTACT_NUMBER,
    contactPhone2: constants.CONTACT_NUMBER_2
  }
}

export default {
  name: 'Contact',
  service: new Service(),
  mixins: [mixin, userRegister],
  data () {
    return contactInitialState()
  },
  watch: {
    /* email () {
      this.emailValidate()
    },
    message () {
      this.messageValidate()
    }
    */
  },
  methods: {
    sendMessage () {
      if (this.validate()) {
        this.btnText = 'Sending.....'
        this.$options.service.sendContactMessage(this.email, this.message)
          .then((data) => {
            if (data.success) {
              Object.assign(this.$data, contactInitialState())
              this.showNotification(data.message, 'success')
            }
          })
          .catch((mErr) => {
            this.btnText = 'Submit'
            this.showNotification('Something went wrong while sending the message.', 'error')
          })
      }
    },
    validate () {
      return this.emailValidate() && this.messageValidate()
    },
    emailValidate () {
      if (this.email && this.validateEmail(this.email)) {
        this.emailError = false
        return true
      } else {
        this.emailError = 'Please enter a valid email address'
        return false
      }
    },
    messageValidate () {
      if (this.message) {
        this.messageError = false
        return true
      } else {
        this.messageError = 'Please enter your message'
        return false
      }
    }
  }
}
</script>
