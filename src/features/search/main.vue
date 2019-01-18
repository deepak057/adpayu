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
          h6.text-muted(v-show="!pageloader && !results.length")
            | Sorry, no results
          .text-center.m-t-20(v-show="pageLoader")
            <preloader></preloader>
          <feed v-if="!pageloader && results.length" :feed="results"></feed>
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

export default {
  name: 'Search',
  service: new Service(),
  components: {
    Preloader,
    Feed
  },
  mixins: [mixin],
  data () {
    return {
      searchType: this.$route.params.type,
      k: this.$route.query.k,
      pageLoader: true,
      results: [],
      page: 1
    }
  },
  watch: {
    '$route.params.type' (newT) {
      this.searchType = newT
      this.init()
    },
    '$route.query.k' (newK) {
      this.k = newK
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.setDocumentTitle('Search for "' + this.k + '"')
      this.$options.service.search(this.searchType, this.k, this.page)
        .then((data) => {
          this.pageLoader = false
          this.results = data.posts
        })
        .catch((searchErr) => {
          alert('Something went wrong while fetching the results, please try again later')
        })
    }
  }
}
</script>
