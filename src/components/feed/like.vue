<template lang="pug">
a.link.m-r-10.comment-padding-0.like-component.f-s-16(href='javascript:void(0)' @click="likeToggle()" :title="tooltipText()")
  i.text-danger(:class="{'ti-heart pr-t-2 love-icon': !liked, 'fa fa-heart': liked}")
  |  {{count ? formatNumber(count, false, 10) : ''}}
</template>
<script>
import Service from './service'
import mixin from '../../globals/mixin.js'

export default {
  name: 'Like',
  service: new Service(),
  mixins: [mixin],
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
  watch: {
    likesCount (newV) {
      this.count = newV
      this.setDefaultLike()
    }
  },
  mounted () {
    this.count = parseInt(this.likesCount)
    this.setDefaultLike()
  },
  methods: {
    setDefaultLike () {
      if (this.hasLiked && !this.likesCount) {
        this.liked = false
      } else {
        this.liked = this.hasLiked
      }
    },
    tooltipText () {
      return 'Click to ' + (this.liked ? 'unlike it' : 'like it')
    },
    likeToggle () {
      if (this.liked) {
        this.count--
        this.removeLike()
      } else {
        this.count++
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
