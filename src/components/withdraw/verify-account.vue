<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false" data-backdrop="static")
  .modal.modal-append-to-body.topmost-modal.verify-account-popup(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | KYC - Verify Your Indentity
            i.mdi.mdi-information-outline.cursor-hand.m-l-5(data-container="body" title="Why this KYC is needed?" data-toggle="popover" data-placement="right" data-content="To prevent people from abusing the system by creating multiple fake accounts for withdrawing the money, we require you to confirm your identity to prove that yours is a genuine account.")
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          <template v-if="data.loader">
          .text-center.m-t-20
            <preloader />
          </template>
          <template v-if="!data.loader">
          <template v-if="!isAccountStatusPending()">
          ul
            li.m-b-10
              | Please upload any
              strong
                |  document
              |  that verifies your identity.
            li.m-b-10
              | You can upload images of your ID, Passport, Driving license, Aadhaar card, PAN card etc.
            li.m-b-10
              | After successfull KYC, you'd be able to withdraw money instantly to your Bank, Paytm or other accounts.
          .text-center
            p
              button.btn.btn-info.btn-lg.m-t-10(@click="triggerFileSelection()")
                | Upload*
              input.none(type="file" @change="filesChange($event.target.name, $event.target.files)" :id="fileInputId" multiple :accept="validFileTypesString()")
              span.badge.badge-warning.p-a.d-inline.m-l-5.pointer.m-t-10( v-if = "data.CBKYC" data-container="body" title="Win Cashback" data-toggle="popover"  data-html="true" :data-content="cashbackPopoverDetails()")
                span(v-html="'+ ' + showAmount(data.CBKYC, false, true)")
                i.mdi.mdi-information.m-l-4
            p.m-b-0
              span(v-if="!data.uploadInProgress")
                | (Max {{data.maxFileSize}} MB)
              span.upload-progress(v-if="data.uploadInProgress")
                <preloader class="m-r-5"/>
                | {{uploadProgressText()}}
            .m-t-20(v-if="data.CBKYC")
              .alert.alert-warning
                h4
                  | You will get cashback of
                  span.m-l-5.m-r-5(v-html = "showAmount(data.CBKYC)")
                  | for completing your KYC
              a.m-t-10(href="javascript:void(0)" data-container="body" title="Why this KYC is needed?" data-toggle="popover" data-placement="right" data-content="To prevent people from abusing the system by creating multiple fake accounts for withdrawing the money, we require you to confirm your identity to prove that yours is a genuine account.")
                | Why this KYC is needed?
          </template>
          <template v-if= "isAccountStatusPending()">
          .text-center
            p
              h3.text-info
                i.mdi.mdi-check-circle.m-r-2
                | Thank you for uploading your documents.
            p
              | Your documents are currently under review. You will get an email and a notification from us as soon as the review is completed.
            .alert.alert-info.small
              | Note - We will also try to reach you through your registered email address during the review process if needed.
          </template>
          </template>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import auth from '@/auth/helpers'
import Service from './service'

function verifyAccountInitialState () {
  return {
    pageLoader: true,
    loader: false,
    maxFileCount: 2,
    maxFileSize: 5,
    uploadInProgress: false,
    filesCount: 0,
    uploadPercentage: 0,
    allowedFileTypes: ['application/pdf', 'image/x-eps'],
    success: false,
    currentUser: auth.getUser(),
    CBKYC: false
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
      this.getCashbackPrice()
      document.getElementById(this.triggerButtonId).click()
    },
    cashbackPopoverDetails () {
      return 'Get cashback of ' + this.showAmount(this.data.CBKYC) + ' for completing your KYC.'
    },
    isAccountStatusUnverified () {
      return this.data.currentUser.accountStatus === 'unverified'
    },
    getCashbackPrice () {
      if (this.isAccountStatusUnverified()) {
        this.data.loader = true
        auth.getWithdrawlStats()
          .then((d) => {
            this.data.loader = false
            if (d.stats.cashBack.KYC.enable) {
              this.data.CBKYC = d.stats.cashBack.KYC.priceUSD
            }
          })
          .catch((vErr) => {
            this.showNotification('Something went wrong', 'error')
          })
      }
    },
    isAccountStatusPending () {
      return this.data.currentUser.accountStatus === 'pending'
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
        formData.append('files_' + i, files[i])
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
          if (data.success) {
            this.data.success = 'Thanks. We will get back to you.'
            this.data.currentUser.accountStatus = data.user.accountStatus
            auth.updateCurrentUser(data.user)
          } else {
            this.notification('Something went wrong, please try again later.', 'error')
          }
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
