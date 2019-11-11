<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Video Preview
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          h4 Preview
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Cancel
          button.btn.btn-danger.waves-effect.waves-light
            | Save
    audio.none(:id="audioPlayerId")
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
      id: this.getUniqueId() + '-video-editing-preview',
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
        return this.id + '-video-editing-preview'
      }
    },
    audioPlayerId: {
      get () {
        return this.id + '-video-editing-preview-audio-player'
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
    playPreview (config) {
      let audioPlayer = document.getElementById(this.audioPlayerId)
      audioPlayer.setAttribute('src', config.audioSrc)
      audioPlayer.play()
    },
    triggerPopup (config) {
      /*eslint-disable*/
      this.triggered = true
      let d = document.getElementById(this.triggerButtonId)
      let play = ()=> {
        d.click()
        this.playPreview(config)
      }
      if (!d) {
          let interval = setInterval (()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            play()
            clearInterval(interval)
          }
        }, 100)
      } else {
        play()
      }
    }
  }
}
</script>
