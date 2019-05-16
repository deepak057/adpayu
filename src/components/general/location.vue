<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false" data-backdrop="static")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          | Here
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect(type='button') Save
</template>
<script>
import mixin from '../../globals/mixin'

export default {
  name: 'SelectMapArea',
  mixins: [mixin],
  data () {
    return {
      id: this.getUniqueId() + '-prompt-pick-location-'
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
        return this.id + '-prompt-pick-location-trigger'
      }
    },
    modalId: {
      get () {
        return this.id + '-prompt-pick-location-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-prompt-pick-location-modal-buton-close'
      }
    }
  },
  methods: {
    trigger (defaultCords) {
      document.getElementById(this.triggerButtonId).click()
    }
  }
}
</script>
