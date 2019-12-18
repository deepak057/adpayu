<template lang="pug">
.card-body
  .text-center.m-t-20(v-if="pageLoader")
    <preloader/>
  .row
    .col-12
     video.w-100(controls :class="{'none': pageLoader}" :id="videoElementId")
     <template v-if = "!pageLoader">
     .text-center.m-t-20
       .btn-group
         button.btn.btn-danger.all-caps(@click="toggleTrim()")
           | {{toggleButtonText}}
       div(v-for = "t in trim" v-if="trim.length")
         span(v-if="t.length >= 2")
           | Trimmed from {{t[0]}} to {{t[1]}}
     </template>
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'

function trimVideoInitialState () {
  return {
    interval: false,
    trim: [],
    toggleButtonText: 'Start Trim'
  }
}

export default {
  name: 'TrimVideo',
  components: {
    Preloader
  },
  mixins: [mixin],
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
    player.setAttribute('src', this.getVideoURL(this.videoObj))
    player.preload = 'metadata'
    player.onloadedmetadata = () => {
      this.pageLoader = false
    }
    player.onEnded = () => {
    }
  },
  methods: {
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
      this.toggleButtonText = 'Stop Trim'
    },
    stopTrim () {
      this.trim[this.getCurrentEmptySlotIndex()][1] = this.getVideoPlayer().currentTime
      this.toggleButtonText = 'Start Trim'
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
    resetInterval () {
      clearInterval(this.interval)
    },
    pausePlayer () {
      this.getVideoPlayer().pause()
    },
    resetVideoPlayer () {
      let p = this.getVideoPlayer()
      p.pause()
      p.currentTime = 0
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
