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
          h4.card-title.m-b-20 Search Results For "{{$route.query.k}}"
          ul.nav.nav-tabs.customtab(role='tablist')
            li.nav-item
              a.nav-link(data-toggle='tab', href='#sp-content-tab', role='tab', aria-expanded='false' :class="{'active': checkSearchType('content')}" @click="changeTab('content')")
                span.hidden-sm-up
                  i.ti-search
                span.hidden-xs-down Content
            li.nav-item
              a.nav-link(data-toggle='tab', href='#sp-video-tab', role='tab', aria-expanded='false' @click="changeTab('videos')" :class="{'active': checkSearchType('videos')}")
                span.hidden-sm-up
                  i.ti-video-camera
                span.hidden-xs-down Video
            li.nav-item
              a.nav-link(data-toggle='tab', href='#sp-questions-tab', role='tab', aria-expanded='false' @click="changeTab('questions')" :class="{'active': checkSearchType('questions')}")
                span.hidden-sm-up
                  i.ti-help
                span.hidden-xs-down Questions
            li.nav-item
              a.nav-link(data-toggle='tab', href='#sp-users-tab', role='tab', aria-expanded='false' @click="changeTab('users')" :class="{'active': checkSearchType('users')}")
                span.hidden-sm-up
                  i.ti-user
                span.hidden-xs-down Users
            li.nav-item
              a.nav-link(data-toggle='tab', href='#sp-tags-tab', role='tab', aria-expanded='false' @click="changeTab('tags')" :class="{'active': checkSearchType('tags')}")
                span.hidden-sm-up
                  i.ti-tag
                span.hidden-xs-down Tags
          .tab-content
            #sp-content-tab.tab-pane.p-t-20(role='tabpanel', aria-expanded='false' :class="{'active': checkSearchType('content')}")
              <content-search :keyword = "k" v-if="checkSearchType('content')"></content-search>
            #sp-video-tab.tab-pane.p-20(role='tabpanel', aria-expanded='false' :class="{'active': checkSearchType('videos')}") 2
            #sp-questions-tab.tab-pane.p-20(role='tabpanel', aria-expanded='true' :class="{'active': checkSearchType('questions')}") 3
            #sp-users-tab.tab-pane.p-20(role='tabpanel', aria-expanded='true' :class="{'active': checkSearchType('users')}") 3
            #sp-tags-tab.tab-pane.p-20(role='tabpanel', aria-expanded='true' :class="{'active': checkSearchType('tags')}") 3
          // h6.card-subtitle About 14,700 result ( 0.10 seconds)
</template>
<script>
import ContentSearch from './content-search'
import { router } from '@/http'

export default {
  name: 'Search',
  components: {
    ContentSearch
  },
  data () {
    return {
      searchType: '',
      k: ''
    }
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
      this.searchType = this.$route.params.type || 'content'
      this.k = this.$route.query.k || ''
    },
    checkSearchType (sType) {
      return sType === this.searchType
    },
    changeTab (searchType) {
      router.push({
        name: 'search',
        params: {
          type: searchType
        },
        query: {
          k: this.k
        }
      })
    }
  }
}
</script>
