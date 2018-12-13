<template lang="pug">
li.nav-item.dropdown(:class="{'show': showNotifications}")
  a.nav-link.text-muted.text-muted.waves-effect.waves-dark(href='javascript:void(0)' @click="toggleNotificationsDropdown()")
    i.mdi.mdi-message
    .notify(v-show="unseen")
      span.heartbit
      span.point
  .dropdown-menu.dropdown-menu-right.mailbox.scale-up(:class="{'show': showNotifications}")
    ul
      li
        .drop-title Notifications
      li
        <template v-show="!loading">
        <notifications :notificationData = "notificationData"></notifications>
        </template>
        .text-center.m-t-20(v-if="loading")
          <preloader ></preloader>
      li
        <router-link to="/notifications" @click.native="hideMenu()" class="nav-link text-center">
          strong Check all notifications
          i.fa.fa-angle-right
        </router-link>
// ==============================================================
// End Comment
// ==============================================================
</template>
<script>
import Preloader from '../preloader'
import auth from '@/auth/helpers'
import Notifications from './notifications'

export default {
  name: 'NotificationDropdown',
  components: {
    Preloader,
    Notifications
  },
  data () {
    return {
      loading: true,
      notificationData: [],
      unseen: 0,
      showNotifications: false
    }
  },
  watch: {
    notificationData () {
      for (let i in this.notificationData) {
        this.unseen = !this.notificationData[i].seen ? (this.unseen + 1) : this.unseen
      }
    }
  },
  mounted () {
    auth.getNotifications()
      .then((data) => {
        this.notificationData = this.notificationData.concat(data.notifications)
        this.loading = false
      })
      .catch((errNoti) => {
        alert('Something went wrong while getting your notifications')
      })
  },
  methods: {
    toggleNotificationsDropdown () {
      this.unseen = 0
      this.showNotifications = !this.showNotifications
    },
    hideMenu () {
      this.showNotifications = false
    }
  }
}
</script>
