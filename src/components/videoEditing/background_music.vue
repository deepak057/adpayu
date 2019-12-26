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
        select.form-control.custom-select.white-back(v-model="trackFilterModel.genere" :class="{'form-control-sm': isMobile}")
          option(value="" selected="selected" disabled="disabled" hidden="hidden") Type (All)
          <template v-if="musicCategories">
          option(v-for="cat in musicCategories" :value="cat.id") {{cat.label}}
          </template>
        input.form-control(@keyup.enter="applyFilter()" v-model="trackFilterModel.search" :class="{'m-l-10': !isMobile, 'm-l-5 form-control-sm': isMobile}" type="text" placeholder="Search & Enter...")
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
      .text-center(v-if="!fetching && !tracks.length && !noMoreTracks")
        .alert.alert-info
          | No Tracks
      .row.background-music-tracks-outer-container(:id="tracksWrapperId" v-if="!fetching")
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
                      .c-inherit(:class="{'text-excerpt pointer': !track.playing, 'marquee': track.playing}")
                        span(@click="playTrack(track)" title="Play Track" :class="{'pointer': !track.playing}")
                          | {{track.name}}
                    h5.m-t-5.text-muted.m-b-0
                      span
                        span.pointer(@click="addTrack(track)" v-if="!track.trackAdded") Add
                        .btn-group(v-if="track.trackAdded")
                          button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                            i.fa.fa-check.m-r-5
                            span Added
                          .dropdown-menu
                            a.dropdown-item(href='javascript:void(0)' @click="removeTrack(track)") Remove
              i.fa.fa-trash.pointer.fix-in-bottom-right(title="Delete this track which was uploaded by you" v-if="isTrackOwener(track)" @click="deleteTrack(track)")
        .text-center.col-12.m-0.p-0(v-if="loadMorePreloader || noMoreTracks")
          <preloader v-if="loadMorePreloader"/>
          span(v-if="noMoreTracks")
            i.mdi.mdi-emoticon-sad.m-r-5
            | No more tracks
      .m-t-20.text-center(v-if="fetching")
        <preloader />
  audio.none(:id="getAudioPlayerId()" autoplay="true" :src="audioTrack" loop)
  <add-music :myTracksCategoryId = "myTracksCategoryId" @addTrack="useAddedTrack" @newTrackUploaded="newTrackUploaded" :musicCategories="musicCategories" ref="AddMusicComp"/>
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import AddMusic from './add_music'
import Service from './service'
import auth from '@/auth/helpers'

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
      fetching: true,
      audioTrack: false,
      isMobile: this.isMobile(),
      backMusicControlEnabled: false,
      musicCategories: false,
      disableLoadMore: false,
      myTracksCategoryId: 0,
      currentUser: auth.getUser(),
      tracks: [],
      tracksWrapperId: this.sectionId + '-track-wrapper',
      loadMorePreloader: false,
      noMoreTracks: false,
      trackFilterModel: {
        genere: '',
        search: '',
        page: 1
      }
    }
  },
  watch: {
    'trackFilterModel.genere' (newV, oldV) {
      this.applyFilter()
    }
    /* 'trackFilterModel.search' (newV, oldV) {
      this.applyFilter()
    } */
  },
  mounted () {
    this.fetchTracks()
    this.getMusicCategories()
  },
  methods: {
    isTrackOwener (track) {
      return this.currentUser.id === track.UserId
    },
    deleteTrack (track) {
      if (confirm('Are you sure you want to delete it?')) {
        this.pauseTrack(track, true)
        for (let i in this.tracks) {
          if (this.tracks[i].id === track.id) {
            this.removeTrack(this.tracks[i])
            this.tracks.splice(i, 1)
            this.$options.service.deleteTrack(track.id)
              .catch((tErr) => {
                this.showNotification('Something went wrong while deleting the Track.', 'error')
              })
          }
        }
      }
    },
    applyFilter () {
      this.pauseAllTracks()
      this.trackFilterModel.page = 1
      this.noMoreTracks = false
      this.tracks = []
      this.removeTrack()
      this.fetchTracks()
    },
    getTracksWrapperElement () {
      return document.getElementById(this.tracksWrapperId)
    },
    attachScrollEvent () {
      let attachEvent = (elem) => {
        elem.onscroll = () => {
          if (elem.scrollTop >= ((elem.scrollHeight - 200) - elem.offsetHeight)) {
            this.trackFilterModel.page++
            this.fetchTracks()
          }
        }
      }
      let interval = setInterval(() => {
        let elem = this.getTracksWrapperElement()
        if (elem) {
          attachEvent(elem)
          clearInterval(interval)
        }
      }, 100)
    },
    getAudioPlayerId () {
      return this.containerId + '-audio-player'
    },
    newTrackUploaded (track) {
      this.tracks.unshift(this.getTrack(track))
    },
    fetchTracks () {
      if (this.noMoreTracks) {
        return false
      }
      if (this.trackFilterModel.page === 1) {
        this.fetching = true
      } else {
        this.loadMorePreloader = true
      }
      this.$options.service.fetchTracks(this.trackFilterModel)
        .then((data) => {
          this.loadMorePreloader = false
          this.fetching = false
          if (data.tracks.length) {
            this.tracks = this.tracks.concat(this.getTracks(data.tracks))
            if (this.trackFilterModel.page === 1) {
              this.attachScrollEvent()
            }
          } else {
            this.noMoreTracks = true
          }
        })
        .catch((tErr) => {
          this.showNotification('Something went wrong while trying to fetch music tracks.', 'error')
        })
    },
    getTracks (tracks) {
      for (let i in tracks) {
        tracks[i] = this.getTrack(tracks[i])
      }
      return tracks
    },
    getTrack (track) {
      this.$set(track, 'trackAdded', false)
      this.$set(track, 'playing', false)
      return track
    },
    getMusicCategories () {
      this.$options.service.getAudioCategories()
        .then((data) => {
          this.musicCategories = data.categories
          this.myTracksCategoryId = data.myTracksCategoryId
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
    useAddedTrack (track) {
      this.getTracksWrapperElement().scrollTop = 0
      this.addTrack(track)
    },
    addTrack (track) {
      this.audioTrack = track
      for (let i in this.tracks) {
        if (this.tracks[i].id === track.id) {
          this.tracks[i].trackAdded = true
          this.tracks[i].playing = false
          this.$emit('trackAdded', this.tracks[i])
        } else {
          this.tracks[i].trackAdded = false
        }
      }
    },
    removeTrack (track = false) {
      if (track) {
        if (track.trackAdded) {
          this.audioTrack = false
          track.trackAdded = false
          this.$emit('trackRemoved')
        }
      } else {
        this.audioTrack = false
        for (let i in this.tracks) {
          this.tracks[i].trackAdded = false
        }
        this.$emit('trackRemoved')
      }
    },
    pauseTracks (track) {
      for (let i in this.tracks) {
        if (this.tracks[i].id !== track.id) {
          this.pauseTrack(this.tracks[i])
        }
      }
    },
    pauseAllTracks () {
      for (let i in this.tracks) {
        this.pauseTrack(this.tracks[i])
      }
    },
    pauseTrack (track, playCheck = false) {
      let pause = () => {
        track.playing = false
        this.getPlayer().pause()
      }
      if (playCheck) {
        if (track.playing) {
          pause()
        }
      } else {
        pause()
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
            player.setAttribute('src', this.audioURL(this.tracks[i]))
            player.play()
          }
        }
      }
    }
  }
}
</script>
