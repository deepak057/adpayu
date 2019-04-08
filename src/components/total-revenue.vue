<template lang="pug">
div
  h3.m-b-0.font-light
    | ${{totalRevenue || 0}}
    span.small.text-muted.cursor-hand.f-s-12.m-l-6.text-success(@click="withdrawTrigger()")
      i.fa.fa-sign-out.m-r-2
      | Withdraw
      //i.mdi.mdi-information-outline.m-l-2
  h5.text-muted.m-b-0
    | Total Revenue
    i.mdi.mdi-information-outline.cursor-hand.m-l-2.f-s-14(data-container="body" title="Total Revenue" data-toggle="popover" data-placement="right" data-content="It's total amount of money you have made by consuming the ads. Click on Withdraw button above to get this money transferred to your bank or other accounts.")
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
