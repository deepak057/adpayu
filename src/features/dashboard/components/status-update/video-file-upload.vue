<template lang="pug">
.form-group.post-upload-media-wrap
  span.m-r-10.pointer(@click="triggerVideoSelect")
    i.mdi.mdi.mdi-video.f-s-20
    |  Upload Video
  .post-media-file-upload-progress.m-t-10(v-show="uploadPercentage")
    span.post-img-preloader.m-r-5
      <preloader v-if="uploadPercentage < 100"></preloader>
      i.mdi.mdi-check-all.f-s-17(v-show = "uploadPercentage >= 100")
    span
      | {{getFileUploadProgressText()}}
  input.none(type="file" id="file-video" :accept="videoAcceptString()" data-type="video" @change="filesChange($event.target.name, $event.target.files)")
</template>
<script>
import Service from './service'
import Preloader from './../../../../components/preloader'
export default {
  name: 'VideoUpload',
  service: new Service(),
  components: {
    Preloader
  },
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
      validVideoTypes: ['video/ogg', 'video/mp4', 'video/webm', 'video/webm', 'application/x-mpegURL', 'video/x-flv', 'video/3gp', 'video/3gpp', 'video/x-matroska'],
      uploadPercentage: 0
    }
  },
  /* watch: {
    path (newV) {
      if (!newV.length) {
        this.uploadPercentage = 0
      }
    }
  }, */
  methods: {
    videoAcceptString () {
      let v = this.validVideoTypes
      // v.push('video/*')
      return v.join(',') + ',video/*'
    },
    triggerVideoSelect () {
      document.getElementById('file-video').click()
    },
    filesChange (event, files) {
      if (files.length && this.validateVideo(files)) {
        this.uploadVideo(files)
      } else {
        alert('Please choose a valid video file')
      }
    },
    uploadVideo (files) {
      let formData = new FormData()
      formData.append('video', files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function (progressEvent) {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }.bind(this)
      }
      this.$options.service.uploadVideo(formData, config)
        .then((data) => {
          this.path = data.path
          this.$emit('videoUploaded', this.path)
        })
        .catch((errVideo) => {
          alert('Something went wrong while uploading the video')
        })
    },
    getFileUploadProgressText () {
      if (this.uploadPercentage < 100) {
        return 'Uploading video...' + this.uploadPercentage + '%'
      } else {
        return 'Video uploaded'
      }
    },
    validateVideo (files) {
      let valid = true
      if (this.validVideoTypes.indexOf(files[0]['type']) === -1) {
        valid = false
      }
      return valid
    },
    reset () {
      this.uploadPercentage = 0
    }
  }
}
</script>
