<template lang="pug">
.form-group.post-upload-media-wrap
  span.m-r-10.pointer(@click="triggerImageSelect")
    i.mdi.mdi.mdi-image.f-s-20
    |  Add images
  .post-media-file-upload-progress.m-t-10(v-show="files.length > 0")
    span.post-img-preloader.m-r-5
      <preloader v-if="totalFilesUploaded < totalFiles"></preloader>
      i.mdi.mdi-check-all.f-s-17(v-show = "totalFilesUploaded == totalFiles")
    span
      | {{getFileUploadProgressText()}}
  input.none(type="file" multiple id="file-image" accept="image/*" data-type="image" @change="filesChange($event.target.name, $event.target.files)")
</template>
<script>
import Service from './service'
import Preloader from './../../../../components/preloader'
export default {
  name: 'ImageUpload',
  service: new Service(),
  components: {
    Preloader
  },
  data () {
    return {
      validImageTypes: ['image/gif', 'image/jpeg', 'image/png'],
      images: [],
      files: [],
      totalFilesUploaded: 0,
      totalFiles: 0
    }
  },
  methods: {
    triggerImageSelect () {
      document.getElementById('file-image').click()
    },
    triggerVideoSelect () {
      document.getElementById('file-video').click()
    },
    filesChange (event, files) {
      console.log(files)
      if (files.length && this.validateImages(files)) {
        this.uploadImages(files)
      } else {
        alert('Please choose valid image files')
      }
    },
    uploadImages (files) {
      this.totalFiles += files.length
      for (let i = 0; i < files.length; i++) {
        let formData = new FormData()
        let that = this
        formData.append('image', files[i])
        this.files.push(files[i])
        this.$options.service.uploadImage(formData)
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
    validateImages (files) {
      let valid = true
      for (let i = 0; i < files.length; i++) {
        if (this.validImageTypes.indexOf(files[i]['type']) === -1) {
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
