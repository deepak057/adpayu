<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" data-target="#post-payment-modal" data-backdrop="static" data-keyboard="false")
  #post-payment-modal.modal.modal-absolute.post-payment-modal.topmost-modal(tabindex='-1', role='dialog', aria-labelledby='myPaymentModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Make Payment
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          h1 Payment
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' id="post-status-payment-buton-close") Close
          button.btn.btn-danger.waves-effect.waves-light(type='button') Pay Now
</template>
<script>
export default {
  name: 'AdPayment',
  data () {
    return {
      triggerButtonId: 'trigger-post-payment-modal'
    }
  },
  methods: {
    paymentInit (amount) {
      this.triggerPopup()
    },
    triggerPopup () {
      document.getElementById(this.triggerButtonId).click()
    }
  }
}
</script>
