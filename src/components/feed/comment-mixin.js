export default {
  methods: {
    getVideo (comment) {
      return comment.videoPath
    },
    isQuestion () {
      return this.commentType === 'question' || false
    },
    isOwner (commentUserId) {
      return this.currentUser.id === commentUserId
    },
    getCommentType () {
      return this.isQuestion() ? 'answer' : 'comment'
    }
  }
}
