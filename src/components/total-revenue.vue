<template lang="pug">
.total-revenue-wrap
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
  <verify-account ref="verifyAccountComp"/>
</template>
<script>
import auth from '@/auth/helpers'
import WithdrawMoney from './withdraw/main'
import mixin from '../globals/mixin'
import VerifyAccount from './withdraw/verify-account'

export default {
  name: 'TotalRevenue',
  components: {
    WithdrawMoney,
    VerifyAccount
  },
  mixins: [mixin],
  data () {
    return {
      totalRevenue: auth.getLocalRevenue(),
      currentUser: auth.getUser()
    }
  },
  watch: {
    '$store.state.auth.totalRevenue' (newV) {
      this.updateTotal(newV)
    }
  },
  mounted () {
    this.updateTotal()
  },
  methods: {
    updateTotal (newV) {
      this.totalRevenue = this.roundToDecimalPlaces(newV || auth.getLocalRevenue())
    },
    withdrawTrigger () {
      if (this.currentUser.accountStatus === 'verified') {
        this.$refs.withdrawMoneyComp.triggerPopup()
      } else {
        this.$refs.verifyAccountComp.triggerPopup()
      }
    }
  }
}
</script>
