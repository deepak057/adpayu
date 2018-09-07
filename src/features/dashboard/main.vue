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
          a(href='javascript:void(0)') Home
        li.breadcrumb-item.active {{pageTitle() | capitalize}}
    .col-md-6.col-12.align-self-center.m-t-10.feed-ads-options-wrap
      label.m-r-5(for='show-feed-option')
        i.mdi.mdi-newspaper
        |  News Feed
      <toggle-button v-model="newsFeedEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5"></toggle-button>
      label.m-l-10(for='show-ads-option')
        i.mdi.mdi-currency-usd
        | Show ads
      <toggle-button v-model="adEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
    .col-md-2.col-12.align-self-center
      h3.m-b-0.font-light $3249
      h5.text-muted.m-b-0 Total Revenue
  // ==============================================================
  // End Bread crumb and right sidebar toggle
  // ==============================================================
  // ==============================================================
  // Start Page Content
  // ==============================================================
  .row
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
          <feed :feed="feed"></feed>
          .nothing-to-show(v-show="!newsFeedEnabled && !adEnabled")
            .jumbotron.white-back.text-center
              h1.display-3 Dead End!
              p.lead
                | You need to enable either News Feed or Ads to see something here.
              hr.my-4
              p
                | Currently, you have disabled both.
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
import StatusUpdate from './components/status-update/main'
import Feed from './components/feed/feed'

export default {
  name: 'Dashboard',
  components: {
    StatusUpdate,
    Feed
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
        {
          type: 'picture',
          label: 'Pictures',
          icon: 'fa-image',
          popupTitle: 'Post Pictures',
          buttonLabel: 'Post',
          showPopup: false

        },
        {
          type: 'video',
          label: 'Video',
          icon: 'fa-video-camera',
          popupTitle: 'Post a video',
          buttonLabel: 'Post',
          showPopup: false

        }
      ],
      feed: [{
        type: 'text',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper',
        imgs: [
          'static/assets/images/big/img1.jpg',
          'static/assets/images/big/img2.jpg',
          'static/assets/images/big/img3.jpg',
          'static/assets/images/big/img4.jpg'
        ],
        adOptions: {
          postIsAd: true,
          cpv: 0.2,
          cpc: 1
        },
        question: false,
        video: false,
        show: true,
        love: {
          total: 2,
          loved: true
        },
        showComments: false,
        comments: [
          {
            uid: 2,
            comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',
            date: 'April 14, 2018'
          },
          {
            uid: 1,
            comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',
            date: 'April 12, 2018'
          }
        ]
      },
      {
        type: 'question',
        content: '',
        imgs: [],
        adOptions: {
          postIsAd: false,
          cpv: 0,
          cpc: 0
        },
        question: {
          question: 'What are some things that make or have made you lose faith in humanity?',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper'
        },
        video: false,
        show: true,
        love: {
          total: 5,
          loved: false
        },
        showComments: false,
        comments: []
      },
      {
        type: 'video',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper',
        imgs: [
        ],
        adOptions: {
          postIsAd: true,
          cpv: 0.2,
          cpc: 1
        },
        question: false,
        video: {
          sources: [{
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4'
          }
          ],
          options: {
            autoplay: false,
            volume: 0.6,
            poster: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
          }
        },
        show: true,
        love: {
          total: 2,
          loved: false
        },
        showComments: false,
        comments: [
          {
            uid: 4,
            comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',
            date: 'April 14, 2018'
          }
        ]
      }
      ]
    }
  },
  watch: {
    newsFeedEnabled () {
      this.showHideFeed()
    },
    adEnabled () {
      this.showHideFeed()
    }
  },
  created () {
    this.setDocumentTitle()
    this.showHideFeed()
    this.setPostDefaultOptions()
  },
  mounted () {
  },
  methods: {
    showHideFeed () {
      for (var i in this.feed) {
        if (this.feed[i]['adOptions'].postIsAd) {
          this.feed[i]['show'] = this.adEnabled
        } else {
          this.feed[i]['show'] = this.newsFeedEnabled
        }
      }
    },
    getTitle () {
      return this.$route.params.cat
    },
    setDocumentTitle () {
      var t_ = this.getTitle()
      document.title = t_.charAt(0).toUpperCase() + t_.slice(1)
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
    triggerPostPopup (postOptions) {
      var max = 1000000
      var min = 1
      postOptions.showPopup = Math.floor(Math.random() * (+max - +min)) + +min
      this.postOptionsDefault = postOptions
    }
  }
}
</script>

<style lang="stylus">
</style>
