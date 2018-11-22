<template lang="pug">
.form-group.post-upload-media-wrap
  span.m-r-10(@click="triggerImageSelect")
    i.mdi.mdi.mdi-image.f-s-20
    |  Add images
  span(@click="triggerVideoSelect")
    i.mdi.mdi.mdi-video.f-s-20
    |  Add video
  input.none(type="file" multiple id="file-image" accept="image/*" data-type="image" @change="filesChange($event.target.name, $event.target.files)")
  input.none(type="file" id="file-video")
</template>
<script>
import Service from './service'
export default {
  name: 'MediaUpload',
  service: new Service(),
  data () {
    return {
      validImageTypes: ['image/gif', 'image/jpeg', 'image/png'],
      images: []
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
      for (let i = 0; i < files.length; i++) {
        let formData = new FormData()
        let that = this
        formData.append('image', files[i])
        this.$options.service.uploadImages(formData)
          .then((data) => {
            that.images.push(data)
            that.$emit('imagesUpdated', data)
          })
          .catch((imgErr) => {
            alert('Something went wrong while uploading the images')
          })
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
    }
  }
}
</script>
