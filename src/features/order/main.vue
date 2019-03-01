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
      <total-revenue/>
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
          <order-create v-if="action==='create'"/>
          <order-check v-if="action==='check'"/>
</template>
<script>
import OrderCreate from './create-order'
import OrderCheck from './check-order'
import TotalRevenue from './../../components/total-revenue'

export default {
  name: 'Order',
  components: {
    OrderCreate,
    OrderCheck,
    TotalRevenue
  },
  data () {
    return {
      action: ''
    }
  },
  mounted () {
    if (this.$route.params.action) {
      this.action = this.$route.params.action
    }
  }
}
</script>
