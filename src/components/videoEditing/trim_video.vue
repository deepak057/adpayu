<template lang="pug">
.card-body
  .text-center.m-t-20
    <preloader v-if="pageLoader"/>
  .row
    .col-12
     video.w-100(controls :class="{'none': pageLoader}" :id="videoElementId")
     <template v-if = "!pageLoader">
     <vue-range-slider ref="trimVideoRangeSlider" :formatter = "formatLabels" :piecewise="piecewise" v-model="value" :min="min" :max="max" :enable-cross="enableCross" />
     .text-center
       button.btn.btn-danger.all-caps.m-t-20(@click="startTrim()")
         | {{getTrimBtnText()}}
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
    piecewise: false,
    trimStart: false,
    trimEnd: false
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
      this.value = [0, player.duration]
      this.max = player.duration
    }
    player.onplay = () => {
      this.autoUpdateRangeSlider(player)
    }
  },
  methods: {
    getTrimBtnText () {
      if (!this.trimStart) {
        return 'Start Trim'
      } else {
        return 'Stop Trim'
      }
    },
    autoUpdateRangeSlider (player) {
      setInterval(() => {
        if (this.trimStart) {
          this.value = [this.trimStart, player.currentTime]
        }
      }, 1000)
    },
    startTrim () {
      let player = this.getVideoPlayer()
      if (!this.isPlaying()) {
        player.play()
        this.trimStart = 0
      } else {
        this.trimStart = player.currentTime
      }
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
    getVideoPlayer () {
      return document.getElementById(this.videoElementId)
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
