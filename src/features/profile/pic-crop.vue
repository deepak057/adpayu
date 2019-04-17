<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" data-backdrop="static" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Crop Profile Picture
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .text-center
            <vue-cropper ref='cropper' :guides="true" :view-mode="2" drag-mode="crop" :auto-crop-area="0.5" :min-container-width="250" :min-container-height="180" :background="true" :rotatable="true" :src="imgSrc" alt="Source Image" :aspectRatio="1/1" :img-style="{ 'width': '400px', 'height': '300px' }">
            </vue-cropper>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Cancel
          button.btn.btn-danger.waves-effect(type='button' @click="cropImage()") Save
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from './../../components/preloader'
import VueCropper from 'vue-cropperjs'

export default {
  name: 'CropPic',
  components: {
    Preloader,
    VueCropper
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-pic-crop-modal-',
      imgSrc: '',
      croppedImage: ''
    }
  },
  computed: {
    modalIdHash: {
      get () {
        return '#' + this.modalId
      }
    },
    triggerButtonId: {
      get () {
        return this.id + '-trigger-modal'
      }
    },
    modalId: {
      get () {
        return this.id + '-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-modal-buton-close'
      }
    }
  },
  watch: {
  },
  methods: {
    reset () {
      this.imgSrc = ''
      this.croppedImage = ''
    },
    trigger (file) {
      this.reset()
      document.getElementById(this.triggerButtonId).click()
      const reader = new FileReader()
      reader.onload = (event) => {
        this.imgSrc = event.target.result
        // rebuild cropperjs with the updated source
        this.$refs.cropper.replace(event.target.result)
      }
      reader.readAsDataURL(file)
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    cropImage () {
      let that = this
      this.croppedImage = this.$refs.cropper.getCroppedCanvas().toBlob(function (blob) {
        that.closePopup()
        that.$emit('ImageCropped', blob)
      })
    }
  }
}
</script>
