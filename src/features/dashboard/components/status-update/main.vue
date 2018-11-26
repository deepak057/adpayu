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
          <pictures v-if="options.type=='picture'"></pictures>
          <video-upload v-if="options.type =='video'" :video="video" ref="videoUpload" @videoDetailsUpdated="getVideo"></video-upload>
          <post-tags :tags="tags" @tagsUpdated="getTags"></post-tags>
          <image-upload v-if="options.type!='video'" :images="images" @imagesUpdated="getImages"></image-upload>
          <video-file-upload v-if="options.type=='video'" :path="videoPath" @videoUploaded="setVideoPath"></video-file-upload>
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
import Pictures from './pictures'
import VideoUpload from './video'
import Ad from './ad'
import PostTags from './post-tags'
import ImageUpload from './image-upload'
import VideoFileUpload from './video-file-upload'
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
    Preloader,
    Pictures,
    ImageUpload,
    VideoUpload,
    VideoFileUpload
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
      images: [],
      video: {},
      videoPath: '',
      resetImages: false,
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
          return (feed.video.title && feed.video.path) || false
      }
    },
    postShareStatus () {
      var feed = {
        type: this.options.type,
        content: this.postStatus,
        tags: this.tags,
        images: this.images,
        adOptions: this.adOptions,
        question: this.question,
        video: this.video,
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
      this.images = []
      this.video = {}
      this.videoPath = ''
    },
    getAdData (adOptions) {
      this.adOptions = adOptions
    },
    getTags (tags) {
      this.tags = tags
    },
    getImages (images) {
      this.images.push(images)
    },
    setVideoPath (path) {
      this.$refs.videoUpload.setVideoPath(path)
    },
    getQuestion (questionObj) {
      this.question = questionObj
    },
    getVideo (videoObj) {
      this.video = videoObj
    }
  }
}
</script>

<style>
</style>
