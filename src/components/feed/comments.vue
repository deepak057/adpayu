<template lang="pug">
.comment-widgets
  .d-flex.flex-row.comment-row(v-if="comments.length > defaultCommentsCount && enableLoadPreviousComments")
    a(href="javascript:void(0)" @click="showAllComments()")
      | Load Previous comments
  .d-flex.flex-row.comment-row(v-for="(comment, n) in comments" v-if="isCommentEnabled(n)")
    .p-2
      <router-link @click.native = "leavePage()" :to="userProfileLink(comment.User.id)">
        span.round
          img(:src='getMedia(comment.User.pic)', alt='user', width='50')
      </router-link>
    .comment-text.w-100
      h5
        <router-link @click.native = "leavePage()" :to="userProfileLink(comment.User.id)">
          | {{userName(comment.User)}}
        </router-link>
      .m-b-5(v-if="!isQuestion()")
        <template v-if="comment.comment">
        | {{comment.comment}}
        </template>
      <template v-if="getVideo(comment)">
      .row
        .col-lg-5.col-md-5.comments.video-container
          <comment-video-player :videoPath="comment.videoPath"/>
      </template>
      div.m-b-5(v-html="comment.comment" v-if="isQuestion()")
      .comment-footer(:class="{'m-t-10': getVideo(comment)}")
        span.text-muted.pull-right.comment-datetimestamp.m-l-5
          <timeago :datetime="comment.createdAt" :auto-update="60" :title="comment.createdAt | date"></timeago>
        span.action-icons.visible
          //a(href='javascript:void(0)')
            //i.ti-pencil-alt
          a.m-r-10(href='javascript:void(0)' @click='deleteComment(n)' title="Delete this comment" v-if="isOwner(comment.User.id)")
            i.ti-trash
          <like :likes="comment.Likes" :commentId="comment.id"></like>
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
import Preloader from '../preloader'
import auth from '@/auth/helpers'
import VideoComment from './video-comment'
import CommentVideoPlayer from './comment-video-player'

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
    CommentVideoPlayer
  },
  mixins: [mixin],
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
      if (confirm('Delete comment?')) {
        this.$options.service.deleteComment(this.postId, this.comments[index_])
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
    getCommentType () {
      return this.isQuestion() ? 'answer' : 'comment'
    },
    isQuestion () {
      return this.commentType === 'question' || false
    },
    isOwner (commentUserId) {
      return this.currentUser.id === commentUserId
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
