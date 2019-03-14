<template lang="pug">
div
  h3.m-b-0.font-light
    | ${{totalRevenue || 0}}
    span.small.text-muted.cursor-hand.f-s-12(@click="withdrawTrigger()") (Withdraw)
  h5.text-muted.m-b-0 Total Revenue
  <withdraw-money ref="withdrawMoneyComp"/>
</template>
<script>
import auth from '@/auth/helpers'
import WithdrawMoney from './withdraw/main'

export default {
  name: 'TotalRevenue',
  components: {
    WithdrawMoney
  },
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
  methods: {
    updateTotal () {
      this.totalRevenue = auth.getUser().totalAmount
    },
    withdrawTrigger () {
      this.$refs.withdrawMoneyComp.triggerPopup()
    }
  }
}
</script>
