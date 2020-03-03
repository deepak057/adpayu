<template  lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles.bg-special-2(:class="{'collapsed': currentUser.pageTitleCollapsed}")
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0
        | {{pageTitle() | capitalize}}
        i.mdi.mdi-refresh.cursor-hand.m-l-5.text-muted.f-s-14(v-if="currentUser.pageTitleCollapsed" @click="reloadFeed()" title="Refresh the feed to pull newer posts.")
      ol.breadcrumb
        li.breadcrumb-item
          <router-link :to="getTagLink('all')">
            | Home
          </router-link>
        li.breadcrumb-item.active
          | {{pageTitle(true) | capitalize}}
          i.mdi.mdi-refresh.cursor-hand.m-l-5(@click="reloadFeed()" title="Refresh the feed to pull newer posts.")
    .col-md-6.col-12.align-self-center.m-t-10.feed-ads-options-wrap.p-0
      label.m-r-5(for='show-feed-option')
        i.mdi.mdi-newspaper
        span(title = "Enable or disable feed")
          |  Feed
      <toggle-button title = "Enable or disable feed" v-model="currentUser.feedEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5"></toggle-button>
      label.m-l-10(for='show-ads-option')
        i.mdi.mdi-currency-usd
        span(title = "Enable or disable Ads")
          | Ads
      <toggle-button title = "Enable or disable Ads" v-model="currentUser.adsEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
      label.m-l-10.m-r-5
        i.mdi.mdi-comment-question-outline
        span(title = "Enable or disable unanswered questions")
          |  Questions
      <toggle-button title = "Enable or disable unanswered questions" v-model="currentUser.unCommentedEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5"></toggle-button>
      // label.m-l-10.m-r-5(for='show-recent-activity-option')
        i.mdi.mdi-clock
        span
          |  Recent
      // <toggle-button v-model="currentUser.recentActivitiesEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5"></toggle-button>
    .col-md-2.col-12.align-self-center
      <total-revenue/>
    <title-collapse />
  // ==============================================================
  // End Bread crumb and right sidebar toggle
  // ==============================================================
  // ==============================================================
  // Start Page Content
  // ==============================================================
  .row.dashboard-feed-view
    .col-12.feed-container-col
      .card
        .card-body.bg-special-1
          .btn-group.btn-add-feed
            button.btn.waves-effect.waves-light.btn-info.dropdown-toggle(type="button"  data-placement="left" title="Click to post something" data-toggle='dropdown', aria-haspopup='true', aria-expanded='true')
              i.fa.fa-plus.m-r-5
              span
                | Post
            .dropdown-menu(x-placement='bottom-start')
              a.dropdown-item(href='javascript:void(0)' v-for="pOpt in postOptions" @click="triggerPostPopup(pOpt)")
                i.fa.m-r-5(:class="pOpt.icon")
                | {{pOpt.label}}
              <router-link tag="a" :to="postAnswerPageLink()" class="dropdown-item">
                i.mdi.mdi-comment-plus-outline
                |  Video Answer
              </router-link>
          .feed-preloader(v-show="preloader")
            <preloader></preloader>
          <feed v-if="!preloader" :feed="feed" :userFeed="true"></feed>
          .nothing-to-show(v-show="feed.length && !newsFeedEnabled && !adEnabled")
            .jumbotron.white-back.text-center
              h1.display-3 Dead End!
              p.lead
                | You need to enable either News Feed or Ads to see something here.
              hr.my-4
              p
                | Currently, you have disabled both.
          div.load-more-posts.text-center(v-infinite-scroll="loadMoreFeed" infinite-scroll-disabled="disableLoadMore" infinite-scroll-distance="300")
            <preloader v-show="loadMorePreloader"></preloader>
            span(v-show="noMoreFeed && feed.length")
              i.mdi.mdi-emoticon-sad.m-r-5
              | No more feed
  <status-update @statusPosted="postStatus" :options="postOptionsDefault" :currentTag="getCat()"></status-update>
  // ==============================================================
  // End Right sidebar
  // ==============================================================
  <overlay-view :feed="feed" ref="overlayViewComp"/>
</template>

<script>
import mixin from '../../globals/mixin.js'
import Preloader from './../../components/preloader'
import TotalRevenue from './../../components/total-revenue'
import StatusUpdate from './components/status-update/main'
import Feed from './../../components/feed/feed'
import Service from './service'
import auth from '@/auth/helpers'
import TitleCollapse from '../../components/title-collapse'
import OverlayView from './overlay-view'

