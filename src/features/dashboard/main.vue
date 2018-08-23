<template  lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0 Dashboard
      ol.breadcrumb
        li.breadcrumb-item
          a(href='javascript:void(0)') Home
        li.breadcrumb-item.active Dashboard
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
          .profiletimeline
            .sl-item(v-for="f in feed" :class="f['type']=='ad'? 'ribbon-wrapper': '' " v-show="f['show']")
              .ribbon.ribbon-bookmark.ribbon-warning.f-w-400(v-if="f['type']=='ad'") Sponsored + $ {{f['cpv']}}
                 i.mdi.mdi-information.m-l-5.cursor-hand
              .sl-left
                img.img-circle(src='static/assets/images/users/1.jpg', alt='user')
              .sl-right
                div
                  a.link(href='#') John Doe
                  span.sl-date  5 minutes ago
                  p.m-t-10(v-if="f['content']") {{f['content']}}
                  .row.m-0.feed-video-wrap(v-if="f['video']")
                    .col-lg-6.col-md-6.video-container
                      <my-video :sources="f['video'].sources" :options="f['video'].options"></my-video>
                  .row(v-if="f['imgs'].length > 0")
                    .col-lg-3.col-md-6.m-b-20(v-for="img in f['imgs']")
                      img.img-responsive.radius(:src="img")
                  p(v-if="f['cpc']")
                    a.m-r-5(href="#") Get The Product Now
                    span.badge.badge-info.ml-auto.f-w-400.pr-t--2.f-s-12.bg-999 + $ {{f['cpc']}}
                      i.mdi.mdi-information.m-l-4.cursor-hand
                  .like-comm
                    a.link.m-r-10(href='javascript:void(0)') 2 comment
                    a.link.m-r-10(href='javascript:void(0)')
                      i.fa.fa-heart.text-danger
                      |  5 Love
              hr
          .nothing-to-show(v-show="!newsFeedEnabled && !adEnabled")
            .jumbotron.white-back.text-center
              h1.display-3 Dead End!
              p.lead
                | You need to enable either News Feed or ads to see something here.
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
  // ==============================================================
  // End Right sidebar
  // ==============================================================
</template>

<script>
import myVideo from 'vue-video'

export default {
  name: 'Dashboard',

  components: {
    myVideo
  },
  data () {
    return {
      adEnabled: true,
      newsFeedEnabled: true,
      feed: [{
        type: 'ad',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper',
        imgs: [
          'static/assets/images/big/img1.jpg',
          'static/assets/images/big/img2.jpg',
          'static/assets/images/big/img3.jpg',
          'static/assets/images/big/img4.jpg'
        ],
        cpv: 0.2,
        cpc: 1,
        video: false,
        show: true
      },
      {
        type: 'newsFeed',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper',
        imgs: [
          'static/assets/images/big/img1.jpg'
        ],
        cpv: 0.2,
        cpc: 1,
        video: false,
        show: true
      },
      {
        type: 'newsFeed',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper',
        imgs: [
        ],
        cpv: 0.2,
        cpc: 1,
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
        show: true
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
    this.showHideFeed()
  },
  mounted () {
  },
  methods: {
    showHideFeed () {
      for (var i in this.feed) {
        if (this.feed[i]['type'] === 'ad') {
          this.feed[i]['show'] = this.adEnabled
        } else {
          this.feed[i]['show'] = this.newsFeedEnabled
        }
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
