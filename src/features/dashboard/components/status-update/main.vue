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
          <question v-if="options.type=='question'" :question="question" @questionsDetailesUpdated="getQuestion"></question>
          <post-tags :tags="tags" @tagsUpdated="getTags"></post-tags>
          <ad @adOptionsUpdated="getAdData" :adOptions= "adOptions"></ad>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' id="post-status-buton-close") Close
          button.btn.btn-danger.waves-effect.waves-light(type='button' @click="postShareStatus") {{options.buttonLabel}}
          div(v-show="preloader")
            <preloader></preloader>
</template>

<script>

import TextStatus from './text-status'
import Question from './question'
import Ad from './ad'
import PostTags from './post-tags'
import Service from './service'
import Preloader from './../../../../components/preloader'

export default {
  name: 'StatusUpdate',
  service: new Service(),
  components: {
    TextStatus,
    Question,
    Ad,
    PostTags,
    Preloader
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
      adOptions: {},
      question: {},
      tags: [],
      preloader: false
    }
  },
  watch: {
    options: {
      handler (val) {
        if (val.showPopup) {
          this.resetData()
          document.getElementById('trigger-post-modal').click()
        }
      },
      deep: true
    }
  },
  methods: {
    validatePost (feed) {
      switch (feed.type) {
        case 'text':
          return feed.content || false
        case 'question':
          return feed.question.question || false
        default:
          return true
      }
    },
    postShareStatus () {
      var feed = {
        type: this.options.type,
        content: this.postStatus,
        tags: this.tags,
        imgs: [],
        adOptions: this.adOptions,
        question: this.question,
        video: false,
        show: true,
        love: {
          total: 0,
          loved: false
        },
        showComments: false,
        comments: []
      }
      if (this.validatePost(feed)) {
        this.preloader = true
        this.$options.service.createPost(feed)
          .then((data) => {
            this.preloader = false
            this.$emit('statusPosted', data)
          })
        this.resetData()
        document.getElementById('post-status-buton-close').click()
      }
    },
    getTextStatus (text_) {
      this.postStatus = text_
    },
    resetData () {
      this.postStatus = ''
      this.adOptions = {}
      this.question = {}
      this.tags = []
    },
    getAdData (adOptions) {
      this.adOptions = adOptions
    },
    getTags (tags) {
      this.tags = tags
    }
  }
}
</script>

<style>
</style>
