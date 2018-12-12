<template lang="pug">
div
  .modal.fade.bs-example-modal-lg.show.modal-append-to-body.single-post-popup(tabindex='-1', role='dialog', aria-labelledby='myLargeModalLabel')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4#myLargeModalLabel.modal-title Post
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          p.text-center.m-t-20(v-show="loader")
            <preloader></preloader>
          <feed :feed="feed" v-show="!loader"></feed>
        .modal-footer
          button.btn.btn-danger.waves-effect.text-left(type='button', data-dismiss='modal') Close
      // /.modal-content
      // /.modal-dialog
  span(id= "triggerPostpopup" data-toggle='modal', data-target='.bs-example-modal-lg')
</template>
<script>
import Service from './service'
import Preloader from './preloader'
import Feed from './feed/feed'

export default {
  name: 'PostPopup',
  service: new Service(),
  components: {
    Preloader,
    Feed
  },
  data () {
    return {
      loader: true,
      feed: []
    }
  },
  methods: {
    triggerPostpopup (postId) {
      this.loader = true
      document.getElementById('triggerPostpopup').click()
      this.$options.service.getPost(postId)
        .then((data) => {
          this.loader = false
          // data.showComments = true
          this.feed = [data]
        })
        .catch((postErr) => {
          this.pageLoading = false
          alert('Something went wrong while getting the data, please try again later.')
        })
    }
  }
}
</script>
