<template lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0 Profile
      ol.breadcrumb
        li.breadcrumb-item
          <router-link to="/">
            | Home
          </router-link>
        li.breadcrumb-item.active Search
    .col-md-8.col-12.align-self-center.text-right
      h3.m-b-0.font-light $3249
      h5.text-muted.m-b-0 Total Revenue
  // ==============================================================
  // End Bread crumb and right sidebar toggle
  // ==============================================================
  // ==============================================================
  // Start Page Content
  // ==============================================================
  // Row
  .row
    .col-12.p-0
      .card
        .card-body.min-h-400
          h4.card-title.m-b-20(v-show="!pageLoader") Search Results For "{{$route.query.k}}"
          // h6.card-subtitle About 14,700 result ( 0.10 seconds)
          h6.text-muted(v-show="!pageLoader && !results.length")
            | Sorry, no results
          .text-center.m-t-20(v-show="pageLoader")
            <preloader></preloader>
          <feed v-if="!pageLoader && results.length" :feed="results"></feed>
          div.load-more-posts.text-center(v-infinite-scroll="loadMoreResults" infinite-scroll-disabled="disableLoadMore" infinite-scroll-distance="300")
            <preloader v-show="loadMorePreloader"></preloader>
            span(v-show="noMoreResults")
              i.mdi.mdi-emoticon-sad.m-r-5
              | No more results
          // ul.search-listing(v-if="!pageLoader")
            // li(v-for="r in results")
              // h3
                // <router-link :to="getPostLink(r.id)">
                  // <template v-if="r.Question">
                  // |  {{r.Question.question}}
                  // </template>
                  // <template v-if="r.Video">
                  // |  {{r.Video.title}}
                  // </template>
                // </router-link>
              // <router-link class="search-links" :to="getPostLink(r.id)">
                // | {{getDomainName()}}{{getPostLink(r.id)}}
              // </router-link>
              // p
                // <template v-if="r.Question">
                // |  {{r.Question.description}}
                // </template>
                // <template v-if="r.Video">
                // |  {{r.Video.description}}
                // </template>
</template>
<script>
import Service from './service'
import Preloader from './../../components/preloader'
import mixin from '../../globals/mixin.js'
import Feed from './../../components/feed/feed'

function initialState () {
  return {
    searchType: '',
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
  name: 'Search',
  service: new Service(),
  components: {
    Preloader,
    Feed
  },
  mixins: [mixin],
  data () {
    return initialState()
  },
  watch: {
    '$route.params.type' (newT) {
      this.init()
    },
    '$route.query.k' (newK) {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      Object.assign(this.$data, initialState())
      this.searchType = this.$route.params.type
      this.k = this.$route.query.k
      this.loadResults()
    },
    loadResults () {
      this.setDocumentTitle('Search for "' + this.k + '"')
      this.$options.service.search(this.searchType, this.k, this.page)
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
