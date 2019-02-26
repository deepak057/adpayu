<template  lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0 {{pageTitle() | capitalize}}
      ol.breadcrumb
        li.breadcrumb-item
          <router-link to="/">
            | Home
          </router-link>
        li.breadcrumb-item.active {{pageTitle() | capitalize}}
    .col-md-6.col-12.align-self-center.m-t-10.feed-ads-options-wrap
      label.m-r-5(for='show-feed-option')
        i.mdi.mdi-newspaper
        |  News Feed
      <toggle-button v-model="currentUser.feedEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5"></toggle-button>
      label.m-l-10(for='show-ads-option')
        i.mdi.mdi-currency-usd
        | Show ads
      <toggle-button v-model="currentUser.adsEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
    .col-md-2.col-12.align-self-center
      h3.m-b-0.font-light $3249
      h5.text-muted.m-b-0 Total Revenue
  // ==============================================================
  // End Bread crumb and right sidebar toggle
  // ==============================================================
  // ==============================================================
  // Start Page Content
  // ==============================================================
  .row.dashboard-feed-view
    .col-12.feed-container-col
      .card
        .card-body
          .btn-group.btn-add-feed
            button.btn.waves-effect.waves-light.btn-outline-secondary.dropdown-toggle(type="button"  data-placement="left" title="Click to post something" data-toggle='dropdown', aria-haspopup='true', aria-expanded='true')
              i.fa.fa-plus.m-r-5
              | Post Somehting
            .dropdown-menu(x-placement='bottom-start')
              a.dropdown-item(href='javascript:void(0)' v-for="pOpt in postOptions" @click="triggerPostPopup(pOpt)")
                i.fa.m-r-5(:class="pOpt.icon")
                | {{pOpt.label}}
          .feed-preloader(v-show="preloader")
            <preloader></preloader>
          <feed v-if="!preloader" :feed="feed"></feed>
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
  // ==============================================================
  // End PAge Content
  // ==============================================================
  // ==============================================================
  // Right sidebar
  // ==============================================================
  // .right-sidebar
  .right-sidebar
    .slimscrollright
      .rpanel-title
        | Chat
        span
          i.ti-close.right-side-toggle
      .r-panel-body
        ul.m-t-20.chatonline
          li
            b Friends
          li
            a(href='javascript:void(0)')
              img.img-circle(src='static/assets/images/users/1.jpg', alt='user-img')
              span
                | Varun Dhavan
                small.text-success online
          li
            a(href='javascript:void(0)')
              img.img-circle(src='static/assets/images/users/2.jpg', alt='user-img')
              span
                | Genelia Deshmukh
                small.text-warning Away
          li
            a(href='javascript:void(0)')
              img.img-circle(src='static/assets/images/users/3.jpg', alt='user-img')
              span
                | Ritesh Deshmukh
                small.text-danger Busy
          li
            a(href='javascript:void(0)')
              img.img-circle(src='static/assets/images/users/4.jpg', alt='user-img')
              span
                | Arijit Sinh
                small.text-muted Offline
          li
            a(href='javascript:void(0)')
              img.img-circle(src='static/assets/images/users/5.jpg', alt='user-img')
              span
                | Govinda Star
                small.text-success online
          li
            a(href='javascript:void(0)')
              img.img-circle(src='static/assets/images/users/6.jpg', alt='user-img')
              span
                | John Abraham
                small.text-success online
          li
            a(href='javascript:void(0)')
              img.img-circle(src='static/assets/images/users/7.jpg', alt='user-img')
              span
                | Hritik Roshan
                small.text-success online
          li
            a(href='javascript:void(0)')
              img.img-circle(src='static/assets/images/users/8.jpg', alt='user-img')
              span
                | Pwandeep rajan
                small.text-success online
  <status-update @statusPosted="postStatus" :options="postOptionsDefault"></status-update>
  // ==============================================================
  // End Right sidebar
  // ==============================================================
</template>

<script>
import mixin from '../../globals/mixin.js'
import Preloader from './../../components/preloader'
import StatusUpdate from './components/status-update/main'
import Feed from './../../components/feed/feed'
import Service from './service'
import auth from '@/auth/helpers'

export default {
  name: 'Dashboard',
  service: new Service(),
  components: {
    StatusUpdate,
    Feed,
    Preloader
  },
  mixins: [mixin],
  props: {
    cat: {
      type: String,
      default: 'Dashboard'
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
    feed () {
      this.feed = this.prepareFeed(this.feed)
    },
    '$route.params.cat' (newCat) {
      this.scrollToTop()
      this.categoryChanged(newCat)
    }
  },
  created () {
    this.setDocumentTitle()
    this.showHideFeed()
    this.setPostDefaultOptions()
  },
  mounted () {
    this.getFeed()
  },
  methods: {
    updateFeedPreference () {
      // this.showHideFeed()
      this.showNotification('Updating, please wait...', 'warn')
      auth.updateCurrentUser(this.currentUser)
        .then((data) => {
          this.feed = []
          this.showNotification('Preferences updated successfully.', 'success')
          this.currentPage = 1
          this.getFeed()
        })
        .catch((pErr) => {
          this.showNotification('Soemthing went wrong while updating your preferences', 'error')
        })
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
      this.feed = []
      this.noMoreFeed = false
      this.currentPage = 1
      this.setDocumentTitle(newCat)
      this.getFeed()
    },
    afterFeedLoad (data) {
      this.feed = this.feed.concat(data.posts)
      this.currentPage++
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
        this.$set(posts[i], 'showComments', false)
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
    pageTitle () {
      var t = this.getTitle()
      return !t || t === 'all' ? 'Dashboard' : t
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
