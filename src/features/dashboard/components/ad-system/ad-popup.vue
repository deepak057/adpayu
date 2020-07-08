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
          h4
            | 5000 real people have made more than $50000
          p
            | Would you also like to make some real and quick money?
        .modal-footer
          button.btn.btn-secondary(data-dismiss='modal' :id="closeButtonId")
            | No
          button.btn.btn-danger(type='button')
            | Yes
</template>
<script>
import mixin from '../../../../globals/mixin'
import Preloader from '../../../../components/preloader'
import Service from '../../service'
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
      triggered: false
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
    triggerPopup () {
      /*eslint-disable*/
      this.triggered = true
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval(()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
          }
        }, 100)
      } else {
        d.click()
      }
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    }
  }
}
</script>
