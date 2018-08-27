<template  lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0 {{cat}}
      ol.breadcrumb
        li.breadcrumb-item
          a(href='javascript:void(0)') Home
        li.breadcrumb-item.active {{cat}}
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
              .ribbon.ribbon-bookmark.ribbon-warning.f-w-400.cursor-hand(v-if="f['type']=='ad'" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getCPVText(f['cpv'])") Sponsored + $ {{f['cpv']}}
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
                    .col-lg-6.col-md-6
                      span.badge.badge-info.ml-auto.f-w-400.pr-t--2.f-s-12.bg-999.cursor-hand(data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getCPVVText(f['cpc'])") + $ {{f['cpc']}}
                        i.mdi.mdi-information.m-l-4.cursor-hand
                  .row(v-if="f['imgs'].length > 0")
                    .col-lg-3.col-md-6.m-b-20(v-for="img in f['imgs']")
                      img.img-responsive.radius(:src="img")
                  p(v-if="f['cpc']")
                    a.m-r-5(href="#") Get The Product Now
                    span.badge.badge-info.ml-auto.f-w-400.pr-t--2.f-s-12.bg-999.cursor-hand(data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getCPCText(f['cpc'])") + $ {{f['cpc']}}
                      i.mdi.mdi-information.m-l-4
                  .like-comm
                    a.link.m-r-10(href='javascript:void(0)' @click="toggleComments(f)") {{f['comments'].length}} {{f['comments'].length>1? "Comments": 'comment'}}
                    a.link.m-r-10(href='javascript:void(0)' @click="loveToggle(f)" title="Click to like or unlike it")
                      i.text-danger(:class="{'ti-heart pr-t-2': !f['love'].loved, 'fa fa-heart': f['love'].loved}")
                      |  {{f['love'].total}} {{f['love'].loved? 'Loved': 'Love'}}
              .comment-widgets(v-show="f['showComments']")
                .d-flex.flex-row.comment-row(v-for="(comment, n) in f['comments']")
                  .p-2
                    span.round
                      img(src='static/assets/images/users/1.jpg', alt='user', width='50')
                  .comment-text.w-100
                    h5 James Anderson
                    p.m-b-5
                      | {{comment.comment}}
                    .comment-footer
                      span.text-muted.pull-right {{comment.date}}
                      span.action-icons
                        a(href='javascript:void(0)')
                          i.ti-pencil-alt
                        a(href='javascript:void(0)' @click='deleteComment(f, n)')
                          i.ti-trash
                        a(href='javascript:void(0)')
                          i.ti-heart
                .row.m-t-10
                  .col-11
                    textarea.form-control.b-0(placeholder='Type your message here' v-model.trim="newCommentText" @keyup.enter="leaveComment(f)")
                  .col-1.text-right
                    button.btn.btn-info.btn-circle.btn-lg(type='button' @click='leaveComment(f)')
                      i.fa.fa-paper-plane-o.pr-t--3-l--3
              hr
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
        type: 'newsFeed',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper',
        imgs: [
          'static/assets/images/big/img1.jpg'
        ],
        cpv: 0.2,
        cpc: 0,
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
        type: 'ad',
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
    this.showHideFeed()
  },
  mounted () {
  },
  methods: {
    getCPCText (cost) {
      return 'You wil get $' + cost + ' for clicking this link'
    },
    getCPVText (cost) {
      return 'You have got $' + cost + ' for seeing this ad'
    },
    getCPVVText (cost) {
      return 'You will get $' + cost + ' for watching this video'
    },
    showHideFeed () {
      for (var i in this.feed) {
        if (this.feed[i]['type'] === 'ad') {
          this.feed[i]['show'] = this.adEnabled
        } else {
          this.feed[i]['show'] = this.newsFeedEnabled
        }
      }
    },
    loveToggle (feedItem) {
      if (feedItem['love'].loved) {
        feedItem['love'].total--
      } else {
        feedItem['love'].total++
      }
      feedItem['love'].loved = !feedItem['love'].loved
    },
    toggleComments (feedItem) {
      feedItem['showComments'] = !feedItem['showComments']
    },
    leaveComment (feedItem) {
      if (this.newCommentText) {
        this.$set(feedItem['comments'], feedItem['comments'].length, {uid: 1, comment: this.newCommentText, date: '21 August, 2018'})
        this.newCommentText = ''
      }
    },
    deleteComment (feedItem, index_) {
      feedItem['comments'].splice(index_, 1)
    }
  }
}
</script>

<style lang="stylus">
</style>
