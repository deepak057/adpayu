<template lang="pug">
.form-group.post-upload-media-wrap
  span.m-r-10.pointer(@click="triggerVideoSelect")
    i.mdi.mdi.mdi-video.f-s-20
    |  Upload Video
  .post-media-file-upload-progress.m-t-10(v-show="files.length > 0")
    span.post-img-preloader.m-r-5
      <preloader v-if="totalFilesUploaded < totalFiles"></preloader>
      i.mdi.mdi-check-all.f-s-17(v-show = "totalFilesUploaded == totalFiles")
    span
      | {{getFileUploadProgressText()}}
  input.none(type="file" id="file-video" accept="video/*" data-type="video" @change="filesChange($event.target.name, $event.target.files)")
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
  data () {
    return {
      validVideoTypes: ['video/ogg', 'video/mp4', 'video/webm', 'video/webm', 'application/x-mpegURL'],
      images: [],
      files: [],
      totalFilesUploaded: 0,
      totalFiles: 0
    }
  },
  methods: {
    triggerVideoSelect () {
      document.getElementById('file-video').click()
    },
    filesChange (event, files) {
      console.log(files)
      if (files.length && this.validateVideo(files)) {
        // this.uploadImages(files)
      } else {
        alert('Please choose valid video file')
      }
    },
    uploadImages (files) {
      for (let i = 0; i < files.length; i++) {
        let formData = new FormData()
        let that = this
        formData.append('image', files[i])
        this.files.push(files[i])
        this.$options.service.uploadImages(formData)
          .then((data) => {
            that.images.push(data)
            that.totalFilesUploaded++
            that.$emit('imagesUpdated', data)
          })
          .catch((imgErr) => {
            alert('Something went wrong while uploading the images')
          })
      }
    },
    getFileUploadProgressText () {
      let text = 'Uploading images...'
      if (!this.totalFilesUploaded) {
        return text
      } else if (this.totalFilesUploaded < this.totalFiles) {
        return text + Math.round(((this.totalFilesUploaded / this.totalFiles) * 100)) + '%'
      } else {
        return this.totalFiles + ' image' + (this.totalFiles > 1 ? 's' : '') + ' added'
      }
    },
    validateVideo (files) {
      let valid = true
      for (let i = 0; i < files.length; i++) {
        if (this.validVideoTypes.indexOf(files[i]['type']) === -1) {
          valid = false
        }
      }
      return valid
    },
    reset () {
      this.images = []
      this.files = []
      this.totalFilesUploaded = 0
      this.totalFiles = 0
    }
  }
}
</script>
