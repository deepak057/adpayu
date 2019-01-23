<template lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0 Tags
      ol.breadcrumb
        li.breadcrumb-item
          <router-link to="/">
            | Home
          </router-link>
        li.breadcrumb-item.active Tags
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
          div.m-t-20.text-center(v-show="pageLoader")
            <preloader></preloader>
          .row(v-show="!pageLoader")
            // Column
            <tag v-for = "(tag, i) in tags" :tag= tag :key="tag.name"></tag>
            // Column
          div.m-t-20.text-center(v-infinite-scroll="loadMoreTags" infinite-scroll-disabled="disableLoadMore" infinite-scroll-distance="300")
            <preloader v-show="loadMoreLoader"></preloader>
            span(v-show="noMoreTags")
              i.mdi.mdi-emoticon-sad.m-r-5
              | No more tags
</template>
<script>
// import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Tag from '../../components/tags/tag'
import Service from './service'
import mixin from '../../globals/mixin.js'

export default {
  name: 'Tags',
  service: new Service(),
  components: {
    Preloader,
    Tag
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      tags: [],
      loadMoreLoader: false,
      disableLoadMore: true,
      page: 1,
      noMoreTags: false
    }
  },
  mounted () {
    this.scrollToTop()
    this.fetchTags()
  },
  methods: {
    loadMoreTags () {
      this.loadMoreLoader = true
      this.disableLoadMore = true
      this.fetchTags()
    },
    fetchTags () {
      this.$options.service.getTags(this.page)
        .then((data) => {
          this.pageLoader = false
          this.loadMoreLoader = false
          if (data.tags.length) {
            this.tags = this.tags.concat(data.tags)
            this.page++
            this.disableLoadMore = false
          } else {
            this.noMoreTags = true
          }
        })
        .catch((tagsErr) => {
          alert('Something went wrong file getting tags')
        })
    }
  }
}
</script>
