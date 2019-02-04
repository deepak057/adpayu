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
          .text-center.m-t-20(v-show="pageLoader")
            <preloader></preloader>
          div(:id="wrapperId" v-show="!pageLoader")
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' id="post-status-payment-buton-close") Close
          button.btn.btn-danger.waves-effect.waves-light(type='button') Pay Now
</template>
<script>
import auth from '@/auth/helpers'
import mixin from '../../../../globals/mixin'
import Preloader from './../../../../components/preloader'
import Service from './service'

let CashFreeWrapperId = 'cf-widget-wrap'

export default {
  name: 'AdPayment',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      wrapperId: CashFreeWrapperId,
      triggerButtonId: 'trigger-post-payment-modal',
      cashFree: {
        ScriptURL: 'https://www.gocashfree.com/assets/cashfree.sdk.v1.js',
        config: {
          layout: {
            view: 'inline',
            container: CashFreeWrapperId,
            width: 500
          },
          mode: 'TEST'// use PROD when we go live
        }
      },
      currentUser: auth.getUser()
    }
  },
  mounted () {
    this.loadCashFreeScript()
  },
  methods: {
    paymentInit (amount) {
      this.pageLoader = true
      /* eslint-disable */
      var response = CashFree.init(this.cashFree.config)
      if (response.status === "OK") {
        console.log('Payment Gateway Initialized');
      } else {
      //handle error
        console.log(response.message);
      }
      this.triggerPopup()
      this.initCashFreePayment(amount)
      /* eslint-enable */
    },
    triggerPopup () {
      document.getElementById(this.triggerButtonId).click()
    },
    cashFreeCallback (event) {
      var eventName = event.name
      switch (eventName) {
        case 'PAYMENT_REQUEST':
          console.log(event.message)
          break
        default:
          console.log(event.message)
      }
    },
    initCashFreePayment (amount) {
      this.$options.service.getPaymentToken(this.getParameters(amount))
        .then((data) => {
          this.pageLoader = false
          /* eslint-disable */
          CashFree.makePayment(data.params, this.cashFreeCallback)
          /* eslint-enable */
        })
        .catch((pErr) => {
          alert('Something went wrong while initializing the payment, please try again later')
        })
    },
    checkIfScriptExists () {
      let scripts = document.getElementsByTagName('script')
      for (var i = scripts.length; i--;) {
        if (scripts[i].src === this.cashFree.ScriptURL) {
          return true
        }
      }
      return false
    },
    loadCashFreeScript () {
      if (!this.checkIfScriptExists()) {
        const plugin = document.createElement('script')
        plugin.setAttribute('src', this.cashFree.ScriptURL)
        plugin.async = true
        document.head.appendChild(plugin)
      }
    },
    getParameters (amount) {
      return {
        orderAmount: amount,
        returnUrl: '',
        paymentModes: ''
        // notifyUrl: '',
      }
    }
  }
}
</script>
