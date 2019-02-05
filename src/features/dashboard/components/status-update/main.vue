<template lang="pug">
div
  span(id="trigger-post-modal" data-toggle="modal" data-target="#post-modal" data-backdrop="static" data-keyboard="false")
  #post-modal.modal.fade.modal-absolute(tabindex='-1', role='dialog', aria-labelledby='myModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title {{options.popupTitle}}
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          <text-status :status="postStatus" @textStatusEntered="getTextStatus" v-if="options.type=='text'"></text-status>
          <question v-if="options.type==='question'" :question="question" @questionsDetailesUpdated="getQuestion"></question>
          <pictures v-if="options.type==='picture'"></pictures>
          <video-upload v-if="options.type ==='video'" :video="video" ref="videoUpload" @videoDetailsUpdated="getVideo"></video-upload>
          <post-tags :tags="tags" @tagsUpdated="getTags"></post-tags>
          <image-upload v-if="options.type!=='video'" :images="images" @imagesUpdated="getImages"></image-upload>
          <video-file-upload v-if="options.type==='video'" ref="videoFileUploadComp" @videoUploaded="setVideoPath"></video-file-upload>
          div(v-show="!enableMoreOptions")
            a.text-small.text-muted.f-s-12(href="javascript:void(0)" @click="showMoreOptions()")
              | More Options
              i.fa.fa-angle-right.m-l-5
          <ad ref="ad" v-show= "enableMoreOptions" @adOptionsUpdated="getAdData" :adType="options.type" @PrivacyUpdated="PrivacyUpdated"></ad>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' id="post-status-buton-close") Close
          button.btn.btn-danger.waves-effect.waves-light(type='button' @click="postShareStatus") {{options.buttonLabel}}
          div(v-show="preloader")
            <preloader></preloader>
  <post-preview ref="postPreviewComponent"/>
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
import PostPreview from './post-preview'
import mixin from '../../../../globals/mixin'

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
    VideoFileUpload,
    PostPreview
  },
  mixins: [mixin],
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
      resetImages: false,
      preloader: false,
      enableMoreOptions: false,
      public: false
    }
  },
  watch: {
    options: {
      handler (val) {
        if (val.showPopup) {
          this.resetData()
          this.public = this.getDefaultPrivacy()
          document.getElementById('trigger-post-modal').click()
        }
      },
      deep: true
    }
  },
  mounted () {
  },
  methods: {
    validatePost (feed) {
      return this.validateRequiredFields(feed) && this.validateAd(feed)
    },
    validateAd (feed) {
      return !feed.adOptions.postIsAd || (feed.adOptions.postIsAd && feed.adOptions.isValidated)
    },
    validateRequiredFields (feed) {
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
        public: this.public,
        love: {
          total: 0,
          loved: false
        },
        showComments: false,
        comments: []
      }
      if (this.validatePost(feed)) {
        /* check if this post is an
        ** ad and if so, prompt the
        ** user for payment
        */
        if (this.checkforPayment(feed)) {
          return
        }
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
    checkforPayment (feed) {
      if (feed.adOptions.postIsAd && feed.adOptions.totalAmount) {
        this.scrollToTop()
        this.$refs.postPreviewComponent.previewInit(feed)
        return true
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
      this.enableMoreOptions = false
      this.public = false
      this.$refs.ad.reset()
      if (this.$refs.videoFileUploadComp) {
        this.$refs.videoFileUploadComp.reset()
      }
    },
    getAdData (adOptions) {
      this.adOptions = adOptions
    },
    getTags (tags) {
      this.tags = tags
    },
    getImages (images) {
      // this.images.push(images)
    },
    setVideoPath (path) {
      this.$refs.videoUpload.setVideoPath(path)
    },
    getQuestion (questionObj) {
      this.question = questionObj
    },
    getVideo (videoObj) {
      this.video = videoObj
    },
    showMoreOptions () {
      this.enableMoreOptions = !this.enableMoreOptions
      if (this.enableMoreOptions) {
        // set Post Privacy to public if the post being created
        // is a video or questions
        this.$refs.ad.setDefaultPrivacy(this.getDefaultPrivacy())
      }
    },
    PrivacyUpdated (newV) {
      this.public = newV
    },
    getDefaultPrivacy (options) {
      // let opt = options | this.options
      return Boolean(this.options.type === 'question' || this.options.type === 'video')
    }
  }
}
</script>

<style>
</style>
