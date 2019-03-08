<template lang="pug">
div
  h3.m-b-0.font-light
    | ${{totalRevenue || 0}}
    span.small.text-muted.cursor-hand.f-s-12 (Withdraw)
  h5.text-muted.m-b-0 Total Revenue
</template>
<script>
import auth from '@/auth/helpers'

export default {
  name: 'TotalRevenue',
  data () {
    return {
      totalRevenue: auth.getLocalRevenue()
    }
  },
  watch: {
    '$store.state.auth.totalRevenue' (newV) {
      this.totalRevenue = newV
    }
  },
  mrthods: {
    updateTotal () {
      this.totalRevenue = auth.getUser().totalAmount
    }
  }
}
</script>
