<template lang="pug">
.comment-widgets
  .text-center.m-t-10(v-if="pageLoader")
    <preloader class="preloader-h-20"/>
  <template v-if="!pageLoader">
  .row.comment-row.m-0.no-border.p-l-0.p-b-0(v-if="comments.length > defaultCommentsCount && enableLoadPreviousComments && !userFeed")
    a(href="javascript:void(0)" @click="showAllComments()" class="m-t-10")
      | Show all {{getCommentType()}}s
  <template v-for="(comment, n) in comments" v-if="isCommentEnabled(n)">
  <single-comment :class="{'hide-comment-user-name': enableLoadPreviousComments && isCommentEnabled(n) && userFeed && getCommentType() === 'answer', 'comment-divider': n < (comments.length -1 )}" :comment = "comment" :index="n" @deleteComment="deleteComment" :commentType = "commentType"/>
  </template>
  .row.comment-row.m-0.no-border.p-l-0.show-all-comments-wrap(v-if="comments.length > defaultCommentsCount && enableLoadPreviousComments && userFeed")
    a(href="javascript:void(0)" @click="showAllComments()" class="m-t-10")
      | Show more {{getCommentType()}}s
  //.row.m-t-10.enable-commenting-wrap(v-if="comments.length && !commentsEnabled")
    button.btn.btn-info.btn-circle.btn-sm.m-l-20(type='button' @click="enableComments()" :title="'Add your ' + getCommentType()")
        i.fa.fa-plus
  .row.m-t-10.leave-comment-wrap
    div
      <video-comment :commentType="getCommentType()" @videoUploaded="triggerVideoComment" ref="videoCommentComponent" @OnPlayerPlay="onVideoPlay"/>
    .col-11
      //<wysiwyg v-model.trim="newCommentText" v-if="isQuestion()" :placeholder="placeholderText()" />
      <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model.trim="newCommentText" v-if="isQuestion()" :placeholder="placeholderText()"></vue-editor>
      textarea.form-control.b-0.bg-none(:placeholder="placeholderText()" v-if="!isQuestion()" v-model.trim="newCommentText" @keydown.enter="leaveComment()")
    .col-1.text-right
      button.btn.btn-info.btn-circle.btn-lg.make-comment-btn(type='button' @click='leaveComment()')
        i.fa.fa-paper-plane-o.pr-t--3-l--3
      .comment-preloader(v-show="preloader")
        <preloader :option = 2></preloader>
  </template>
</template>
<script>
import Like from './like'
// import 'vue-wysiwyg/dist/vueWysiwyg.css'
import Service from './service'
import mixin from '../../globals/mixin.js'
import commentMixin from './comment-mixin.js'
import Preloader from '../preloader'
import auth from '@/auth/helpers'
import VideoComment from './video-comment'
import CommentVideoPlayer from './comment-video-player'
import SingleComment from './single-comment'
import { VueEditor } from 'vue2-editor'

function postCommentInitialState () {
  return {
    newCommentText: '',
    preloader: false,
    defaultCommentsCount: 3,
    enableLoadPreviousComments: true,
    currentUser: auth.getUser(),
    videoPath: '',
    comments: [],
    pageLoader: true,
    commentsEnabled: false,
    defaultCommentIndex: 0
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
    SingleComment,
    VueEditor
  },
  mixins: [mixin, commentMixin],
  props: {
    commentType: {
      type: String,
      required: true
    },
    postId: {
      type: Number,
      required: true
    },
    userFeed: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return postCommentInitialState()
  },
  mounted () {
    if (this.getCommentType() === 'answer' && this.userFeed) {
      this.defaultCommentsCount = 1
    }
    this.loadComments()
  },
  methods: {
    enableComments () {
      this.commentsEnabled = !this.commentsEnabled
    },
    isCommentEnabled (index_) {
      return this.enableLoadPreviousComments ? (this.userFeed ? index_ === this.defaultCommentIndex : index_ >= (this.comments.length - this.defaultCommentsCount)) : true
    },
    loadComments () {
      this.$options.service.loadComments(this.postId)
        .then((d) => {
          this.pageLoader = false
          this.comments = this.updateDefaultCommentIndex(d.comments)
          this.updateCommentCount()
        })
        .catch((cErr) => {
          this.showNotification('Something went wrong while fetching the comments/answers', 'error')
        })
    },
    leaveComment () {
      if (this.newCommentText || this.videoPath) {
        this.preloader = true
        let that = this
        this.$options.service.createComment(this.postId, {comment: this.newCommentText, videoPath: this.videoPath})
          .then((data) => {
            that.$set(this.comments, this.comments.length, data.comment)
            this.updateCommentCount('add')
            this.reset()
          })
          .catch((commentError) => {
            that.preloader = false
            alert('Something went wrong while posting your comment/answer')
          })
      }
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
        this.updateCommentCount('delete')
      }
    },
    placeholderText () {
      return 'Type text ' + this.getCommentType() + ' here'
    },
    triggerVideoComment (path) {
      this.videoPath = path
      this.leaveComment()
    },
    reset () {
      // Object.assign(this.$data, postCommentInitialState())
      this.newCommentText = ''
      this.videoPath = ''
      this.preloader = false
      this.$refs.videoCommentComponent.reset()
    },
    getVideo (comment) {
      return comment.videoPath
    },
    updateCommentCount (action) {
      let count = this.comments.length
      /* if (action === 'add') {
        count = this.comments.length + 1
      } else if (action === 'delete') {
        count = this.comments.length > 0 ? this.comments.length - 1 : 0
      } else {
        count = this.comments.length
      } */
      this.$emit('CommentsCountUpdated', {postId: this.postId, count: count})
      return count
    },
    /*
    ** This method determines and sets the index of the
    ** comment in Comments array that will be
    ** shown as default comment in User Feed
    ** It shows the default comment index as
    ** the index of the comment having highest
    ** number of likes
    */
    updateDefaultCommentIndex (comments) {
      if (this.userFeed && comments.length && comments.length > 1) {
        let sortedArr = this.copyObject(comments)
        let unviewedFound = false
        let getIndexInOriginalArrayByCommentId = function (commentId) {
          for (let i in comments) {
            if (comments[i].id === commentId) {
              return parseInt(i)
            }
          }
        }
        sortedArr.sort((a, b) => {
          return a.CommentsLikesCount - b.CommentsLikesCount
        })
        for (let i = (sortedArr.length - 1); i >= 0; i--) {
          if (!sortedArr[i].HasViewed) {
            this.defaultCommentIndex = getIndexInOriginalArrayByCommentId(sortedArr[i].id)
            unviewedFound = true
            break
          }
        }
        if (!unviewedFound) {
          this.defaultCommentIndex = getIndexInOriginalArrayByCommentId(sortedArr[(sortedArr.length - 1)].id)
        }
      }
      return comments
    }
  }
}
</script>
