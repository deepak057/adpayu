<template lang="pug">
div
  .modal.fade.bs-example-modal-lg.show.modal-append-to-body.single-post-popup(:id="getModalId()" tabindex='-1', role='dialog', aria-labelledby='myLargeModalLabel')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4#myLargeModalLabel.modal-title Post
          button.close(:id="closeButtonId()" type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          p.text-center.m-t-20(v-show="loader")
            <preloader></preloader>
          <feed :feed="feed" v-show="!loader" @closeModal="hideModal"></feed>
        .modal-footer
          button.btn.btn-danger.waves-effect.text-left(type='button', data-dismiss='modal') Close
      // /.modal-content
      // /.modal-dialog
  span(:id= "getButtonId()" data-toggle='modal', :data-target='getdataTarget()')
</template>
<script>
import Preloader from './preloader'
import Feed from './feed/feed'
import auth from '@/auth/helpers'
import mixin from '../globals/mixin'

export default {
  name: 'PostPopup',
  components: {
    Preloader,
    Feed
  },
  mixins: [mixin],
  data () {
    return {
      loader: true,
      feed: [],
      id: this.getUniqueId()
    }
  },
  methods: {
    triggerPostpopup (postId) {
      this.loader = true
      document.getElementById(this.getButtonId()).click()
      auth.getPost(postId)
        .then((data) => {
          this.loader = false
          // data.showComments = true
          this.feed = [data]
        })
        .catch((postErr) => {
          this.pageLoading = false
          alert('Something went wrong while getting the data, please try again later.')
        })
    },
    getModalId () {
      return 'modal-' + this.id
    },
    getButtonId () {
      return 'button-' + this.id
    },
    getdataTarget () {
      return '#' + this.getModalId()
    },
    closeButtonId () {
      return 'close-modal-' + this.id
    },
    hideModal () {
      document.getElementById(this.closeButtonId()).click()
    }
  }
}
</script>
