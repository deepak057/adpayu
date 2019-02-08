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
          <order-create v-if="action==='create'"/>
          <order-check v-if="action==='check'"/>
</template>
<script>
import OrderCreate from './create-order'
import OrderCheck from './check-order'

export default {
  name: 'Order',
  components: {
    OrderCreate,
    OrderCheck
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
