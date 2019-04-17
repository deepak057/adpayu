<template lang="pug">
.container-fluid
  <page-title heading="Order"/>
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
import PageTitle from './../../components/page-title'

export default {
  name: 'Order',
  components: {
    OrderCreate,
    OrderCheck,
    PageTitle
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
