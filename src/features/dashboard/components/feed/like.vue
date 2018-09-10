<template lang="pug">
a.link.m-r-10(href='javascript:void(0)' @click="likeToggle(likes)" title="Click to like or unlike it")
  i.text-danger(:class="{'ti-heart pr-t-2': !likes.liked, 'fa fa-heart': likes.liked}")
  |  {{likes.count}} {{likes.liked? 'Loved': 'Love'}}
</template>
<script>
export default {
  name: 'Like',
  props: {
    likes: {
      type: Object,
      default () {
        return {
          count: 0,
          liked: false
        }
      }
    }
  },
  methods: {
    likeToggle (likes) {
      if (likes.liked) {
        likes.count--
      } else {
        likes.count++
      }
      likes.liked = !likes.liked
    }
  }
}
</script>
