<template lang="pug">
.comment-widgets(v-if="isQuestion()")
  .text-center.m-t-10(v-if="pageLoader")
    <preloader class="preloader-h-20"/>
  <template v-if="!pageLoader">
  .row.comment-row.m-0.no-border.p-l-0.p-b-0(v-if="comments.length > defaultCommentsCount && enableLoadPreviousComments && !userFeed && (feedPage !=='profile' || !postHasDefaultComment())")
    a(href="javascript:void(0)" @click="showAllComments()" :class="{'m-t-20 m-b-10': isMobile(), 'm-t-10': !isMobile()}" )
      | Show all {{getCommentType()}}s
  <template v-for="(comment, n) in comments" v-if="isCommentEnabled(n, comment)">
  <single-comment :key="comment.id" :triggerPopupView = "triggerPopupView" @CommentVideoPlayed = "CommentVideoPlayed" :autoReplay= "autoReplay" :class="{'hide-comment-user-name': enableLoadPreviousComments && isCommentEnabled(n, comment) && manipulativePage() && getCommentType() === 'answer', 'comment-divider': n < (comments.length -1 )}" :comment = "comment" :index="n" @deleteComment="deleteComment" :commentType = "commentType"/>
  </template>
  .row.comment-row.m-0.no-border.p-l-0.show-all-comments-wrap(v-if="comments.length > defaultCommentsCount && enableLoadPreviousComments && userFeed")
    a(href="javascript:void(0)" @click="showAllComments()" class="m-t-10")
      | Show more {{getCommentType()}}s
  //.row.m-t-10.enable-commenting-wrap(v-if="comments.length && !commentsEnabled")
    button.btn.btn-info.btn-circle.btn-sm.m-l-20(type='button' @click="enableComments()" :title="'Add your ' + getCommentType()")
        i.fa.fa-plus
  .row.m-t-10.leave-comment-wrap
    div
      <video-comment :commentType="getCommentType()" @videoUploaded="triggerVideoComment" ref="videoCommentComponent"/>
    .col-11.submit-comment-textwrap
      //<wysiwyg v-model.trim="newCommentText" v-if="isQuestion()" :placeholder="placeholderText()" />
      <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model.trim="newCommentText" v-if="isQuestion()" :placeholder="placeholderText()"></vue-editor>
      textarea.form-control.b-0.bg-none(:placeholder="placeholderText()" v-if="!isQuestion()" v-model.trim="newCommentText" @keydown.enter="leaveComment()")
    .col-1.text-right.submit-comment-btn
      button.btn.btn-info.btn-circle.btn-lg.make-comment-btn(type='button' @click='leaveComment()')
        i.fa.fa-paper-plane-o.pr-t--3-l--3
      .comment-preloader(v-show="preloader")
        <preloader :option = 2></preloader>
  <video-editing ref="videoEditingComponent" @VideoEdited="refreshVideo"/>
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
import VideoEditing from '../videoEditing/main'

