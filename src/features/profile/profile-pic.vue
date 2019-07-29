<template lang="pug">
 .profile-pic-container
   img.profile-pic-image.img-circle.img-zoom-enable(:src='getMedia(user.pic)', alt='Avatar' width='150')
   .profile-pic-overlay(v-if="imageAdmin" :class="{'opacity-8': fileOperationText}")
     .profile-pic-overlay-content
       <template v-if="!fileOperationText">
       a(href="javascript: void(0)" @click="triggerFileSelect")
         i.mdi.mdi-image.m-r-5
         | {{ (user.pic ? 'Change' : 'Upload') }} pic
       br
       a(href="javascript: void(0)" @click="removePic()" v-if="user.pic")
         i.mdi.mdi-delete.m-r-5
         | Remove pic
       </template>
       .operation-in-progress(v-if="fileOperationText")
         <preloader class="m-r-5"></preloader>
         | {{fileOperationText}} ...
     input.none(type="file" id="profile-pic-file-upload" accept="image/*" data-type="image" @change="filesChange($event.target.name, $event.target.files)")
     <crop-pic ref="picCropComponent" @ImageCropped="getCroppedImage"/>
</template>
<script>
import Service from './service'
import mixin from '../../globals/mixin.js'
import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import CropPic from './pic-crop'

export default {
  name: 'ProfilePicture',
  service: new Service(),
  components: {
    Preloader,
    CropPic
  },
  mixins: [mixin],
  props: {
    imageAdmin: {
      type: Boolean,
      default () {
        return false
      }
    },
    profileUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fileOperationText: '',
      user: this.profileUser,
      fileName: '',
      currentUser: auth.getUser()
    }
  },
  watch: {
    profileUser (profileUser) {
      this.user = profileUser
    },
    '$store.state.auth.user' (user) {
      // this check is to prevent the User profile pic and name from changing to current user's
      // when the page title is collapsed or expanded by current user
      // as updating the page title updates the user state which affacts the profile page
      if (this.user.id !== this.currentUser.id && user.id === this.currentUser.id) {
      } else {
        this.user = user
      }
    }
  },
  methods: {
    triggerFileSelect () {
      let elem = document.getElementById('profile-pic-file-upload')
      elem.value = ''
      elem.click()
    },
    filesChange (event, files) {
      if (!this.validImageFile(files[0])) {
        alert('Please choose a valid image file')
      } else {
        this.fileName = files[0].name
        this.$refs.picCropComponent.trigger(files[0])
      }
    },
    getCroppedImage (imageBlob) {
      this.uploadImage(imageBlob)
    },
    uploadImage (file) {
      let formData = new FormData()
      formData.append('image', file, this.fileName)
      this.fileOperationText = 'Uploading file'
      this.$options.service.uploadProfilePic(formData)
        .then((data) => {
          this.fileOperationText = false
          this.user.pic = data.user.pic
          this.showNotification('Profile picture updated successfully.', 'success')
          auth.updateUserState(data.user)
        })
        .catch((imageErr) => {
          this.fileOperationText = false
          alert('Something went wrong while uploading the image')
        })
    },
    removePic () {
      if (confirm('Remove profile picture?')) {
        this.fileOperationText = 'Removing'
        this.user.pic = ''
        this.$options.service.updateUser(this.user)
          .then((data) => {
            this.fileOperationText = false
          })
          .catch((imageErr) => {
            this.fileOperationText = false
            alert('Something went wrong while deleting the image')
          })
      }
    }
  }
}
</script>
