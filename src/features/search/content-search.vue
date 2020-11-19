<template lang="pug">
div
  h6.text-muted(v-show="!pageLoader && !results.length")
    | Sorry, no results
  .text-center.m-t-20(v-show="pageLoader")
    <preloader></preloader>
  <feed :feedPage="'search'" v-if="!pageLoader && results.length" :feed="results"></feed>
  div.load-more-posts.text-center(v-infinite-scroll="loadMoreResults" infinite-scroll-disabled="disableLoadMore" infinite-scroll-distance="300")
    <preloader v-show="loadMorePreloader"></preloader>
    span(v-show="noMoreResults && results.length")
      i.mdi.mdi-emoticon-sad.m-r-5
      | No more results
</template>
<script>
import Service from './service'
import Preloader from './../../components/preloader'
import Feed from './../../components/feed/feed'

function initialState () {
  return {
    k: '',
    pageLoader: true,
    results: [],
    page: 1,
    disableLoadMore: true,
    noMoreResults: false,
    loadMorePreloader: false
  }
}
export default {
  name: 'ContentSearch',
  service: new Service(),
  components: {
    Preloader,
    Feed
  },
  props: {
    keyword: {
      type: String,
      default () {
        return ''
      }
    },
    searchType: {
      type: String,
      default () {
        return 'content'
      }
    },
    sort: {
      type: String,
      required: true
    }
  },
  data () {
    return initialState()
  },
  watch: {
    keyword (newK) {
      this.init(newK)
    },
    sort (newV) {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init (keyword) {
      // reset component data
      Object.assign(this.$data, initialState())
      this.k = keyword || this.keyword
      this.loadResults()
    },
    loadResults () {
      let otherParams = {
        uncommented: this.$route.query.uncommented || false,
        sort: this.sort
      }
      this.$options.service.search(this.searchType, this.k, this.page, otherParams)
        .then((data) => {
          this.pageLoader = false
          this.loadMorePreloader = false
          if (data.posts.length) {
            this.results = this.results.concat(data.posts)
            this.disableLoadMore = false
            this.page++
          } else {
            this.noMoreResults = true
          }
        })
        .catch((searchErr) => {
          alert('Something went wrong while fetching the results, please try again later')
        })
    },
    loadMoreResults () {
      this.disableLoadMore = true
      this.loadMorePreloader = true
      this.loadResults()
    }
  }
}
</script>
