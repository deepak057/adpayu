<template lang="pug">
<video-player class="vjs-3-4" :options="videoOptions" :playsinline="true" data-setup="{fluid: true}" @play="onPlay($event, comment)" />
</template>
<script>
// require styles
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import mixin from '../../globals/mixin.js'
import Service from './service'

export default {
  name: 'CommentVideoPlayer',
  service: new Service(),
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
  data () {
    return {
      videoOptions: this.videoPlayerOptions(this.comment)
    }
  },
  methods: {
    refreshVideo () {
      let ts = Math.round((new Date()).getTime() / 1000)
      this.comment.videoPath = this.comment.videoPath + '?' + ts
      this.comment.videoOptimized = false
      this.videoOptions = this.videoPlayerOptions(this.comment)
    },
    onPlay (e, c) {
      try {
        this.pauseAllOtherVideos(e)
        if (!c.HasViewed) {
          this.$options.service.markEntityAsViewed(c.id, 'comment')
            .then((d) => {
              c.HasViewed = 1
            })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
