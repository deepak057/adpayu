<template lang="pug">
a.link.m-r-10.comment-padding-0(href='javascript:void(0)' @click="likeToggle(likes)" title="Click to like or unlike it")
  i.text-danger(:class="{'ti-heart pr-t-2': !liked, 'fa fa-heart': liked}")
  |  {{count}} {{liked? 'Loved': 'Love'}}
</template>
<script>
import Service from './service'

export default {
  name: 'Like',
  service: new Service(),
  props: {
    likes: {
      type: Array,
      default () {
        return []
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
    this.count = this.likes.length
    this.liked = this.hasLikedAlready()
  },
  methods: {
    likeToggle (likes) {
      if (this.liked) {
        this.count--
        this.removeLike()
      } else {
        this.count++
        this.addLike()
      }
      this.liked = !this.liked
    },
    hasLikedAlready () {
      let liked = false
      for (let i in this.likes) {
        if (this.likes[i].liked) {
          liked = true
          break
        }
      }
      return liked
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
