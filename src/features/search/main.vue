<template lang="pug">
.container-fluid
  <page-title heading="Search"/>
  // ==============================================================
  // Start Page Content
  // ==============================================================
  // Row
  .row
    .col-12.p-0
      .card
        .card-body.min-h-400
          .row
            .col-md-8
              h4.card-title.m-b-20 Search Results For "{{$route.query.k}}"
            .col-md-4.text-right
              .row.m-0.p-0
                .col-1.text-left.m-0.p-0.search-sort-wrap
                  // i.mdi.mdi-sort.pointer.v-align-sub.text-muted(title="Sort results")
                  .btn-group(role="group")
                    i.mdi.mdi-sort.pointer.v-align-sub.text-muted.search-i(title="Sort results" data-toggle='dropdown' aria-haspopup='true' aria-expanded='true')
                    .dropdown-menu
                      a.dropdown-item.cursor-auto(href='javascript:void(0)') Sort Results
                      .dropdown-divider
                      a.dropdown-item(:class="{'active': sort === 'NF'}" href='#' @click.stop.prevent="sortResults('NF')")
                        i.mdi.mdi-sort-ascending.m-r-5
                        | New first
                      a.dropdown-item(:class="{'active': sort === 'LF'}" href='#' @click.stop.prevent="sortResults('LF')")
                        i.mdi.mdi-sort-descending.m-r-5
                        | Old first
                      a.dropdown-item(:class="{'active': sort === 'RO'}" href='#' @click.stop.prevent="sortResults('RO')")
                        i.mdi.mdi.mdi-sort-variant.m-r-5
                        | Random
                .col-11.m-0.p-0
                  <search-field :searchType="searchType" :searchKeyword="k" :additionalParams="additionalParams"></search-field>
          ul.nav.nav-tabs.customtab(role='tablist')
            li.nav-item
              a.nav-link(data-toggle='tab', href='#sp-content-tab', role='tab', aria-expanded='false' :class="{'active': checkSearchType('content')}" @click="changeTab('content')")
                span.hidden-sm-up
                  i.ti-search
                span.hidden-xs-down Content
            li.nav-item
              a.nav-link(data-toggle='tab', href='#sp-video-tab', role='tab', aria-expanded='false' @click="changeTab('video')" :class="{'active': checkSearchType('video')}")
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
              <content-search :keyword = "k" v-if="checkSearchType('content')" :sort="sort"></content-search>
            #sp-video-tab.tab-pane.p-t-20(role='tabpanel', aria-expanded='false' :class="{'active': checkSearchType('videos')}")
              <content-search :keyword = "k" :searchType= "searchType" v-if="checkSearchType('video')" :sort="sort"></content-search>
            #sp-questions-tab.tab-pane.p-20(role='tabpanel', aria-expanded='true' :class="{'active': checkSearchType('questions')}")
              <content-search :keyword = "k" :searchType= "searchType" v-if="checkSearchType('questions')" :sort="sort"></content-search>
            #sp-users-tab.tab-pane.p-20(role='tabpanel', aria-expanded='true' :class="{'active': checkSearchType('users')}")
              <user-search :keyword = "k" v-if="checkSearchType('users')" :sort="sort"></user-search>
            #sp-tags-tab.tab-pane.p-20(role='tabpanel', aria-expanded='true' :class="{'active': checkSearchType('tags')}")
              <tag-search :keyword = "k" v-if="checkSearchType('tags')" :sort="sort"></tag-search>
          // h6.card-subtitle About 14,700 result ( 0.10 seconds)
</template>
<script>
import SearchField from './../../components/search-field'
import PageTitle from './../../components/page-title'
import ContentSearch from './content-search'
import UserSearch from './user-search'
import TagSearch from './tag-search'
import { router } from '@/http'
import mixin from '../../globals/mixin.js'

export default {
  name: 'Search',
  metaInfo () {
    return {
      title: 'Search'
    }
  },
  components: {
    ContentSearch,
    UserSearch,
    TagSearch,
    SearchField,
    PageTitle
  },
  mixins: [mixin],
  data () {
    return {
      searchType: '',
      k: '',
      additionalParams: {},
      sort: 'NF'
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
    sortResults (action = 'newFirst') {
      this.sort = action
    },
    init () {
      this.searchType = this.$route.params.type || 'content'
      this.k = this.$route.query.k || ''
      this.additionalParams = this.getAdditionalParameters()
      this.setDocumentTitle('Search for "' + this.k + '"')
    },
    getAdditionalParameters () {
      let uncommented = this.$route.query.uncommented || false
      if (uncommented) {
        return {
          uncommented: uncommented
        }
      }
      return {}
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
