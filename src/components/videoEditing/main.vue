<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Edit Video
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .vtabs.customvtab
            ul.nav.nav-tabs.tabs-vertical(role='tablist')
              li.nav-item
                a.nav-link.active(data-toggle='tab', href='#home31', role='tab')
                  span.hidden-sm-up
                    i.ti-home
                  span.hidden-xs-down Home
              li.nav-item
                a.nav-link(data-toggle='tab', href='#profile31', role='tab')
                  span.hidden-sm-up
                    i.ti-user
                  span.hidden-xs-down Profile
              li.nav-item
                a.nav-link(data-toggle='tab', href='#messages31', role='tab')
                  span.hidden-sm-up
                    i.ti-email
                  span.hidden-xs-down Messages
            .tab-content
              #home31.tab-pane.active(role='tabpanel', aria-expanded='false')
                div
                  h3 Best Clean Tab ever
                  h4 you can use it with the small code
                  p
                    | Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a.
              #profile31.tab-pane(role='tabpanel', aria-expanded='false') 2
              #messages31.tab-pane(role='tabpanel', aria-expanded='true') 3
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect.waves-light(@click="proceedToPay()")
            | Preview
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
// import auth from '@/auth/helpers'

export default {
  name: 'VideoEditing',
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-video-editing'
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
        return this.id + '-video-editing'
      }
    },
    modalId: {
      get () {
        return this.id + '-video-editing-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-video-editing-modal-buton-close'
      }
    }
  },
  mounted () {
  },
  methods: {
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    triggerPopup () {
      /*eslint-disable*/
      document.getElementById(this.triggerButtonId).click()
    }
  }
}
</script>
