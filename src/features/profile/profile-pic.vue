<template lang="pug">
 .profile-pic-container
   img.profile-pic-image.img-circle(:src='getMedia(user.pic)', alt='Avatar' width='150')
   .profile-pic-overlay(v-if="imageAdmin" :class="{'opacity-8': fileOperationText}")
     .profile-pic-overlay-content
       <template v-if="!fileOperationText">
       a(href="javascript: void(0)" @click="triggerFileSelect")
         i.mdi.mdi-image.m-r-5
         | Upload pic
       br
       a(href="javascript: void(0)" @click="removePic()")
         i.mdi.mdi-delete.m-r-5
         | Remove pic
       </template>
       .operation-in-progress(v-if="fileOperationText")
         <preloader class="m-r-5"></preloader>
         | {{fileOperationText}} ...
     input.none(type="file" id="profile-pic-file-upload" accept="image/*" data-type="image" @change="filesChange($event.target.name, $event.target.files)")
</template>
<script>
import Service from './service'
import mixin from '../../globals/mixin.js'
import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'

export default {
  name: 'ProfilePicture',
  service: new Service(),
  components: {
    Preloader
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
      user: this.profileUser
    }
  },
  watch: {
    profileUser (profileUser) {
      this.user = profileUser
    },
    '$store.state.auth.user' (user) {
      this.user = user
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
      let formData = new FormData()
      formData.append('image', file)
      this.fileOperationText = 'Uploading file'
      this.$options.service.uploadProfilePic(formData)
        .then((data) => {
          this.fileOperationText = false
          this.user.pic = data.user.pic
          auth.updateUserState(data.user)
        })
        .catch((imageErr) => {
          this.fileOperationText = false
          alert('Something went wrong while uploading the image')
        })
    },
    removePic () {
      if (confirm('Remove profile pcture?')) {
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
