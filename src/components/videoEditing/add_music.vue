<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Add Music
            i.mdi.mdi-information-outline.cursor-hand.m-l-5(data-container="body" title="Upload a Music File" data-toggle="popover" data-placement="right" data-content="Upload a music file that you'd like to use as background music for your videos.")
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body.p-b-0
          div
            form
              .form-group
                label(:for="trackTitleFieldId") Track Name/Title*
                input.form-control(type="text" placeholder="Enter here" :id="trackTitleFieldId")
              .form-group
                label(:for="trackGenereFieldId") Genere*
                select.form-control.custom-select(:id="trackGenereFieldId")
                  option(value="" selected="selected" disabled="disabled" hidden="hidden") Please select
                  option(value='') Genere (All)
                  option(value='') Female
              .form-group.m-b-10
                label.pointer(@click="triggerFileUpload()")
                  i.mdi.mdi-upload.m-r-2.v-align-top.f-s-20
                  | Upload Music File*
                input.none(:accept="getAcceptedAudioString()" type="file" :id="fileElementId")
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
      triggered: false,
      acceptedAudioFileTypes: [
        'audio/mp3'
      ]
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
    trackTitleFieldId: {
      get () {
        return this.id + '-add-music-track-title'
      }
    },
    trackGenereFieldId: {
      get () {
        return this.id + '-add-music-genere-field'
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
    getAcceptedAudioString () {
      return this.acceptedAudioFileTypes.join(',')
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    triggerFileUpload () {
      document.getElementById(this.fileElementId).click()
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
