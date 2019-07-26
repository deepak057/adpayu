<template lang="pug">
.total-revenue-wrap
  h3.m-b-0.font-light
    | ${{totalRevenue || 0}}
    span.small.text-muted.cursor-hand.f-s-12.m-l-6.text-success(@click="syncUser()")
      i.fa.fa-sign-out.m-r-2
      | Withdraw
      <preloader v-if="loader" class="preloader-h-10 m-l-5"/>
      //i.mdi.mdi-information-outline.m-l-2
  h5.text-muted.m-b-0
    | Total Revenue
    i.mdi.mdi-information-outline.cursor-hand.m-l-2.f-s-14(data-container="body" title="Total Revenue" data-toggle="popover" data-placement="right" data-content="It's total amount of money you have made by consuming the ads. Click on Withdraw button above to get this money transferred to your bank or other accounts.")
  <withdraw-money ref="withdrawMoneyComp"/>
  <verify-account ref="verifyAccountComp" v-if="!accountVerified()"/>
</template>
<script>
import auth from '@/auth/helpers'
import WithdrawMoney from './withdraw/main'
import mixin from '../globals/mixin'
import VerifyAccount from './withdraw/verify-account'
import Preloader from './preloader'

export default {
  name: 'TotalRevenue',
  components: {
    WithdrawMoney,
    VerifyAccount,
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      totalRevenue: auth.getLocalRevenue(),
      currentUser: auth.getUser(),
      loader: false
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
      if (this.accountVerified()) {
        this.$refs.withdrawMoneyComp.triggerPopup()
      } else {
        this.$refs.verifyAccountComp.triggerPopup()
      }
    },
    syncUser () {
      this.loader = true
      auth.syncUser()
        .then((data) => {
          this.loader = false
          this.currentUser = auth.getUser()
          this.withdrawTrigger()
        })
        .catch((wErr) => {
          this.loader = false
          this.withdrawTrigger()
        })
    },
    accountVerified () {
      return this.currentUser.accountStatus === 'verified'
    }
  }
}
</script>
