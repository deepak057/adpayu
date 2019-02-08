<template lang="pug">
div
  .text-danger.m-t-20(v-if="error")
    strong
      i.mdi.mdi-alert
      |  {{error}}
  .page-preloader(v-if="pageLoader")
    <preloader/>
    br
    .m-t-20
      h5.f-w-500 Checking Payment Status...
      p Please don't leave the page
</template>
<script>
// import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Service from './service'
import mixin from '../../globals/mixin.js'

export default {
  name: 'OrderCheck',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      error: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let orderId = this.getOrderId()
      if (orderId) {
        this.$options.service.checkPaymentStatus(orderId)
          .then((data) => {
          })
          .catch((pErr) => {
            alert('Soemthing went wrong while checking the payment status. Please contact us if you need more details.')
          })
      }
    },
    getOrderId () {
      if (this.$route.query.orderId) {
        return this.$route.query.orderId
      } else {
        this.error = 'Error: Soemthing went wrong. The link might be broken or incorrect. Please contact us if you need more details.'
        this.pageLoader = false
        return false
      }
    }
  }
}
</script>
