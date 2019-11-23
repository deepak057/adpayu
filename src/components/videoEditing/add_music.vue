<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Add Music
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          div
            form
              .form-group
                label Track name/title*
                input.form-control(type="text" placeholder="Enter here")
              .form-group
                label Genere*
                select.form-control.custom-select
                  option(value='') Genere (All)
                  option(value='') Female
              .form-group
                label
                  i.mdi.mdi-upload.m-r-5.v-align-top.f-s-20
                  | Upload Audio File
              file.none(:id="fileElementId")
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Cancel
          button.btn.btn-danger.waves-effect.waves-light
            | Add
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import Service from './service'

export default {
  name: 'AddMusic',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-add-music-modal',
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
        return this.id + '-add-music-modal-trigger'
      }
    },
    fileElementId: {
      get () {
        return this.id + '-upload-music-file'
      }
    },
    modalId: {
      get () {
        return this.id + '-add-music-modal-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-add-music-modal-buton-close'
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
    }
  }
}
</script>
