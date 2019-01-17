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
          h4.card-title(v-show="!pageLoader") Search Result For "{{$route.query.k}}"
          // h6.card-subtitle About 14,700 result ( 0.10 seconds)
          .text-center.m-t-20(v-show="pageLoader")
            <preloader></preloader>
          ul.search-listing(v-if="!pageLoader")
            li
              h3
                a(href='javacript:void(0)') AngularJs
              a.search-links(href='javascript:void(0)') http://www.google.com/angularjs
              p
                | Lorem Ipsum viveremus probamus opus apeirian haec perveniri, memoriter.Praebeat pecunias viveremus probamus opus apeirian haec perveniri, memoriter.
            li
              h3
                a(href='javacript:void(0)') AngularJS — Superheroic JavaScript MVW Framework
              a.search-links(href='javascript:void(0)') http://www.google.com/angularjs
              p
                | Lorem Ipsum viveremus probamus opus apeirian haec perveniri, memoriter.Praebeat pecunias viveremus probamus opus apeirian haec perveniri, memoriter.
</template>
<script>
import Service from './service'
import Preloader from './../../components/preloader'
import mixin from '../../globals/mixin.js'

export default {
  name: 'Search',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      searchType: this.$route.params.type,
      k: this.$route.query.k,
      pageLoader: true
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
      this.setDocumentTitle('Search ' + this.k)
      this.$options.service.search(this.searchType, this.k)
    }
  }
}
</script>
