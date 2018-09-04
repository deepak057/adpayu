<template lang="pug">
div
  #status-update-modal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='myModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Share something new
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          <text-status :status="postStatus" @textStatusEntered="getTextStatus"></text-status>
          | Is this an Ad?
          <toggle-button v-model="postIsAd" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
          .postAdOptions(v-show="postIsAd")
            form.m-t-10
              .row
                .col-md-6
                  .form-group
                    label.control-label CPV
                      i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost Per View" data-toggle="popover" data-placement="right" data-content='This is the amount that viewers will get for watching this in their feed. Min suggested CPV is $.2')
                    input.form-control(v-model="postCPV")
                    small.form-control-feedback Set Cost Per View
                .col-md-6
                  .form-group
                    label.control-label CPC
                      i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost Per Click" data-toggle="popover" data-placement="right" data-content='This is the amount that viewers will get for clicking the target link in your ad. Min suggested CPV is $.8')
                    input.form-control(v-model="postCPC")
                    small.form-control-feedback Set Cost Per Click
                .col-md-12(v-show="postCPC")
                  .form-group
                    label.control-label Target URL
                      i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="The Target URL" data-toggle="popover" data-placement="right" data-content='This is the URL where users will be taken when they click your ad.')
                    input.form-control
                    small.form-control-feedback Enter the Target URL
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' id="post-status-buton-close") Close
          button.btn.btn-danger.waves-effect.waves-light(type='button' @click="postShareStatus") Share
  #ask-question-modal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='myModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Ask your question
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          form
            .form-group
              textarea#message-text.form-control(placeholder="Share your mind")
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal') Close
          button.btn.btn-danger.waves-effect.waves-light(type='button') Save changes
  #pictures-modal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='myModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Post pictures
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          input.dropify(type='file')
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal') Close
          button.btn.btn-danger.waves-effect.waves-light(type='button') Save changes
  #video-modal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='myModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Post a video
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          form
            .form-group
              textarea#message-text.form-control(placeholder="Share your mind")
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal') Close
          button.btn.btn-danger.waves-effect.waves-light(type='button') Save changes
</template>

<script>

import TextStatus from './text-status'

export default {
  name: 'StatusUpdate',
  components: {
    TextStatus
  },
  data () {
    return {
      postIsAd: false,
      postStatus: '',
      postCPV: 0,
      postCPC: 0
    }
  },
  methods: {
    postShareStatus () {
      if (!this.postStatus) {
        return
      }
      var feed = {
        type: this.postCPV ? 'ad' : 'newsFeed',
        content: this.postStatus,
        imgs: [],
        cpv: this.postCPV,
        cpc: this.postCPC,
        video: false,
        show: true,
        love: {
          total: 0,
          loved: false
        },
        showComments: false,
        comments: []
      }
      this.postStatus = ''
      this.postCPV = 0
      this.postCPC = 0
      this.postURL = ''
      this.postIsAd = false
      this.$emit('statusPosted', feed)
      document.getElementById('post-status-buton-close').click()
    },
    getTextStatus (text_) {
      this.postStatus = text_
    }
  }
}
</script>

<style>
</style>