export default {
  name: 'Dashboard',
  service: new Service(),
  components: {
    StatusUpdate,
    Feed,
    Preloader,
    TotalRevenue,
    TitleCollapse,
    OverlayView
  },
  mixins: [mixin],
  props: {
    cat: {
      type: String,
      default: 'Home'
    }
  },
  data () {
    return {
      adEnabled: true,
      newsFeedEnabled: true,
      newCommentText: '',
      postOptionsDefault: {},
      preloader: true,
      disableLoadMore: true,
      loadMorePreloader: false,
      currentPage: 1,
      noMoreFeed: false,
      currentUser: auth.getUser(),
      postOptions: [
        {
          type: 'text',
          label: 'Status Update',
          icon: 'fa-bullhorn',
          popupTitle: 'Share Something New',
          buttonLabel: 'Share',
          showPopup: false
        },
        {
          type: 'question',
          label: 'Ask Question',
          icon: 'fa-question-circle',
          popupTitle: 'Ask your question',
          buttonLabel: 'Ask',
          showPopup: false

        },
        /* {
          type: 'picture',
          label: 'Pictures',
          icon: 'fa-image',
          popupTitle: 'Post Pictures',
          buttonLabel: 'Post',
          showPopup: false

        }, */
        {
          type: 'video',
          label: 'Video',
          icon: 'fa-video-camera',
          popupTitle: 'Post a video',
          buttonLabel: 'Post',
          showPopup: false

        }
      ],
      feed: []
    }
  },
  watch: {
    'currentUser.adsEnabled' () {
      this.updateFeedPreference()
    },
    'currentUser.feedEnabled' () {
      this.updateFeedPreference()
    },
    'currentUser.recentActivitiesEnabled' () {
      this.updateFeedPreference()
    },
    'currentUser.unCommentedEnabled' () {
      this.updateFeedPreference()
    },
    '$store.state.auth.user' (user) {
      this.currentUser = user
    },
    feed () {
      this.feed = this.prepareFeed(this.feed)
    },
    '$route.params.cat' (newCat) {
      this.scrollToTop()
      this.categoryChanged(newCat)
    }
  },
  metaInfo () {
    return {
      title: this.pageTitle()
    }
  },
  created () {
    this.showHideFeed()
    this.setPostDefaultOptions()
  },
  mounted () {
    this.getFeed()
    this.$refs.overlayViewComp.triggerPopup()
  },
  methods: {
    updateFeedPreference () {
      this.noMoreFeed = false
      // this.showHideFeed()
      // this.showNotification('Updating, please wait...', 'warn')
      auth.updateCurrentUser(this.currentUser)
        .then((data) => {
          this.showNotification('Preferences updated successfully.', 'success')
          this.reloadFeed()
        })
        .catch((pErr) => {
          this.showNotification('Soemthing went wrong while updating your preferences', 'error')
        })
    },
    reloadFeed () {
      this.resetFeed()
      this.getFeed()
    },
    resetFeed () {
      this.feed = []
      this.noMoreFeed = false
      this.currentPage = 1
    },
    getFeed () {
      if (this.currentPage === 1) {
        this.preloader = true
      }
      let that = this
      this.$options.service.getFeed(that.getCat(), that.currentPage)
        .then((data) => {
          that.afterFeedLoad(data)
        })
        .catch((feedError) => {
          alert('Something went wrong file fetching the feed under this tag.')
        })
    },
    categoryChanged (newCat) {
      this.resetFeed()
      this.setDocumentTitle(newCat)
      this.getFeed()
    },
    getPostsIds () {
      let arr = []
      for (let i in this.feed) {
        arr.push(this.feed[i].id)
      }
      return arr
    },
    preventDuplicates (posts) {
      if (this.feed.length) {
        let uniquePosts = []
        let postIds = this.getPostsIds()
        for (let i in posts) {
          if (postIds.indexOf(posts[i].id) === -1) {
            uniquePosts.push(posts[i])
          }
        }
        return uniquePosts
      }
      return posts
    },
    afterFeedLoad (data) {
      this.feed = this.feed.concat(this.preventDuplicates(data.posts))
      if ('nextPage' in data && data.nextPage) {
        this.currentPage = data.nextPage
      } else {
        this.currentPage++
      }
      this.preloader = false
      this.loadMorePreloader = false
      if (!data.posts.length) {
        this.noMoreFeed = true
      } else {
        this.disableLoadMore = false
      }
    },
    prepareFeed (posts) {
      /* for (let i in posts) {
        // add new proprties
        this.$set(posts[i], 'show', true)
        this.$set(posts[i], 'showComments', true)
      } */
      return posts
    },
    showHideFeed () {
      for (var i in this.feed) {
        if (this.feed[i]['AdOption']) {
          this.feed[i]['show'] = this.currentUser.adsEnabled
        } else {
          this.feed[i]['show'] = this.currentUser.feedEnabled
        }
      }
    },
    getTitle () {
      return this.$route.params.cat
    },
    pageTitle (breadcrumb = false) {
      var t = this.getTitle()
      return !t || t === 'all' ? (breadcrumb ? 'Main Feed' : 'Home') : t
    },
    postStatus (feed) {
      this.feed.unshift(feed)
    },
    setPostDefaultOptions () {
      this.postOptionsDefault = this.postOptions[0]
    },
    getCat () {
      return this.$route.params.cat || 'all'
    },
    triggerPostPopup (postOptions) {
      var max = 1000000
      var min = 1
      postOptions.showPopup = Math.floor(Math.random() * (+max - +min)) + +min
      this.postOptionsDefault = postOptions
    },
    loadMoreFeed () {
      this.loadMorePreloader = true
      this.disableLoadMore = true
      this.getFeed()
    }
  }
}
</script>

<style lang="stylus">
</style>
