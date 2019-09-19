<template lang="pug">
<video-player class="vjs-3-4" :options="videoPlayerOptions(comment)" :playsinline="true" data-setup="{fluid: true}" @play="onPlay($event, comment)"/>
</template>
<script>
// require styles
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import mixin from '../../globals/mixin.js'

export default {
  name: 'CommentVideoPlayer',
  components: {
    videoPlayer
  },
  mixins: [mixin],
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    onPlay (e, c) {
      alert('d')
      this.$emit('play', {event: e, postObj: c})
    }
  }
}
</script>
