<template>
  <v-tour
    v-if="tour.tourSteps.length"
    :steps="tour.tourSteps"
    :options="tour.options"
    :callbacks="tour.callbacks"
    name="revenueTour" />
</template>
<script>
import mixin from '@/globals/mixin.js'

export default {
  name: 'RevenueTour',
  mixins: [mixin],
  data () {
    return {
      tour: {
        tourSteps: [],
        options: {
          labels: {
            buttonSkip: 'Skip',
            buttonPrevious: 'Previous',
            buttonNext: 'Next',
            buttonStop: 'Finish'
          }
        },
        callbacks: {
          onFinish: this.revenueTourFinished,
          onSkip: this.revenueTourFinished
        }
      }
    }
  },
  methods: {
    revenueTourFinished () {
      this.highlightNavTriggerer()
      this.$emit('TourFinished')
    },
    triggerRevenueTour () {
      let updateSteps = () => {
        this.tour.tourSteps = [
          {
            target: '#' + this.constants.sideBarElementsIDs.revenueAmountId,
            content: 'This is the total amount of money you have made',
            params: {
              highlight: true,
              enableScrolling: false
            }
          },
          {
            target: '#' + this.constants.sideBarElementsIDs.revenueWithdrawId,
            content: 'Click this button to withdraw money to your Paytm or Bank account',
            params: {
              highlight: true,
              enableScrolling: false
            }
          }
        ]
      }
      if (!this.isSidebarOpen()) {
        this.toggleSideBar()
      }
      this.scrollToTop()
      updateSteps()
      setTimeout(() => {
        this.$tours['revenueTour'].start()
      }, 200)
    }
  }
}
</script>
