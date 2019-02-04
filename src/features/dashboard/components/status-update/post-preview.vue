<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-backdrop="static" data-keyboard="false")
  .modal.modal-absolute.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-labelledby='postPreviewtModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Ad Preview
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .feed-preview-wrap
            <feed :feed="feedArray"/>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' id="post-status-payment-buton-close") Edit
          button.btn.btn-danger.waves-effect.waves-light(type='button') Proceed to Pay
</template>
<script>
import mixin from '../../../../globals/mixin'
import Feed from './../../../../components/feed/feed'
import Service from './service'
import auth from '@/auth/helpers'

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
      currentUser: auth.getUser()
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
      this.triggerPopup()
      this.feedArray.push(this.feedPreviewData(feed))
    },
    triggerPopup () {
      document.getElementById(this.triggerButtonId).click()
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
      this.$set(feed, 'Tags', feed.tags)
      this.$set(feed, 'Comments', [])
      this.$set(feed, 'createdAt', (new Date().toString()))
      return feed
    }
  }
}
</script>
