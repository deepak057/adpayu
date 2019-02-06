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
          .page-preloader(v-if="!pagePreloader")
            <preloader></preloader>
          <template v-if="pagePreloader">
          h2.card-title
            i.mdi.mdi-currency-usd
            | Payment Detail
          .m-t-30
            p
              | Amount: $13,848
              i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Amount" data-toggle="popover" data-placement="right"  data-content="The amount calculated based on your ad configuration.")
            p
              | Processing Fee (10%): $138
              i.mdi.mdi-information-outline.m-l-5.cursor-hand
            hr
            h3
              b Total :
              |  $13,986
          form
            .form-group
              input.form-control.w-265px.m-t-20(type='text' placeholder="Phone Number*")
              i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Phone Number Required" data-toggle="popover" data-placement="right"  data-content="Our payment partner requires customer's phone number in order to identify you and provide you better services. Please enter your phone number in order to continue.")
          a.btn.btn-primary.m-t-20(href='#') Pay Now
          </template>
</template>
<script>
import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Service from './service'
import mixin from '../../globals/mixin.js'

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
      currentUser: auth.getUser()
    }
  },
  mounted () {
    this.scrollToTop()
  },
  methods: {
  }
}
</script>
