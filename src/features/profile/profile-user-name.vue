<template lang="pug">
div
  h4.card-title.m-t-10 {{userName(user, false)}}
  h6.card-subtitle {{user.tagline}}
</template>
<script>
import mixin from '../../globals/mixin.js'

/* eslint-disable */
import auth from '@/auth/helpers'
/* eslint-enable */

export default {
  name: 'ProfileUserName',
  mixins: [mixin],
  props: {
    profileUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      user: this.profileUser
    }
  },
  watch: {
    profileUser (profileUser) {
      this.user = profileUser
    },
    '$store.state.auth.user' (user) {
      this.user = user
    }
  }
}
</script>
