<template lang="pug">
.card-body.min-h-400.profile-page-timeline
  .text-center.m-t-20(v-show="pageLoader")
    <preloader></preloader>
  <feed :feed="feed" :feedPage="feedPage" v-show="!pageLoader" :profileUserId="profileUser.id"></feed>
  div.load-more-posts.text-center(v-infinite-scroll="loadMoreFeed" infinite-scroll-disabled="disableLoadMore" infinite-scroll-distance="300")
    <preloader v-show="loadMorePreloader"></preloader>
    span(v-show="noMoreFeed")
      i.mdi.mdi-emoticon-sad.m-r-5
      | No more feed
</template>
<script>
import Preloader from './../../../components/preloader'
import Feed from './../../../components/feed/feed'
import Service from './service'

// initial data values
function getInitialData () {
  return {
    pageLoader: true,
    feed: [],
    page: 1,
    disableLoadMore: true,
    noMoreFeed: false,
    loadMorePreloader: false
  }
}
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
    feedPage: {
      type: String,
      default () {
        return 'profile'
      }
    }
  },
  data () {
    return getInitialData()
  },
  watch: {
    profileUser: {
      handler () {
        this.init()
      },
      deep: true
    }
  },
  mounted () {
    if (this.feedPage === 'history') {
      this.init()
    }
  },
  methods: {
    init () {
      this.reset()
      this.loadContent()
    },
    afterLoad (data) {
      this.pageLoader = false
      this.loadMorePreloader = false
      if (data.posts.length) {
        this.feed = this.feed.concat(data.posts)
        this.disableLoadMore = false
        this.page++
      } else {
        this.noMoreFeed = true
      }
    },
    loadContent () {
      if (this.feedPage === 'profile') {
        this.$options.service.getTimelineFeed(this.profileUser.id, this.page)
          .then((data) => {
            this.afterLoad(data)
          })
          .catch((feedErr) => {
            alert('Somehting went wrong while getting the feed.')
          })
      } else if (this.feedPage === 'history') {
        this.$options.service.getWatchedContentHistory(this.page)
          .then((data) => {
            this.afterLoad(data)
          })
          .catch((feedErr) => {
            alert('Somehting went wrong while getting the feed.')
          })
      }
    },
    reset () {
      Object.assign(this.$data, getInitialData())
    },
    loadMoreFeed () {
      this.disableLoadMore = true
      this.loadMorePreloader = true
      this.loadContent()
    }
  }
}
</script>
