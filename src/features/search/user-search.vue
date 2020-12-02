<template lang="pug">
div
  h6.text-muted(v-show="!pageLoader && !results.length")
    | Sorry, no results
  .text-center.m-t-20(v-show="pageLoader")
    <preloader></preloader>
  <user-grid v-if="!pageLoader && results.length" :users="results" :currentUser="currentUser" :colClass="'col-lg-2 col-md-6'"></user-grid>
  div.load-more-posts.text-center(v-infinite-scroll="loadMoreResults" infinite-scroll-disabled="disableLoadMore" infinite-scroll-distance="300")
    <preloader v-show="loadMorePreloader"></preloader>
    span(v-show="noMoreResults && results.length")
      i.mdi.mdi-emoticon-sad.m-r-5
      | No more results
</template>
<script>
import Service from './service'
import Preloader from './../../components/preloader'
import UserGrid from './../../components/users/user-grid'
import mixin from '../../globals/mixin.js'
import auth from '@/auth/helpers'

function initialState () {
  return {
    k: '',
    pageLoader: true,
    results: [],
    page: 1,
    disableLoadMore: true,
    noMoreResults: false,
    loadMorePreloader: false,
    currentUser: auth.getUser()
  }
}
export default {
  name: 'UserSearch',
  service: new Service(),
  components: {
    Preloader,
    UserGrid
  },
  mixins: [mixin],
  props: {
    keyword: {
      type: String,
      default () {
        return ''
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
      this.$options.service.search('users', this.k, this.page, {sort: this.sort, lRIds: this.getIds(this.results)})
        .then((data) => {
          this.pageLoader = false
          this.loadMorePreloader = false
          if (data.users.length) {
            this.results = this.results.concat(data.users)
            this.disableLoadMore = false
            this.page++
          } else {
            this.noMoreResults = true
          }
        })
        .catch((searchErr) => {
          this.showNotification('Something went wrong while fetching the results, please try again later', 'error')
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
