<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-backdrop="static" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            i.fa.fa-question-outline.m-r-5
            | Help - how to cut video ?
          button.close(:id="closeButtonId" type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          p
            strong
              | 1. Cut Video:
            |  Hit "Start Cut" button to start the cut and then hit "Stop Cut" button to complete it. You can also forward or backward the video using video's progress bar and make the cut at desired time.
          p
            strong
              | 2. Delete the cuts:
            |  Double click/tap or long click/tap on any video cut (blue line) to delete it. Single click/tap on a cut (blue line) to see more info about about it.
          p
            strong
              | 3. Preview:
            |  Click Preview button to see the preview of final video. It's recommended to always see the preview before saving the video. Once saved, you can't restore the original video.
        .modal-footer
</template>
<script>
import mixin from '../../globals/mixin'

export default {
  name: 'TrimHelp',
  mixins: [mixin],
  data () {
    return {
      id: this.getUniqueId() + '-video-trim-help',
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
        return this.id + '-video-trim-help'
      }
    },
    modalId: {
      get () {
        return this.id + '-video-trim-help-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-video-trim-help-modal-buton-close'
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
      /* eslint-enable */
    }
  }
}
</script>
