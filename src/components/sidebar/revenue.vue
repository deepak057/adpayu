<template lang="pug">
.user-profile.custom.bg-info.c-white
  .sidebar-map-header-wrap.f-s-16
    span.m-r-5(v-html="getUserCurrencySymbol()")
    | Total Earnings
    i.mdi.mdi-information-outline.cursor-hand.m-l-5(data-container="body" title="Your Earnings" data-toggle="popover" data-placement="right" data-content="It's total amount of money you have made by consuming the ads. Go to your Settings to enable ads in your feed. Click on Withdraw button below to get this money transferred to your bank, Paytm or other accounts.")
  div.text-center.centered-content.side-bar-revenue-wrap.m-r-15
    .total-revenue-wrap
      h2.c-white
        span(v-html = "showAmount(totalRevenue, false, true) || 0" :id="tour.revenueAmountId")
      span.small.cursor-hand.f-s-12(@click="syncUser()" :id="tour.revenueWithdrawId")
        i.fa.fa-sign-out.m-r-2
        | Withdraw
        <preloader v-if="loader" class="preloader-h-10 m-l-5"/>
          //i.mdi.mdi-information-outline.m-l-2
      //h5.text-muted.m-b-0
        | Total Earnings
        i.mdi.mdi-information-outline.cursor-hand.m-l-2.f-s-14(data-container="body" title="Total Earnings" data-toggle="popover" data-placement="right" data-content="It's total amount of money you have made by consuming the ads. Click on Withdraw button to get this money transferred to your bank, Paytm or other accounts.")
      <withdraw-money ref="withdrawMoneyComp"/>
      <verify-account ref="verifyAccountComp" v-if="!accountVerified()"/>
  .profile-img.cursor-hand(title="See your earnings")
    span.sidebar-map-icon.c-white.toggle-sidebar(:id="tour.toggleSideBarId" v-html="getUserCurrencySymbol()")
  <v-tour style="position: fixed" name="myTour" v-if="tour.tourSteps.length" :steps="tour.tourSteps" :options="tour.options"></v-tour>
</template>
<script>
import auth from '@/auth/helpers'
import mixin from '@/globals/mixin.js'
import Preloader from '@/components/preloader'
import WithdrawMoney from '../withdraw/main'
import VerifyAccount from '../withdraw/verify-account'

export default {
  name: 'Revenue',
  components: {
    Preloader,
    WithdrawMoney,
    VerifyAccount
  },
  mixins: [mixin],
  data () {
    return {
      totalRevenue: auth.getLocalRevenue(),
      currentUser: auth.getUser(),
      loader: false,
      revenueUpdateInterval: 30000,
      tour: {
        tourSteps: [],
        revenueAmountId: 'total-revenue-header-amount',
        revenueWithdrawId: 'total-revenue-header-withdraw',
        toggleSideBarId: 'sidebar-revenue-trigger-sidebar',
        options: {
          labels: {
            buttonSkip: 'Skip',
            buttonPrevious: 'Previous',
            buttonNext: 'Next',
            buttonStop: 'Finish'
          }
        }
      }
    }
  },
  watch: {
    '$store.state.auth.totalRevenue' (newV) {
      this.updateTotal(newV)
    }
  },
  mounted () {
    this.updateTotal()
    this.updateTotalRevenue()
  },
  methods: {
    updateTotal (newV) {
      this.totalRevenue = newV || auth.getLocalRevenue()
    },
    withdrawTrigger () {
      if (this.accountVerified()) {
        this.$refs.withdrawMoneyComp.triggerPopup()
      } else {
        this.$refs.verifyAccountComp.triggerPopup()
      }
    },
    updateTotalRevenue () {
      /*
      * using session storage for referencing the Timer variable
      * as multiple instances of this component create multipe
      * instance of below time-interval
      */
      let key = 'RI'
      let interval = sessionStorage.getItem(key)
      if (interval) {
        clearInterval(interval)
      }
      sessionStorage.setItem(key, setInterval(() => {
        auth.getCurrentUserRevenue()
          .then((d) => {
            if (d) {
              auth.saveLocalRevenue(d.totalRevenue)
            }
          })
      }, this.revenueUpdateInterval))
    },
    syncUser () {
      this.stopTour()
      if (this.loader) {
        return
      }
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
    },
    triggerTour () {
      let updateSteps = () => {
        this.tour.tourSteps = [
          {
            target: '#' + this.tour.toggleSideBarId,
            content: 'Click here to see how much money you have made',
            params: {
              enableScrolling: false,
              placement: 'left'
            }
          },
          {
            target: '#' + this.tour.revenueAmountId,
            content: 'This is the total amount of money you have made',
            params: {
              highlight: true,
              enableScrolling: false
            }
          },
          {
            target: '#' + this.tour.revenueWithdrawId,
            content: 'Click this button to withdraw money to your Paytm or Bank account',
            params: {
              highlight: true,
              enableScrolling: false
            }
          }
        ]
      }
      this.scrollToTop()
      updateSteps()
      auth.togglePageTitle(true)
      setTimeout(() => {
        this.$tours['myTour'].start()
      }, 200)
    },
    stopTour () {
      if (this.$tours['myTour']) {
        this.$tours['myTour'].stop()
      }
    }
  }
}
</script>
