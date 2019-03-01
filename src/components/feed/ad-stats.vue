<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-backdrop="static" data-keyboard="false")
  .modal.fade.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-labelledby='AdStatsModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Ad Stats
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .text-center.m-t-20(v-if="pageLoader")
            .table-responsive
              table.table.table-hover
                thead
                  tr
                    th Action
                    th Cost per action
                    th Target
                    th Acheived
                tbody
                  tr
                    td impression
                    td $.004
                    td 500
                    td
                      span.text-danger.text-semibold
                        i.fa.fa-level-down(aria-hidden='true')
                      |  28.76%
            // <preloader/>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import Service from './service'
import auth from '@/auth/helpers'
// import { router } from '@/http'

export default {
  name: 'AdStats',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-ad-stats-modal-',
      currentUser: auth.getUser()
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
        return this.id + '-trigger-ad-stats-modal'
      }
    },
    modalId: {
      get () {
        return this.id + '-ad-stats-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-ad-stat-modal-buton-close'
      }
    }
  },
  mounted () {
  },
  methods: {
    triggerPopup () {
      document.getElementById(this.triggerButtonId).click()
    },
    closePopup (closePostPopup = false) {
      document.getElementById(this.closeButtonId).click()
    }
  }
}
</script>
