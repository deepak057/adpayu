<template lang="pug">
.container-fluid
  <page-title heading="Notifications"/>
  // Start Page Content
  // ==============================================================
  // Row
  .row(v-show="pagePreloader")
    // Column
    .col-12.text-center.p-l-0.p-r-0
      .card
        .card-body.page-preloader
          <preloader v-show="pagePreloader"></preloader>
  .row(v-show="!pagePreloader")
    // Column
    .col-12.p-l-0.p-r-0
      .card
        .card-body.mailbox.notifications-page-main-wrap.min-h-400
          <user-notifications :notificationData = "notificationData"></user-notifications>
          div.m-t-20.load-more-posts.text-center(v-infinite-scroll="loadMoreNotifications" infinite-scroll-disabled="disableLoadMore" infinite-scroll-distance="300")
            <preloader v-show="loadMoreLoader"></preloader>
            span(v-show="noMoreNotifications && notificationData.length")
              i.mdi.mdi-emoticon-sad.m-r-5
              | No more Notifications
</template>
<script>
import UserNotifications from './../../components/notifications/notifications'
import Preloader from './../../components/preloader'
import PageTitle from './../../components/page-title'
import auth from '@/auth/helpers'

export default {
  name: 'NotificationsPage',
  components: {
    UserNotifications,
    Preloader,
    PageTitle
  },
  data () {
    return {
      pagePreloader: true,
      notificationData: [],
      disableLoadMore: true,
      loadMoreLoader: false,
      page: 1,
      noMoreNotifications: false
    }
  },
  mounted () {
    this.fetchNotifications()
  },
  methods: {
    fetchNotifications () {
      this.disableLoadMore = true
      auth.getNotifications(this.page, true)
        .then((data) => {
          this.pagePreloader = false
          this.loadMoreLoader = false
          if (data.notifications.length) {
            this.notificationData = this.notificationData.concat(data.notifications)
            this.disableLoadMore = false
            this.page++
          } else {
            this.noMoreNotifications = true
          }
        })
        .catch((nErr) => {
          alert('Something went wrong while fetching your notifications')
        })
    },
    loadMoreNotifications () {
      this.loadMoreLoader = true
      this.fetchNotifications()
    }
  }
}
</script>