function postCommentInitialState () {
  return {
    newCommentText: '',
    preloader: false,
    defaultCommentsCount: 3,
    enableLoadPreviousComments: true,
    currentUser: auth.getUser(),
    videoPath: '',
    comments: [],
    pageLoader: false,
    commentsEnabled: false
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
    VueEditor,
    VideoEditing
  },
  mixins: [mixin, commentMixin],
  props: {
    commentType: {
      type: String,
      required: true
    },
    autoReplay: {
      type: Boolean,
      default () {
        return false
      }
    },
    triggerPopupView: {
      type: Boolean,
      default () {
        return false
      }
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
    },
    feedPage: {
      type: String,
      default () {
        return ''
      }
    },
    postObj: {
      type: Object,
      default () {
        return {}
      }
    },
    profileUserId: {
      type: String,
      default () {
        return ''
      }
    },
    defaultComments: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return postCommentInitialState()
  },
  watch: {
    defaultComments (newV) {
      if (newV.length) {
        this.bootUp()
      }
    }
  },
  mounted () {
    if (this.isAnswer() && this.manipulativePage()) {
      this.defaultCommentsCount = 1
    }
    this.bootUp()
  },
  methods: {
    bootUp () {
      if (!this.defaultComments.length) {
        this.loadComments()
      } else {
        this.comments = this.defaultComments
      }
    },
    isAnswer () {
      return this.getCommentType() === 'answer'
    },
    // this method helps choose default number of comments to be shown, if the page is Profile and
    // there is no default Comment on the post
    manipulateAnswers () {
      if (this.feedPage === 'profile') {
        return this.postHasDefaultComment()
      }
      return false
    },
    CommentVideoPlayed (comment) {
      this.$emit('CommentVideoPlayed', {
        postId: this.postId,
        comment: comment
      })
    },
    postHasDefaultComment () {
      return !this.isEmptyObject(this.postObj) && this.postObj.defaultComment
    },
    manipulativePage () {
      // return this.userFeed || this.feedPage === 'profile'
      return (this.userFeed && this.isQuestion()) || (this.feedPage === 'profile' && this.postHasDefaultComment())
    },
    enableComments () {
      this.commentsEnabled = !this.commentsEnabled
    },
    isCommentEnabled (index_, comment) {
      let defaultCondition = () => {
        return index_ >= (this.comments.length - this.defaultCommentsCount)
      }
      if (this.enableLoadPreviousComments) {
        if (this.userFeed && this.isQuestion() && this.feedPage !== 'profile') {
          return this.comments.length > 1 ? comment.setDefault : true
        } else if (this.feedPage === 'profile') {
          return this.postObj.defaultComment ? comment.UserId === this.profileUserId : defaultCondition()
        } else {
          return defaultCondition()
        }
      }
      return true
    },
    loadComments () {
      this.pageLoader = true
      this.$options.service.loadComments(this.postId, this.userFeed)
        .then((d) => {
          this.pageLoader = false
          this.comments = d.comments
          this.updateCommentCount()
        })
        .catch((cErr) => {
          this.pageLoader = false
          this.showNotification('Something went wrong while fetching the comments/answers', 'error')
        })
    },
    refreshVideo (comment) {
      this.comments[this.comments.length - 1] = comment
    },
    leaveComment () {
      if (this.newCommentText || this.videoPath) {
        this.preloader = true
        this.$options.service.createComment(this.postId, {comment: this.newCommentText, videoPath: this.videoPath})
          .then((data) => {
            this.$set(this.comments, this.comments.length, data.comment)
            this.updateCommentCount('add')
            this.reset()
            this.triggerVideoEditing(data.comment)
          })
          .catch((commentError) => {
            this.preloader = false
            alert('Something went wrong while posting your comment/answer')
          })
      }
    },
    /* triggerVideoEditing (comment) {
      if (this.isQuestion() && this.getVideo(comment)) {
        this.$refs.videoEditingComponent.triggerPopup(comment)
      }
    }, */
    triggerVideoEditing (comment) {
      if (this.getVideo(comment)) {
        this.$set(comment, 'pickLocalVideoSrc', true)
        this.$refs.videoEditingComponent.triggerPopup(comment)
        // this.$set(comment, 'triggerEditing', true)
      }
    },
    showAllComments () {
      this.enableLoadPreviousComments = false
    },
    deleteComment (index_) {
      if (confirm('Are you sure you want to delete it?')) {
        let commentCopy = this.comments[index_]
        auth.deleteComment(this.comments[index_].id)
          .then((data) => {
            if (!data.success) {
              this.$set(this.comments, index_, commentCopy)
              this.updateCommentCount('add')
              this.showNotification(data.error, 'error')
            }
          })
          .catch((commentError) => {
            this.showNotification('Something went wrong while deleting the comment', 'error')
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
    }
    /*
    ** This method determines and sets the index of the
    ** comment in Comments array that will be
    ** shown as default comment in User Feed
    ** It shows the default comment index as
    ** the index of the comment having highest
    ** number of likes
    */
    /* updateDefaultCommentIndex (comments) {
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
      this.$emit('defaultAnswerSelected', {
        userObj: comments[this.defaultCommentIndex].User
        // postId: postId
      })
      return comments
    } */
  }
}
</script>
