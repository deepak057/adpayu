<template lang="pug">
.comment-widgets
  .d-flex.flex-row.comment-row(v-if="comments.length > defaultCommentsCount && enableLoadPreviousComments")
    a(href="javascript:void(0)" @click="showAllComments()")
      | Load Previous comments
  <template v-for="(comment, n) in comments" v-if="isCommentEnabled(n)">
  <single-comment :comment = "comment" :index="n" @deleteComment="deleteComment"/>
  </template>
  .row.m-t-10
    div
      <video-comment :commentType="getCommentType()" @videoUploaded="triggerVideoComment" ref="videoCommentComponent"/>
    .col-11
      <wysiwyg v-model.trim="newCommentText" v-if="isQuestion()" :placeholder="placeholderText()" />
      textarea.form-control.b-0(:placeholder="placeholderText()" v-if="!isQuestion()" v-model.trim="newCommentText" @keydown.enter="leaveComment()")
    .col-1.text-right
      button.btn.btn-info.btn-circle.btn-lg(type='button' @click='leaveComment()')
        i.fa.fa-paper-plane-o.pr-t--3-l--3
      .comment-preloader(v-show="preloader")
        <preloader :option = 2></preloader>
</template>
<script>
import Like from './like'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import Service from './service'
import mixin from '../../globals/mixin.js'
import commentMixin from './comment-mixin.js'
import Preloader from '../preloader'
import auth from '@/auth/helpers'
import VideoComment from './video-comment'
import CommentVideoPlayer from './comment-video-player'
import SingleComment from './single-comment'

function postCommentInitialState () {
  return {
    newCommentText: '',
    preloader: false,
    defaultCommentsCount: 3,
    enableLoadPreviousComments: true,
    currentUser: auth.getUser(),
    videoPath: ''
  }
}

export default {
  name: 'Comments',
  service: new Service(),
  components: {
    Like,
    Preloader,
    VideoComment,
    CommentVideoPlayer,
    SingleComment
  },
  mixins: [mixin, commentMixin],
  props: {
    comments: {
      type: Array,
      required: true
    },
    commentType: {
      type: String,
      required: true
    },
    postId: {
      type: Number,
      required: true
    }
  },
  data () {
    return postCommentInitialState()
  },
  methods: {
    leaveComment () {
      if (this.newCommentText || this.videoPath) {
        this.preloader = true
        let that = this
        this.$options.service.createComment(this.postId, {comment: this.newCommentText, videoPath: this.videoPath})
          .then((data) => {
            that.$set(this.comments, this.comments.length, data.comment)
            this.reset()
          })
          .catch((commentError) => {
            that.preloader = false
            alert('Something went wrong while posting your comment/answer')
          })
      }
    },
    isCommentEnabled (index_) {
      return this.enableLoadPreviousComments ? index_ >= (this.comments.length - this.defaultCommentsCount) : true
    },
    showAllComments () {
      this.enableLoadPreviousComments = false
    },
    deleteComment (index_) {
      if (confirm('Are you sure you want to delete it?')) {
        auth.deleteComment(this.comments[index_].id)
          .then((data) => {
          })
          .catch((commentError) => {
            alert('Something went wrong while deleting the comment')
          })
        this.comments.splice(index_, 1)
      }
    },
    placeholderText () {
      return 'Type your ' + this.getCommentType() + ' here'
    },
    triggerVideoComment (path) {
      this.videoPath = path
      this.leaveComment()
    },
    reset () {
      Object.assign(this.$data, postCommentInitialState())
      this.$refs.videoCommentComponent.reset()
    },
    getVideo (comment) {
      return comment.videoPath
    }
  }
}
</script>
