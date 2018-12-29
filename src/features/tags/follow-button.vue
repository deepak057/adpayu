<template lang="pug">
span
  span.pointer(@click="follow()" v-show="!following")
    | Follow
  button.btn.btn-sm.btn-secondary(v-show="following" @click="follow()")
    | Following
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
      following: false
    }
  },
  methods: {
    follow () {
      this.following = !this.following
    }
  }
}
</script>
