<template lang="pug">
.comment-widgets
  .d-flex.flex-row.comment-row(v-if="comments.length > defaultCommentsCount && enableLoadPreviousComments")
    a(href="javascript:void(0)" @click="showAllComments()")
      | Load Previous comments
  .d-flex.flex-row.comment-row(v-for="(comment, n) in comments" v-if="isCommentEnabled(n)")
    .p-2
      <router-link :to="userProfileLink(comment.User.id)">
        span.round
          img(:src='getMedia(comment.User.pic)', alt='user', width='50')
      </router-link>
    .comment-text.w-100
      h5
        <router-link :to="userProfileLink(comment.User.id)">
          | {{userName(comment.User)}}
        </router-link>
      p.m-b-5(v-if="!isQuestion()")
        | {{comment.comment}}
      div.m-b-5(v-html="comment.comment" v-if="isQuestion()")
      .comment-footer
        span.text-muted.pull-right
          <timeago :datetime="comment.createdAt" :auto-update="60" class="m-l-5" :title="comment.createdAt | date"></timeago>
        span.action-icons.visible
          //a(href='javascript:void(0)')
            //i.ti-pencil-alt
          a(href='javascript:void(0)' @click='deleteComment(n)' title="Delete this comment")
            i.ti-trash
          <like :likes="comment.Likes" :commentId="comment.id"></like>
  .row.m-t-10
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
import mixin from '../../../../globals/mixin.js'
import Preloader from './../../../../components/preloader'

export default {
  name: 'Comments',
  service: new Service(),
  components: {
    Like,
    Preloader
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
    return {
      newCommentText: '',
      preloader: false,
      defaultCommentsCount: 3,
      enableLoadPreviousComments: true
    }
  },
  methods: {
    leaveComment () {
      if (this.newCommentText) {
        this.preloader = true
        let that = this
        this.$options.service.createComment(this.postId, {comment: this.newCommentText})
          .then((data) => {
            that.preloader = false
            that.$set(this.comments, this.comments.length, data.comment)
            this.newCommentText = ''
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
      var text_ = this.isQuestion() ? 'answer' : 'comment'
      return 'Type your ' + text_ + ' here'
    },
    isQuestion () {
      return this.commentType === 'question' || false
    }
  }
}
</script>
