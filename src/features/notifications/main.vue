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
        li.breadcrumb-item.active Notifications
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
  .row(v-show="pagePreloader")
    // Column
    .col-12.text-center.p-l-0.p-r-0
      .card
        .card-body.page-preloader
          <preloader v-show="pagePreloader"></preloader>
          <notifications v-show="!pagePreloader" :notificationData = "notificationData"></notifications>

  .row(v-show="!pagePreloader")
    // Column
    .col-12.p-l-0.p-r-0
      .card
        .card-body.mailbox.notifications-page-main-wrap
          <notifications :notificationData = "notificationData"></notifications>
          div.load-more-posts.text-center(v-infinite-scroll="loadMoreNotifications" infinite-scroll-disabled="disableLoadMore" infinite-scroll-distance="300")
            <preloader v-show="false"></preloader>
            span(v-show="false")
              i.mdi.mdi-emoticon-sad.m-r-5
              | No more feed
</template>
<script>
import Notifications from './../../components/notifications/notifications'
import Preloader from './../../components/preloader'
import auth from '@/auth/helpers'

export default {
  name: 'NotificationsPage',
  components: {
    Notifications,
    Preloader
  },
  data () {
    return {
      pagePreloader: true,
      notificationData: [],
      disableLoadMore: true,
      page: 1
    }
  },
  mounted () {
    this.disableLoadMore = true
    auth.getNotifications()
      .then((data) => {
        this.pagePreloader = false
        this.notificationData = this.notificationData.concat(data.notifications)
        this.disableLoadMore = false
      })
      .catch((nErr) => {
        alert('Something went wrong while fetching your notifications')
      })
  },
  methods: {
    loadMoreNotifications () {
    }
  }
}
</script>
