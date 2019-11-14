<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Edit Video
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .accordion.accordion-blue(:id="getSectionId(0)")
            .card
              .card-header.background-music-edit-controls-wrap.collapsed(:id="getSectionId(1, 'header')" data-toggle='collapse', :data-target="'#'+getSectionId(1)", aria-expanded='true', :aria-controls='getSectionId(1)')
                <template>
                .row
                  .col-4.controls-label-wrap
                    h2.mb-0
                      button.btn(type='button')
                        i.fa.fa-music.m-r-10
                        span.tab-label
                          | Background Music
                  .col-8.controls-wrap.text-right
                    select.form-control.custom-select.white-back
                      option(value='') Genere (All)
                      option(value='') Female
                    input.m-l-10.form-control(type="text" placeholder="Search...")
                    button.btn.btn-danger.m-l-10.font-bold.add-music-btn.pr-t--1
                      i.mdi.mdi-plus
                </template>
              .collapse(:id="getSectionId(1)" :aria-labelledby="getSectionId(1, header)", :data-parent="'#'+getSectionId(0)")
                .card-body
                  .row
                    .col-lg-4.col-md-6(v-for="track in tracks")
                      .card.m-b-30
                        .card-body
                          .row
                            .col-4
                              .pointer.round.round-lg.align-self-center.round-info(@click="playTrack(track)")
                                i.mdi.mdi.mdi-play(v-if= "!track.playing")
                                i.mdi.mdi.mdi-stop(v-if= "track.playing")
                            .col-8.p-0
                              .m-l-10.align-self-center
                                h4.m-b-0.font-light.marquee-container
                                  .c-inherit(:class="{'text-excerpt': !track.playing, 'marquee': track.playing}") {{track.title}}
                                h5.m-t-5.text-muted.m-b-0
                                  span
                                    span.pointer(@click="addTrack(track)" v-if="!track.trackAdded") Add
                                    .btn-group(v-if="track.trackAdded")
                                      button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                                        i.fa.fa-check.m-r-5
                                        span Added
                                      .dropdown-menu
                                        a.dropdown-item(href='javascript:void(0)' @click="removeTrack(track)") Remove
            .card
              .card-header(:id="getSectionId(2, 'header')" data-toggle='collapse', :data-target="'#'+getSectionId(2)", aria-expanded='true', :aria-controls='getSectionId(2)')
                h2.mb-0
                  button.btn(type='button')
                    i.fa.fa-cut.m-r-10
                    span.tab-label
                      | Trim Video
              .collapse(:id="getSectionId(2)" :aria-labelledby="getSectionId(2, header)", :data-parent="'#'+getSectionId(0)")
                .card-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            .card
              .card-header(:id="getSectionId(3, 'header')" data-toggle='collapse', :data-target="'#'+getSectionId(3)", aria-expanded='true', :aria-controls='getSectionId(3)')
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
          button.btn.btn-danger.waves-effect.waves-light(:class="{'disabled': !audioTrack}" @click="triggerPreview()")
            | Preview
        audio.none(:id="audioPlayerId" autoplay="true" :src="audioTrack" loop)
        <preview ref="PreviewComponent" />
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import Preview from './preview'

// import auth from '@/auth/helpers'

export default {
  name: 'VideoEditing',
  components: {
    Preloader,
    Preview
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-video-editing',
      triggered: false,
      audioTrack: false,
      videoObj: false,
      tracks: [
        {
          id: 1,
          title: 'DJ Snake- Taki Taki (reloaded 2019)',
          URL: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
          playing: false
        },
        {
          id: 2,
          title: 'ADJ Snake- Taki Taki (reloaded 2019)',
          URL: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          playing: false
        },
        {
          id: 3,
          title: 'DJ Snake- Bala Bala (reloaded 2019)',
          URL: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
          playing: false
        }
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
        return this.id + '-video-editing'
      }
    },
    audioPlayerId: {
      get () {
        return this.id + '-audio-player'
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
    this.getTracks()
  },
  methods: {
    addTrack (track) {
      this.audioTrack = track
      for (let i in this.tracks) {
        if (this.tracks[i].id === track.id) {
          this.tracks[i].trackAdded = true
        } else {
          this.tracks[i].trackAdded = false
        }
      }
    },
    removeTrack (track) {
      this.audioTrack = false
      track.trackAdded = false
    },
    getTracks () {
      for (let i in this.tracks) {
        this.$set(this.tracks[i], 'trackAdded', false)
      }
    },
    playTrack (track) {
      let player = document.getElementById(this.audioPlayerId)
      player.pause()
      for (let i in this.tracks) {
        if (this.tracks[i].id !== track.id) {
          this.tracks[i].playing = false
        } else {
          this.tracks[i].playing = !this.tracks[i].playing
          if (this.tracks[i].playing) {
            player.setAttribute('src', this.tracks[i].URL)
            player.play()
          }
        }
      }
    },
    triggerPreview () {
      if (this.audioTrack) {
        this.audioTrack.playing = false
        this.$refs.PreviewComponent.triggerPopup({
          audioSrc: this.audioTrack.URL,
          videoSrc: this.getVideoURL(this.videoObj),
          videoObj: this.videoObj
        })
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
      this.videoObj = videoObj
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
