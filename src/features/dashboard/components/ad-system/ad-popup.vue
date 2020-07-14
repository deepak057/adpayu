<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-labelledby='AdStatsModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Hold on
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          <template v-if ="!step2">
          <template v-if ="!pageLoader">
          h4
            | {{totalUsers}} real people have made
            span.m-l-5.m-r-5(v-html="showAmount(totalMoney)")
            | so far
          p
            | Would you also like to make some real and quick money?
          </template>
          <template v-if ="pageLoader">
          .text-center
            <preloader class="m-t-10"/>
          </template>
          </template>
          <template v-if ="step2">
          .text-center
            h3
              | Watch ads everyday in between videos and collect money everyday
          </template>
        .modal-footer
          button.btn.btn-secondary(data-dismiss='modal' :id="closeButtonId")
            | No
          button.btn.btn-danger(type='button' @click="enableStep2()")
            | Yes
</template>
<script>
import mixin from '../../../../globals/mixin'
import Preloader from '../../../../components/preloader'
import Service from './service'
// import auth from '@/auth/helpers'

export default {
  name: 'AdPopup',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-ad-system-popup-',
      triggered: false,
      totalUsers: 0,
      totalMoney: 0,
      step2: false
    }
  },
  computed: {
    modalIdHash: {
      get () {
        return '#' + this.modalId
      }
    },
    triggerButtonId: {
      get () {
        return this.id + '-ad-system-popup-modal-trigger'
      }
    },
    modalId: {
      get () {
        return this.id + '-ad-system-popup-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-ad-system-popup-buton-close'
      }
    }
  },
  mounted () {
  },
  methods: {
    enableStep2 () {
      this.step2 = true
    },
    getStats () {
      this.pageLoader = true
      this.$options.service.getStats()
        .then((d) => {
          this.pageLoader = false
          this.totalUsers = this.formatNumber(d.stats.totalUsers)
          this.totalMoney = d.stats.totalMoneyMadeUSD
        })
        .catch((sErr) => {
          this.showNotification('Something went wrong while getting withdrawal stats', 'danger')
        })
    },
    triggerPopup () {
      /*eslint-disable*/
      this.triggered = true
      this.step2 = false
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval(()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
            this.getStats()
          }
        }, 100)
      } else {
        d.click()
        this.getStats()
      }
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    }
  }
}
</script>
