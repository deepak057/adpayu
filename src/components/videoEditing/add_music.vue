<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='backGroundMusicAddModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Add Music
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          h3 Add here
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Cancel
          button.btn.btn-danger.waves-effect.waves-light()
            | Add
</template>
<script>
import mixin from '../../globals/mixin'
import Service from './service'
// import auth from '@/auth/helpers'

export default {
  name: 'AddMusic',
  service: new Service(),
  mixins: [mixin],
  data () {
    return {
      id: this.getUniqueId() + '-add-background-music',
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
        return this.id + '-add-background-music'
      }
    },
    modalId: {
      get () {
        return this.id + '-add-background-music'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-add-background-music-modal-buton-close'
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
      this.triggered = true
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
        let interval = setInterval (()=> {
        d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
          }
        }, 100)
      } else {
        d.click()
      }
    }
  }
}
</script>
