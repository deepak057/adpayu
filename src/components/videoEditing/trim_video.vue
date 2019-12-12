<template lang="pug">
.card-body
  .text-center.m-t-20
    <preloader v-if="pageLoader"/>
  .row
    .col-12
     video.w-100(controls :class="{'none': pageLoader}" :id="videoElementId")
     <template v-if = "!pageLoader">
     <vue-range-slider @drag-start="resetInterval" @drag-end="dragEnd" ref="trimVideoRangeSlider" :formatter = "formatLabels" :disabled = "sliderDisabled" :piecewise="piecewise" v-model="value" :min="min" :max="max" :enable-cross="enableCross" />
     .text-center.m-t-20
       button.btn.all-caps(@click="trimToggle()" :class="{'btn-danger': !trimCompleted(), 'btn-success': trimCompleted()}")
         i.mdi.mdi-check.m-r-5(v-if="trimCompleted()")
         | {{getTrimBtnText()}}
       button.btn.btn-outline-secondary.all-caps.m-l-10(:disabled="!trimCompleted()" @click="reset()")
         | Reset
       .m-t-10(v-if="trimCompleted()")
         | {{trimedCompletedText()}}
     </template>
</template>
<script>
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
import mixin from '../../globals/mixin'
import Preloader from '../preloader'

function trimVideoInitialState () {
  return {
    value: [0, 100],
    min: 0,
    max: 250,
    enableCross: false,
    pageLoader: true,
    piecewise: true,
    trimStart: 0,
    trimEnd: false,
    interval: false,
    sliderDisabled: false
  }
}

export default {
  name: 'TrimVideo',
  components: {
    VueRangeSlider,
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
      this.initRangeSlider(player)
      this.refresh()
    }
    player.onplay = () => {
      if (!this.trimStart) {
        this.startTrim()
      }
      if (!this.trimCompleted()) {
        this.autoUpdateRangeSlider(player)
      }
    }
    player.onended = () => {
      if (this.trimStart && !this.trimCompleted()) {
        this.stopTrim()
      }
    }
  },
  methods: {
    trimedCompletedText () {
      return 'Trimmed from ' + this.secondsToHms(this.trimStart) + ' to ' + this.secondsToHms(this.trimEnd)
    },
    initRangeSlider (player = false) {
      let p = this.getVideoPlayer(player)
      this.max = p.duration
      this.trimEnd = p.duration
      this.refreshTrimValue()
    },
    getTrimBtnText () {
      if (!this.trimCompleted()) {
        if (!this.trimStart) {
          return 'Start Trim'
        } else {
          return 'Stop Trim'
        }
      } else {
        return 'Trim Completed'
      }
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
    reset () {
      this.trimStart = 0
      this.trimEnd = this.getVideoPlayer().duration
      this.initRangeSlider()
      this.sliderDisabled = false
      this.resetInterval()
      this.resetVideoPlayer()
    },
    dragEnd (slider) {
      if (!this.trimStart) {
        this.startTrim()
      }
      this.trimStart = slider.value[0]
      this.getVideoPlayer().currentTime = parseInt(slider.value[1])
      this.autoUpdateRangeSlider()
    },
    trimCompleted () {
      return this.trimStart && this.trimEnd
    },
    autoUpdateRangeSlider (player = false) {
      let p = this.getVideoPlayer(player)
      this.interval = setInterval(() => {
        if (this.trimStart && !this.trimEnd) {
          this.refreshTrimValue(false, p.currentTime)
        }
      }, 1000)
    },
    trimToggle () {
      if (!this.trimStart || !this.trimEnd) {
        if (!this.trimStart) {
          this.startTrim()
        } else {
          this.stopTrim()
        }
      }
    },
    getSliderValue () {
      return this.$refs.trimVideoRangeSlider.value
    },
    stopTrim () {
      let player = this.getVideoPlayer()
      let sValue = this.getSliderValue()
      this.trimStart = sValue[0]
      this.trimEnd = player.currentTime
      this.$emit('VideoTrimmed', sValue)
      this.sliderDisabled = true
      this.refreshTrimValue()
      this.resetInterval()
      this.pausePlayer()
    },
    refreshTrimValue (start = false, end = false) {
      this.value = [start || this.trimStart, end || this.trimEnd]
    },
    startTrim () {
      let player = this.getVideoPlayer()
      this.trimEnd = 0
      if (!this.isPlaying()) {
        player.play()
        this.trimStart = 0.001
      } else {
        this.trimStart = player.currentTime
      }
      this.refreshTrimValue()
    },
    isPlaying () {
      let player = this.getVideoPlayer()
      return player.currentTime > 0 && !player.paused && !player.ended
    },
    formatLabels (v) {
      return this.secondsToHms(v)
    },
    secondsToHms (d) {
      var date = new Date(null)
      date.setSeconds(d)
      return date.toISOString().substr(11, 8)
    },
    getVideoPlayer (player = false) {
      return player || document.getElementById(this.videoElementId)
    },
    refresh () {
      /*
      * produce the delay of 100 miliseconds
      * so that refresh method is called
      * when the container is fully visible
      */
      setTimeout(() => {
        this.$refs.trimVideoRangeSlider.refresh()
      }, 100)
    }
  }
}
</script>
