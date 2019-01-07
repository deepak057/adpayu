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
import Service from './service'

export default {
  name: 'Timeline',
  service: new Service(),
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
      feed: [],
      page: 1
    }
  },
  watch: {
    profileUser: {
      handler () {
        this.profile()
      },
      deep: true
    }
  },
  mounted () {
  },
  methods: {
    profile () {
      this.$options.service.getTimelineFeed(this.profileUser.id, this.page)
        .then((data) => {
          this.pageLoader = false
          this.feed = data.posts
        })
        .catch((feedErr) => {
          alert('Somehting went wrong while getting the feed.')
        })
    },
    seeingOnwTimeline (profileUserId) {
      return (profileUserId | this.profileUser.id) === this.currentUser.id
    }

  }
}
</script>
