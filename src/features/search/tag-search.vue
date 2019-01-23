<template lang="pug">
div
  h6.text-muted(v-show="!pageLoader && !results.length")
    | Sorry, no results
  .text-center.m-t-20(v-show="pageLoader")
    <preloader></preloader>
  .row
    <tag v-if="!pageLoader" v-for = "(tag, i) in results" :tag= tag :key="tag.name"></tag>
  div.load-more-posts.text-center(v-infinite-scroll="loadMoreResults" infinite-scroll-disabled="disableLoadMore" infinite-scroll-distance="300")
    <preloader v-show="loadMorePreloader"></preloader>
    span(v-show="noMoreResults && results.length")
      i.mdi.mdi-emoticon-sad.m-r-5
      | No more results
</template>
<script>
import Service from './service'
import Preloader from './../../components/preloader'
import Tag from '../../components/tags/tag'

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
  name: 'UserSearch',
  service: new Service(),
  components: {
    Preloader,
    Tag
  },
  props: {
    keyword: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return initialState()
  },
  watch: {
    keyword (newK) {
      this.init(newK)
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
      this.$options.service.search('tags', this.k, this.page)
        .then((data) => {
          this.pageLoader = false
          this.loadMorePreloader = false
          if (data.tags.length) {
            this.results = this.results.concat(data.tags)
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
