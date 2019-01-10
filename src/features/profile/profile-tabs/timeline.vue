<template lang="pug">
.card-body.min-h-400
  .text-center.m-t-20(v-show="pageLoader")
    <preloader></preloader>
  <feed :feed="feed" v-show="!pageLoader"></feed>
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
    }
  },
  data () {
    return getInitialData()
  },
  watch: {
    profileUser: {
      handler () {
        this.reset()
        this.loadTimelineFeed()
      },
      deep: true
    }
  },
  mounted () {
  },
  methods: {
    loadTimelineFeed () {
      this.$options.service.getTimelineFeed(this.profileUser.id, this.page)
        .then((data) => {
          this.pageLoader = false
          this.loadMorePreloader = false
          if (data.posts.length) {
            this.feed = this.feed.concat(data.posts)
            this.disableLoadMore = false
            this.page++
          } else {
            this.noMoreFeed = true
          }
        })
        .catch((feedErr) => {
          alert('Somehting went wrong while getting the feed.')
        })
    },
    reset () {
      Object.assign(this.$data, getInitialData())
    },
    loadMoreFeed () {
      this.disableLoadMore = true
      this.loadMorePreloader = true
      this.loadTimelineFeed()
    }
  }
}
</script>
