<template lang="pug">
a.link.m-r-10.comment-padding-0(href='javascript:void(0)' @click="likeToggle(likes)" title="Click to like or unlike it")
  i.text-danger(:class="{'ti-heart pr-t-2': !liked, 'fa fa-heart': liked}")
  |  {{likesCount}} {{liked? 'Loved': 'Love'}}
</template>
<script>
import Service from './service'

export default {
  name: 'Like',
  service: new Service(),
  props: {
    likesCount: {
      type: Number,
      default () {
        return 0
      }
    },
    hasLiked: {
      type: Boolean,
      default () {
        return false
      }
    },
    postId: {
      type: Number,
      default () {
        return 0
      }
    },
    commentId: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      count: 0,
      liked: false
    }
  },
  mounted () {
    this.liked = this.hasLiked
  },
  methods: {
    likeToggle (likes) {
      if (this.liked) {
        this.likesCount--
        this.removeLike()
      } else {
        this.likesCount++
        this.addLike()
      }
      this.liked = !this.liked
    },
    addLike () {
      if (this.postId) {
        this.$options.service.postLike(this.postId)
      }
      if (this.commentId) {
        this.$options.service.commentLike(this.commentId)
      }
    },
    removeLike () {
      if (this.postId) {
        this.$options.service.removePostLike(this.postId)
      }
      if (this.commentId) {
        this.$options.service.removeCommentLike(this.commentId)
      }
    }
  }
}
</script>
