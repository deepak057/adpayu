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
          button.btn.btn-danger.waves-effect.waves-light(type='button' @click="paymentInit()") Proceed to Pay
  <ad-payment ref="adPaymentComponent"/>
</template>
<script>
import mixin from '../../../../globals/mixin'
import Feed from './../../../../components/feed/feed'
import Service from './service'
import auth from '@/auth/helpers'
import AdPayment from './ad-payment'

export default {
  name: 'PostPreview',
  service: new Service(),
  components: {
    Feed,
    AdPayment
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
      closeButtonId: 'post-preview-payment-buton-close'
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
      this.amount = feed.adOptions.totalAmount
      this.scrollToTop()
      this.triggerPopup()
      this.feedArray.push(this.feedPreviewData(feed))
    },
    triggerPopup () {
      document.getElementById(this.triggerButtonId).click()
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
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
    paymentInit () {
      this.closePopup()
      this.$refs.adPaymentComponent.paymentInit(this.amount)
    }
  }
}
</script>
