<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-backdrop="static" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Edit Video
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .accordion.accordion-blue(:id="getSectionId(0)")
            <background-music ref="BackgroundMusicComp" @trackRemoved="trackRemoved" @trackAdded="trackAdded" :containerId="getSectionId(0)" :sectionHeaderId="getSectionId(1, 'header')" :sectionId="getSectionId(1)"/>
            .card
              .card-header(@click="toggleBackMusicControls(true)" :id="getSectionId(2, 'header')" data-toggle='collapse', :data-target="'#'+getSectionId(2)", aria-expanded='true', :aria-controls='getSectionId(2)')
                h2.mb-0
                  button.btn(type='button')
                    i.fa.fa-cut.m-r-10
                    span.tab-label
                      | Trim Video
              .collapse(:id="getSectionId(2)" :aria-labelledby="getSectionId(2, header)", :data-parent="'#'+getSectionId(0)")
                .card-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            .card
              .card-header(@click="toggleBackMusicControls(true)" :id="getSectionId(3, 'header')" data-toggle='collapse', :data-target="'#'+getSectionId(3)", aria-expanded='true', :aria-controls='getSectionId(3)')
                h2.mb-0
                  button.btn(type='button')
                    i.fa.fa-image.m-r-10
                    span.tab-label
                      | Video Screenshot
              .collapse(:id="getSectionId(3)" :aria-labelledby="getSectionId(3, header)", :data-parent="'#'+getSectionId(0)")
                .card-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect.waves-light(:class="{'disabled': !canTriggerPreview()}" @click="triggerPreview()")
            | Preview
        <preview ref="PreviewComponent" />
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import Preview from './preview'
import BackgroundMusic from './background_music'

// import auth from '@/auth/helpers'

export default {
  name: 'VideoEditing',
  components: {
    Preloader,
    Preview,
    BackgroundMusic
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-video-editing',
      triggered: false,
      editedVideoConfig: {
        backgroundTrack: false,
        videoObj: false
      }
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
    toggleBackMusicControls (otherSection = false) {
      this.$refs.BackgroundMusicComp.toggleBackMusicControls(otherSection)
    },
    trackAdded (track) {
      this.editedVideoConfig.backgroundTrack = track
    },
    canTriggerPreview () {
      return this.editedVideoConfig.backgroundTrack
    },
    trackRemoved () {
      this.editedVideoConfig.backgroundTrack = false
    },
    triggerPreview () {
      if (this.canTriggerPreview()) {
        this.$refs.BackgroundMusicComp.pauseTracks(this.editedVideoConfig.backgroundTrack)
        this.$refs.PreviewComponent.triggerPopup(this.editedVideoConfig)
      }
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    getSectionId (index, type_ = 'collapse') {
      return this.id + '-' + type_ + '-' + index
    },
    triggerPopup (videoObj) {
      /*eslint-disable*/
      this.triggered = true
      this.editedVideoConfig.videoObj = videoObj
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
