<template lang="pug">
.card
  .card-header.background-music-edit-controls-wrap(:class="{'collapsed': !backMusicControlEnabled}" :id="sectionHeaderId" :aria-controls='sectionId')
    .row.controls-label-wrap-container
      .controls-label-wrap(@click="toggleBackMusicControls()" data-toggle='collapse', :data-target="'#'+sectionId" :class="{'col-5': !isMobile, 'col-1': isMobile}")
        h2.mb-0
          button.btn(type='button')
            i.fa.fa-music.back-music-icon
            span.tab-label.m-l-10.back-music-label
              | Background Music
      .controls-wrap.text-right(:class="{'col-7 p-0 m-0': !isMobile, 'col-11 p-0': isMobile}")
        select.form-control.custom-select.white-back(:class="{'form-control-sm': isMobile}")
          option(value="" selected="selected" disabled="disabled" hidden="hidden") Genere (All)
          <template v-if="musicCategories">
          option(v-for="cat in musicCategories" :value="cat.id") {{cat.label}}
          </template>
        input.form-control(:class="{'m-l-10': !isMobile, 'm-l-5 form-control-sm': isMobile}" type="text" placeholder="Search...")
        button.btn.btn-danger.font-bold.add-music-btn.pr-t--1(@click="triggerAddMusic()" :class="{'m-l-10 m-r-10': !isMobile, 'btn-sm m-l-5 m-r-5': isMobile}")
          i.mdi.mdi-plus
    .control-label-wrap-temp(@click="toggleBackMusicControls()" data-toggle='collapse', :data-target="'#'+sectionId")
      h2.mb-0
        button.btn(type='button')
          i.fa.fa-music.back-music-icon
          span.tab-label.m-l-10.back-music-label
            | Background Music
  .collapse(:id="sectionId" :aria-labelledby="sectionHeaderId", :data-parent="'#'+containerId")
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
  audio.none(:id="getAudioPlayerId()" autoplay="true" :src="audioTrack" loop)
  <add-music :musicCategories="musicCategories" ref="AddMusicComp"/>
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import AddMusic from './add_music'
import Service from './service'

export default {
  name: 'BackgroundMusic',
  service: new Service(),
  components: {
    Preloader,
    AddMusic
  },
  mixins: [mixin],
  props: {
    containerId: {
      type: String,
      required: true
    },
    sectionId: {
      type: String,
      required: true
    },
    sectionHeaderId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      pageLoader: true,
      audioTrack: false,
      isMobile: this.isMobile(),
      backMusicControlEnabled: false,
      musicCategories: false,
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
  mounted () {
    this.getTracks()
    this.getMusicCategories()
  },
  methods: {
    getAudioPlayerId () {
      return this.containerId + '-audio-player'
    },
    getMusicCategories () {
      this.$options.service.getAudioCategories()
        .then((data) => {
          this.musicCategories = data
        })
        .catch((mErr) => {
          this.showNotification('Something went wrong while trying to get Music Categories.', 'error')
        })
    },
    toggleBackMusicControls (otherSection = false) {
      if (!otherSection) {
        this.backMusicControlEnabled = !this.backMusicControlEnabled
      } else {
        this.backMusicControlEnabled = false
      }
    },
    triggerAddMusic () {
      this.$refs.AddMusicComp.triggerPopup()
    },
    addTrack (track) {
      this.audioTrack = track
      for (let i in this.tracks) {
        if (this.tracks[i].id === track.id) {
          this.tracks[i].trackAdded = true
          this.$emit('trackAdded', this.tracks[i])
        } else {
          this.tracks[i].trackAdded = false
        }
      }
    },
    removeTrack (track) {
      this.audioTrack = false
      track.trackAdded = false
      this.$emit('trackRemoved')
    },
    getTracks () {
      for (let i in this.tracks) {
        this.$set(this.tracks[i], 'trackAdded', false)
      }
    },
    pauseTracks (track) {
      for (let i in this.tracks) {
        if (this.tracks[i].id !== track.id) {
          this.tracks[i].playing = false
          this.getPlayer().pause()
        }
      }
    },
    getPlayer () {
      return document.getElementById(this.getAudioPlayerId())
    },
    playTrack (track) {
      let player = this.getPlayer()
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
    }
  }
}
</script>
