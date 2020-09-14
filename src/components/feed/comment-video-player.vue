<template lang="pug">
<video-player class="vjs-3-4" :class="getCommentVideoPlayerClass(comment)" :options="videoPlayerOptions(comment)" :playsinline="true" @ended="onPlayEnded($event)" data-setup="{fluid: true}" @play="onPlay($event, comment)" />
</template>
<script>
// require styles
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import mixin from '../../globals/mixin.js'
import auth from '@/auth/helpers'

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
    onPlay (e, c) {
      try {
        this.pauseAllOtherVideos(e)
        if (this.triggerPopupView) {
          e.pause()
          this.$emit('CommentVideoPlayed', c)
        }
        if (!c.HasViewed) {
          auth.markEntityAsViewed(c.id, 'comment')
            .then((d) => {
              c.HasViewed = 1
            })
        }
        auth.watchedVideoCount().updateCount(c.id, 'comment')
      } catch (e) {
        console.log(e)
      }
    },
    onPlayEnded (e) {
      if (this.autoReplay) {
        e.play()
      }
    }
  }
}
</script>
