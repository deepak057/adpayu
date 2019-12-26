<template lang="pug">
.card-body
  .text-center.m-t-20(v-if="pageLoader")
    <preloader/>
  .row
    .col-12
     video.w-100.edit-videos-max-height(controls :class="{'none': pageLoader}" :id="videoElementId")
     <template v-if = "!pageLoader">
     .text-center.m-t-20
       .video-trim-progress-bar.m-b-20
         <template v-for="(t, n) in trim">
         .vtpb-slice.pointer.theme-blue-background-color(data-container="body" title="Video Slice" data-toggle="popover" data-placement="right" :data-content="getPopoverContent(t)" @dblclick="removeSlice(n)" v-if="sliceFilled(t)" :style="getSliceStyle(t)")
         </template>
       .btn-group
         button.btn.all-caps(@click="toggleTrim()" :class="{'btn-danger': trimStarted, 'btn-success': !trimStarted}")
           | {{trimStarted ? 'Stop' : 'Start'}} Trim
         button.btn.dropdown-toggle.dropdown-toggle-split(:class="{'btn-danger': trimStarted, 'btn-success': !trimStarted}" type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
           span.sr-only Toggle Dropdown
         .dropdown-menu
           a.dropdown-item(href="javascript:void(0)" @click="reset()") Reset
       // div(v-for = "t in trim" v-if="trim.length")
         span(v-if="sliceFilled(t)")
           | Trimmed from {{t[0]}} to {{t[1]}}
     </template>
</template>
<script>
import mixin from '../../globals/mixin'
import EditingMixin from './editingMixin.js'
import Preloader from '../preloader'

function trimVideoInitialState () {
  return {
    interval: false,
    trim: [],
    toggleButtonText: 'Start Trim',
    trimStarted: false
  }
}

export default {
  name: 'TrimVideo',
  components: {
    Preloader
  },
  mixins: [mixin, EditingMixin],
  props: {
    videoObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return trimVideoInitialState()
  },
  created () {
    this.videoElementId = this.getUniqueId() + 'trim-video-player'
  },
  mounted () {
    let player = this.getVideoPlayer()
    this.setVideoSrc(player)
    player.preload = 'metadata'
    player.onloadedmetadata = () => {
      this.pageLoader = false
    }
    player.onended = () => {
      if (this.trim[this.getCurrentEmptySlotIndex()] !== undefined) {
        this.stopTrim()
      }
    }
  },
  methods: {
    getPopoverContent (s) {
      return 'Slice from ' + this.secondsToHms(s[0]) + ' to ' + this.secondsToHms(s[1]) + '. Double click to remove it.'
    },
    sendEvent () {
      this.$emit('trimValueChanged', this.trim)
    },
    sliceFilled (s) {
      return s && s.length >= 2
    },
    removeSlice (index_) {
      this.trim.splice(index_, 1)
      /* eslint-disable */
      $('.popover').remove()
      /* eslint-enable */
    },
    reset (force = false) {
      if (this.canReset() || force) {
        Object.assign(this.$data, trimVideoInitialState())
        this.sendEvent()
        this.resetVideoPlayer(force)
      }
    },
    canReset () {
      return this.trim.length && this.sliceFilled(this.trim[0])
    },
    getSliceStyle (s) {
      let videoDuration = this.getVideoPlayer().duration
      let left = (s[0] * 100) / videoDuration
      let width = ((s[1] - s[0]) * 100) / videoDuration
      return 'left: ' + left + '%; width: ' + width + '%'
    },
    toggleTrim () {
      if (!this.isPlaying()) {
        this.getVideoPlayer().play()
      }
      if (this.trim[this.getCurrentEmptySlotIndex()] === undefined) {
        this.startTrim()
      } else {
        this.stopTrim()
      }
    },
    startTrim () {
      this.trim[this.getCurrentEmptySlotIndex()] = []
      this.trim[this.getCurrentEmptySlotIndex()][0] = this.getVideoPlayer().currentTime
      this.trimStarted = true
    },
    stopTrim () {
      this.trim[this.getCurrentEmptySlotIndex()][1] = this.getVideoPlayer().currentTime
      this.trimStarted = false
      this.sendEvent()
    },
    setSlotIndexValue () {
      this.getCurrentEmptySlotIndex()
    },
    getCurrentEmptySlotIndex () {
      if (this.trim.length) {
        let lastElem = this.trim[this.trim.length - 1]
        if (lastElem && lastElem.length >= 2) {
          return this.trim.length
        } else {
          return (this.trim.length - 1)
        }
      }
      return 0
    },
    setVideoSrc (player) {
      player.setAttribute('src', this.getVideoSrcURL(this.videoObj))
    },
    resetInterval () {
      clearInterval(this.interval)
    },
    pausePlayer () {
      this.getVideoPlayer().pause()
    },
    resetVideoPlayer (resetSrc = false) {
      let p = this.getVideoPlayer()
      p.pause()
      p.currentTime = 0
      if (resetSrc) {
        this.setVideoSrc(p)
      }
    },
    isPlaying () {
      let player = this.getVideoPlayer()
      return player.currentTime > 0 && !player.paused && !player.ended
    },
    secondsToHms (d) {
      var date = new Date(null)
      date.setSeconds(d)
      return date.toISOString().substr(11, 8)
    },
    getVideoPlayer (player = false) {
      return player || document.getElementById(this.videoElementId)
    }
  }
}
</script>
