<template lang="pug">
span
  span.pointer(@click="follow()" v-show="!following")
    | Follow
  <template v-if="following">
  .btn-group
    button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
      i.fa.fa-check.m-r-5
      span
        | Following
    .dropdown-menu
      a.dropdown-item(href='javascript:void(0)' @click="follow()") Unfollow
  </template>
</template>
<script>
import Service from './service'
export default {
  name: 'FollowButton',
  service: new Service(),
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      following: this.tag.following
    }
  },
  methods: {
    follow () {
      this.following = !this.following
      this.updateServer()
    },
    updateServer () {
      if (this.following) {
        this.$options.service.follow(this.tag.id)
      } else {
        this.$options.service.unfollow(this.tag.id)
      }
    }
  }
}
</script>
