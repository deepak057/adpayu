<template lang="pug">
.comment-widgets
  .d-flex.flex-row.comment-row(v-for="(comment, n) in comments")
    .p-2
      span.round
        img(src='static/assets/images/users/1.jpg', alt='user', width='50')
    .comment-text.w-100
      h5 James Anderson
      p.m-b-5
        | {{comment.comment}}
      .comment-footer
        span.text-muted.pull-right {{comment.date}}
        span.action-icons
          a(href='javascript:void(0)')
            i.ti-pencil-alt
          a(href='javascript:void(0)' @click='deleteComment(n)')
            i.ti-trash
          a(href='javascript:void(0)')
            i.ti-heart
  .row.m-t-10
    .col-11
      textarea.form-control.b-0(:placeholder="placeholderText()" v-model.trim="newCommentText" @keyup.enter="leaveComment(f)")
    .col-1.text-right
      button.btn.btn-info.btn-circle.btn-lg(type='button' @click='leaveComment()')
        i.fa.fa-paper-plane-o.pr-t--3-l--3
</template>
<script>
export default {
  name: 'Comments',
  props: {
    comments: {
      type: Array,
      required: true
    },
    commentType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      newCommentText: ''
    }
  },
  methods: {
    leaveComment (feedItem) {
      if (this.newCommentText) {
        this.$set(this.comments, this.comments.length, {uid: 1, comment: this.newCommentText, date: '21 August, 2018'})
        this.newCommentText = ''
      }
    },
    deleteComment (index_) {
      this.comments.splice(index_, 1)
    },
    placeholderText () {
      var text_ = this.commentType === 'question' ? 'answer' : 'comment'
      return 'Type your ' + text_ + ' here'
    }
  }
}
</script>
