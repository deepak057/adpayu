<template lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0 Order
      ol.breadcrumb
        li.breadcrumb-item
          <router-link to="/">
            | Home
          </router-link>
        li.breadcrumb-item.active Order
    .col-md-8.col-12.align-self-center.text-right
      h3.m-b-0.font-light $3249
      h5.text-muted.m-b-0 Total Revenue
  // ==============================================================
  // End Bread crumb and right sidebar toggle
  // ==============================================================
  // ==============================================================
  // Start Page Content
  // ==============================================================
  // Row
  .row
    // Column
    .col-12.p-l-0.p-r-0
      .card
        .card-body.text-center.min-h-400
          div(:id="CashFreeWrapperId" v-show="paymentGatewayInitialized")
          <template v-if="!paymentGatewayInitialized">
          .page-preloader(v-if="pagePreloader")
            <preloader></preloader>
          <template v-if="!pagePreloader">
          h2.card-title
            i.mdi.mdi-currency-usd
            | Payment Detail
          .m-t-30
            p
              | Amount: $13,848 ({{paymentParameters.orderAmount}} INR)
              i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Amount" data-toggle="popover" data-placement="right"  data-content="The base amount calculated based on your ad configuration.")
            p
              | Processing Fee (3%): $138
              i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Processing Fee" data-toggle="popover" data-placement="right"  data-content="The processing fee and taxes based on the base amount above. It's 3% of the base amount.")
            hr
            h3
              b Total :
              |  $13,986
          form
            .form-group
              input.form-control.w-265px.m-t-20(type='text' placeholder="Phone Number*")
              i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Phone Number Required" data-toggle="popover" data-placement="right"  data-content="Our payment partner requires customer's phone number in order to identify you and provide you better services. Please enter your phone number in order to continue.")
          a.btn.btn-primary.m-t-20(@click.prevent="paymentInit()") Pay Now
          </template>
          </template>
</template>
<script>
import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Service from './service'
import mixin from '../../globals/mixin.js'

let CashFreeWrapperId = 'cf-widget-wrap'

export default {
  name: 'Profile',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pagePreloader: true,
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
      currentUser: auth.getUser(),
      localPostFound: true,
      paymentParameters: {},
      CashFreeWrapperId: CashFreeWrapperId,
      paymentGatewayInitialized: false
    }
  },
  mounted () {
    this.scrollToTop()
    this.loadCashFreeScript()
    this.getPaymentToken()
  },
  methods: {
    getPaymentToken () {
      let localPost = this.getLocalPost()
      if (localPost) {
        this.$options.service.getPaymentToken(this.getParameters(localPost.adOptions.totalAmount))
          .then((data) => {
            this.pagePreloader = false
            this.paymentParameters = data.params
            /* eslint-disable */
            // CashFree.makePayment(data.params, this.cashFreeCallback)
            /* eslint-enable */
          })
          .catch((pErr) => {
            alert('Something went wrong while initializing the payment, please try again later')
          })
      }
    },
    getLocalPost () {
      let post = auth.getLocalPost()
      if (this.isEmptyObject(post)) {
        this.localPostFound = false
        return false
      } else {
        return post
      }
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
    paymentInit () {
      this.paymentGatewayInitialized = true
      /* eslint-disable */
      var response = CashFree.init(this.cashFree.config)
      if (response.status === "OK") {
        console.log('Payment Gateway Initialized');
      } else {
      //handle error
        console.log(response.message);
      }
      CashFree.makePayment(this.paymentParameters, this.cashFreeCallback)
      /* eslint-enable */
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
