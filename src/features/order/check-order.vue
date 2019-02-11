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
      h5.f-w-500 {{statusText}}
      p Please don't leave the page
  .ad-order-status-wrap.m-t-20(v-if="order && !isSuccess()")
    h2.all-caps
      i.mdi.mdi-alert-outline
      | Payment {{order.status}}
    p {{order.message}}
    p
      | Please contact us and quote us order id
      strong
        |  {{order.id}}
      |  if you want to get more details.
    p
      a(href="javascript:void(0)" @click="init()")  Retry
</template>
<script>
import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Service from './service'
import mixin from '../../globals/mixin.js'
import { router } from '@/http'

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
      error: false,
      order: '',
      statusText: 'Checking Payment Status...',
      localPost: auth.getLocalPost()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.pageLoader = true
      let orderId = this.getOrderId()
      if (orderId) {
        this.$options.service.checkPaymentStatus(orderId)
          .then((data) => {
            if (data.order.response) {
              this.pageLoader = false
              this.order = data.order
              this.checkOrder()
            } else {
              // keep checking the Order status (every 2 seconds)
              // until the payment gateway has
              // sent a response to the server
              // for the given Order Id
              let that = this
              setTimeout(function () {
                that.init()
              }, 2000)
            }
          })
          .catch((pErr) => {
            console.log(pErr)
            this.showNotification('Soemthing went wrong while checking the payment status. Please contact us if you need more details.', 'error')
          })
      }
    },
    checkOrder (order) {
      if (this.isSuccess()) {
        this.pageLoader = true
        this.statusText = 'Posting your ad....'
        this.postAd()
      } else {
        this.showNotification('Failed to post the ad.', 'error')
      }
    },
    postAd () {
      // remove the random ID given to local post object
      delete this.localPost.id
      auth.createPost(this.localPost)
        .then((data) => {
          this.pageLoader = false
          this.statusText = 'Ad posted successfully '
          this.showNotification('Ad posted successfully.', 'success')
          // reset the local post object
          auth.saveLocalPost({})
          // redirect to the post page
          router.push({name: 'p', params: { id: data.id }})
        })
        .catch((pErr) => {
          this.showNotification('Something went wrong while creating your post.', 'error')
        })
    },
    getOrderId () {
      if (this.$route.query.orderId && !this.isEmptyObject(this.localPost)) {
        return this.$route.query.orderId
      } else {
        this.error = 'Error: Soemthing went wrong. The link might be broken or you might not have created any ad. Please contact us if you need more details.'
        this.pageLoader = false
        return false
      }
    },
    isSuccess () {
      return this.order.status === 'SUCCESS'
    }
  }
}
</script>
