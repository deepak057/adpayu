<template lang="pug">
div
  span(id="trigger-post-modal" data-toggle="modal" data-target="#post-modal")
  #post-modal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='myModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title {{options.popupTitle}}
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          <text-status :status="postStatus" @textStatusEntered="getTextStatus" v-if="options.type=='text'"></text-status>
          <ad @adOptionsUpdated="getAdData"></ad>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' id="post-status-buton-close") Close
          button.btn.btn-danger.waves-effect.waves-light(type='button' @click="postShareStatus") {{options.buttonLabel}}
</template>

<script>

import TextStatus from './text-status'
import Ad from './ad'

export default {
  name: 'StatusUpdate',
  components: {
    TextStatus,
    Ad
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      postStatus: '',
      adOptions: {}
    }
  },
  watch: {
    options: {
      handler (val) {
        if (val.showPopup) {
          document.getElementById('trigger-post-modal').click()
        }
      },
      deep: true
    }
  },
  methods: {
    postShareStatus () {
      if (!this.postStatus) {
        return
      }
      var feed = {
        content: this.postStatus,
        imgs: [],
        adOptions: this.adOptions,
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
      this.adOptions = {}
      this.$emit('statusPosted', feed)
      document.getElementById('post-status-buton-close').click()
    },
    getTextStatus (text_) {
      this.postStatus = text_
    },
    getAdData (adOptions) {
      this.adOptions = adOptions
    }
  }
}
</script>

<style>
</style>
