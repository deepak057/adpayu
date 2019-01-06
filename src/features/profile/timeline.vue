<template lang="pug">
  .card-body.min-h-400
    .text-center.m-t-20(v-show="pageLoader")
      <preloader></preloader>
    <feed :feed="feed" v-show="!pageLoader"></feed>
</template>
<script>
import Preloader from './../../components/preloader'
import Feed from './../../components/feed/feed'
import auth from '@/auth/helpers'

export default {
  name: 'Timeline',
  components: {
    Preloader,
    Feed
  },
  props: {
    profileUser: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      default () {
        return auth.getUser()
      }
    }
  },
  data () {
    return {
      pageLoader: true,
      feed: []
    }
  },
  watch: {
    '$route.params.uid' (newUid) {
      this.profile(newUid)
    }
  },
  mounted () {
    this.profile()
  },
  methods: {
    profile () {
    },
    seeingOnwTimeline (profileUserId) {
      return (profileUserId | this.profileUser.id) === this.currentUser.id
    }

  }
}
</script>
