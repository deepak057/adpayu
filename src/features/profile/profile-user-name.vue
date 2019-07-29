<template lang="pug">
div
  h4.card-title.m-t-10 {{userName(user, false)}}
  h6.card-subtitle {{user.tagline}}
</template>
<script>
import mixin from '../../globals/mixin.js'
import auth from '@/auth/helpers'

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
      user: this.profileUser,
      currentUser: auth.getUser()
    }
  },
  watch: {
    profileUser (profileUser) {
      this.user = profileUser
    },
    '$store.state.auth.user' (user) {
      // this check is to prevent the User profile pic and name from changing to current user's
      // when the page title is collapsed or expanded by current user
      // as updating the page title updates the user state which affacts the profile page
      // the same check is also put on the profile pic component (file- profile-pic)
      if (this.user.id !== this.currentUser.id && user.id === this.currentUser.id) {
      } else {
        this.user = user
      }
    }
  }
}
</script>
