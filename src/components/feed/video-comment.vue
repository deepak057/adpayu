<template lang="pug">
.upload-video-comment-wrap.p-l-20.m-t-10
  span.cursor-hand(@click="triggerVideoSelect()")
    i.mdi.mdi-upload.m-r-5
    | Upload a video {{commentType}}
  .m-t-10.m-l-5(:class="{'m-b-5': commentType === 'comment', 'm-b-15': commentType === 'answer'}")
    <template v-if="!uploadPercentage">
    | Or
    </template>
    <template v-if="uploadPercentage">
    .post-media-file-upload-progress.m-t-10(v-if="uploadPercentage")
      span.post-img-preloader.m-r-5
        <preloader v-if="!path"></preloader>
        i.mdi.mdi-check-all.f-s-17(v-if = "path")
      span
        | {{getFileUploadProgressText()}}
    </template>
  input.none(type="file" :id="elementId" :accept="videoAcceptString()" data-type="video" @change="filesChange($event.target.name, $event.target.files)")
</template>
<script>
import mixin from '../../globals/mixin'
import videoMixin from '../../globals/video'
import Preloader from '../preloader'

export default {
  name: 'VideoComment',
  components: {
    Preloader
  },
  mixins: [mixin, videoMixin],
  props: {
    commentType: {
      type: String,
      default () {
        return 'comment'
      }
    }
  },
  data () {
    return {
      elementId: 'video-comment-video-upload-file-element-' + this.getUniqueId(),
      path: ''
    }
  }
}
</script>
