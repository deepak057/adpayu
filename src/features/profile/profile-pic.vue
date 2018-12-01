<template lang="pug">
 .profile-pic-container
   img.profile-pic-image.img-circle(:src='getMedia(user.pic)', alt='Avatar' width='150')
   .profile-pic-overlay(v-if="imageAdmin")
     .profile-pic-overlay-content
       a(href="javascript: void(0)" @click="triggerFileSelect")
         i.mdi.mdi-image.m-r-5
         | Upload pic
       br
       a(href="javascript: void(0)")
         i.mdi.mdi-delete.m-r-5
         | Remove pic
     input.none(type="file" id="profile-pic-file-upload" accept="image/*" data-type="image" @change="filesChange($event.target.name, $event.target.files)")
</template>
<script>
import Service from './service'
import mixin from '../../globals/mixin.js'
import store from '@/store'

export default {
  name: 'ProfilePicture',
  service: new Service(),
  mixins: [mixin],
  props: {
    imageAdmin: {
      type: Boolean,
      default () {
        return false
      }
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    triggerFileSelect () {
      document.getElementById('profile-pic-file-upload').click()
    },
    filesChange (event, files) {
      if (!this.validImageFile(files[0])) {
        alert('Please choose a valid image file')
      } else {
        this.uploadImage(files[0])
      }
    },
    uploadImage (file) {
      let that = this
      let formData = new FormData()
      formData.append('image', file)
      this.$options.service.uploadProfilePic(formData)
        .then((data) => {
          that.user = data.user
          store.state.auth.user = data.user
          store.dispatch('auth/update', store.state.auth)
        })
        .catch((imageErr) => {
          alert('Something went wrong while uploading the image')
        })
    }
  }
}
</script>
