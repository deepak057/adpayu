<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-backdrop="static" data-keyboard="false")
  .modal.modal-absolute.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-labelledby='postPreviewtModalLabel', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title Ad Preview
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .text-center.m-t-20(v-if="!feedArray.length")
          .feed-preview-wrap
            <feed :feed="feedArray" :preview="preview" v-if="feedArray.length"/>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Edit
          button.btn.btn-danger.waves-effect.waves-light(@click="proceedToPay()")
            | Proceed to Pay
</template>
<script>
import mixin from '../../../../globals/mixin'
import Feed from './../../../../components/feed/feed'
import Service from './service'
import auth from '@/auth/helpers'
// import { router } from '@/http'

export default {
  name: 'PostPreview',
  service: new Service(),
  components: {
    Feed
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      triggerButtonId: 'trigger-post-preview-modal',
      modalId: 'post-preview-modal',
      feedArray: [],
      currentUser: auth.getUser(),
      preview: true,
      amount: '',
      closeButtonId: 'post-preview-payment-buton-close',
      postData: {}
    }
  },
  computed: {
    modalIdHash: {
      get () {
        return '#' + this.modalId
      }
    }
  },
  mounted () {
  },
  methods: {
    previewInit (feed) {
      this.feedArray = []
      this.postData = feed
      this.amount = feed.adOptions.totalAmount
      this.scrollToTop()
      this.triggerPopup()
      this.feedArray.push(this.feedPreviewData(feed))
    },
    triggerPopup () {
      document.getElementById(this.triggerButtonId).click()
    },
    closePopup (closePostPopup = false) {
      document.getElementById(this.closeButtonId).click()
      if (closePostPopup) {
        this.$emit('closePostPopup')
      }
    },
    /*
    * Method to return a fake Feed object simulating
    * an actual Feed object that can be fed to Feed
    * component in order to show the preview
    */
    feedPreviewData (feed) {
      this.$set(feed, 'id', this.getRandomNumber())
      this.$set(feed, 'User', this.currentUser)
      this.$set(feed, 'AdOption', feed.adOptions)
      this.$set(feed, 'Images', feed.images)
      this.$set(feed, 'Question', feed.question)
      this.$set(feed, 'Video', feed.video)
      this.$set(feed, 'Tags', this.getTags(feed.tags))
      this.$set(feed, 'Comments', [])
      this.$set(feed, 'createdAt', (new Date().toString()))
      return feed
    },
    getTags (tags) {
      let tagsArr = []
      if (tags.length) {
        for (let i in tags) {
          tagsArr.push({
            name: tags[i].text,
            id: tags[i].id
          })
        }
      }
      return tagsArr
    },
    proceedToPay () {
      auth.saveLocalPost(this.postData)
      this.closePopup(true)
      /*
      * due to Cashfree payment gateway limited use case
      * we need actually reload the Order page
      * so that it initiate a new payment order.
      * So using window.location instead of router.push
      * Also, generating a delay of a few miliseconds
      * so that redirection takes place after popups have
      * closed out
      */
      setTimeout(function () {
        window.location = '/order'
      }, 500)
      /* router.push({
        name: 'order',
        params: {
          orderId: this.getRandomNumber()
        }
      }) */
    }
  }
}
</script>
