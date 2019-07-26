<template lang="pug">
.form-group.post-upload-media-wrap
  span.m-r-10.pointer(@click="triggerVideoSelect")
    i.mdi.mdi.mdi-video.f-s-20
    span.p-r-t--2
      |  Upload Video*
  .post-media-file-upload-progress.m-t-10(v-show="uploadPercentage")
    span.post-img-preloader.m-r-5
      <preloader v-if="!path"></preloader>
      i.mdi.mdi-check-all.f-s-17(v-show = "path")
    span
      | {{getFileUploadProgressText()}}
    span
      i.fa.fa-trash.m-l-5.pointer.f-s-13(v-if="path" title = "Remove video" @click="removeVideo()")
  input.none(type="file" :id="elementId" :accept="videoAcceptString()" data-type="video" @change="filesChange($event.target.name, $event.target.files)")
</template>
<script>
import videoMixin from '../../../../globals/video'
import Preloader from './../../../../components/preloader'
import auth from '@/auth/helpers'

export default {
  name: 'VideoUpload',
  components: {
    Preloader
  },
  mixins: [videoMixin],
  props: {
    path: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      elementId: 'post-video-upload-file-element'
    }
  },
  methods: {
    removeVideo () {
      auth.deleteFiles([this.path], 'video')
      this.path = ''
      this.uploadPercentage = 0
      // emit fake even with empty path value
      // so that the main video component resets
      // the path to null
      this.$emit('videoUploaded', '')
    }
  }
  /* watch: {
    path (newV) {
      if (!newV.length) {
        this.uploadPercentage = 0
      }
    }
  }, */
}
</script>
