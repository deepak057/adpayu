<template lang="pug">
<video-player class="vjs-3-4" :class="getPostVideoPlayerClass(feed)" :options="videoPlayerOptions(feed.Video)" :playsinline="true" @ready="onReady($event, feed)" @ended="onPlayEnded($event, feed)" @play="onPlay($event, feed)" data-setup="{fluid: true}"/>
</template>
<script>
// require styles
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import mixin from '../../globals/mixin.js'
import auth from '@/auth/helpers'

export default {
  name: 'FeedVideoPlayer',
  components: {
    videoPlayer
  },
  mixins: [mixin],
  props: {
    feed: {
      type: Object,
      required: true
    },
    autoReplay: {
      type: Boolean,
      default () {
        return false
      }
    },
    triggerPopupView: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    onReady (e, f) {
      this.$emit('ready', {event: e, postObj: f})
    },
    onPlayEnded (e, f) {
      if (this.autoReplay) {
        e.play()
      }
      this.$emit('ended', {event: e, postObj: f})
    },
    onPlay (e, f) {
      try {
        this.pauseAllOtherVideos(e)
        if (this.triggerPopupView) {
          e.pause()
          this.$emit('PostVideoPlayed', f)
        } else {
          this.$emit('FeedVideoPlayed', f)
        }
        if (!f.HasViewed) {
          auth.markEntityAsViewed(f.id, 'post')
            .then((d) => {
              f.HasViewed = 1
            })
        }
        // track this video play for Ad Tutorial
        auth.watchedVideoCount().updateCount(f.id, 'post')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
