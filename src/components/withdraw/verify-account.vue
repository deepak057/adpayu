<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false" data-backdrop="static")
  .modal.modal-append-to-body.topmost-modal.verify-account-popup(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Verify Your Indentity
            i.mdi.mdi-information-outline.cursor-hand.m-l-5(data-container="body" title="Identity Verification" data-toggle="popover" data-placement="right" data-content="To prevent people from abusing the system by creating multiple fake accounts for withdrawing the money, we require you to confirm your identity to prove that yours is a genuine account.")
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          p
            | Please upload any document that verifies your identity. You can upload an image of your ID, Passport, Driving license, Aadhaar card, PAN card etc.
          p
            | Once your identity is verified, you'd be able to withdraw money instantly to your Bank, Paytm or other accounts.
          .text-center
            p
              button.btn.btn-info.btn-lg.m-t-10(@click="triggerFileSelection()")
                | Upload*
              input.none(type="file" @change="filesChange($event.target.name, $event.target.files)" :id="fileInputId" multiple :accept="validFileTypesString()")
            p.m-b-0
              span(v-if="!data.uploadInProgress")
                | (Max {{data.maxFileSize}} MB)
              span.upload-progress(v-if="data.uploadInProgress")
                <preloader class="m-r-5"/>
                | {{uploadProgressText()}}
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
// import auth from '@/auth/helpers'
import Service from './service'

function verifyAccountInitialState () {
  return {
    pageLoader: true,
    maxFileCount: 2,
    maxFileSize: 5,
    uploadInProgress: false,
    filesCount: 0,
    uploadPercentage: 0,
    allowedFileTypes: ['application/pdf', 'image/x-eps']
  }
}

export default {
  name: 'VerifyAccount',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      id: this.getUniqueId() + '-verify-account-modal-',
      fileInputId: this.getUniqueId() + 'doc-identity-file',
      data: verifyAccountInitialState()
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
    triggerPopup () {
      this.reset()
      document.getElementById(this.triggerButtonId).click()
    },
    reset () {
      this.data = verifyAccountInitialState()
    },
    triggerFileSelection () {
      if (!this.data.uploadInProgress) {
        document.getElementById(this.fileInputId).click()
      }
    },
    validateFilesType (files) {
      let valid = true
      let validFileTypes = this.validFileTypes()
      for (let i = 0; i < files.length; i++) {
        if (validFileTypes.indexOf(files[i]['type']) === -1) {
          valid = false
        }
      }
      return valid
    },
    validateFileSize (files) {
      let valid = true
      for (let i in files) {
        if ((files[i].size / Math.pow(1024, 2)) > this.data.maxFileSize) {
          valid = false
        }
      }
      return valid
    },
    filesChange (e, files) {
      if (files.length) {
        if (files.length > this.data.maxFileCount) {
          alert('Sorry, you can not upload more than ' + this.data.maxFileCount + ' files.')
        } else if (!this.validateFilesType(files)) {
          alert('Please upload valid image or PDF files.')
        } else if (!this.validateFileSize(files)) {
          alert('Sorry, each file must be smaller than ' + this.data.maxFileSize + ' MB in size.')
        } else {
          this.uploadFiles(files)
        }
      }
    },
    uploadFiles (files) {
      this.data.filesCount = files.length
      this.data.uploadInProgress = true
      let formData = new FormData()
      for (let i in files) {
        formData.append('files[]', files[i])
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function (progressEvent) {
          this.data.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }.bind(this)
      }
      this.$options.service.uploadAccountIdentityDocs(formData, config)
        .then((data) => {
        })
    },
    validFileTypes () {
      return this.getValidImageTypes().concat(this.data.allowedFileTypes)
    },
    validFileTypesString () {
      return this.validFileTypes().join(',')
    },
    uploadProgressText () {
      let text = 'Uploading file'
      return text + (this.data.filesCount > 1 ? 's' : '') + '...' + this.data.uploadPercentage + '%'
    }
  }
}
</script>
