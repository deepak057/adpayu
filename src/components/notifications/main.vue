<template lang="pug">
li.nav-item.dropdown(:class="{'show': showNotifications}" v-on-clickaway="hideMenu")
  a.nav-link.text-muted.text-muted.waves-effect.waves-dark(href='javascript:void(0)' @click="toggleNotificationsDropdown()")
    i.mdi.mdi-message
    .notify(v-show="unseenIds.length")
      span.heartbit
      span.point
  .dropdown-menu.dropdown-menu-right.mailbox.scale-up(:class="{'show': showNotifications}")
    ul
      li
        .drop-title Notifications
      li
        <template v-show="!loading">
        <user-notifications :notificationData = "notificationData"></user-notifications>
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
import UserNotifications from './notifications'
import Service from './service'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'NotificationDropdown',
  service: new Service(),
  components: {
    Preloader,
    UserNotifications
  },
  directives: {
    onClickaway: onClickaway
  },
  data () {
    return {
      loading: true,
      notificationData: [],
      unseenIds: [],
      showNotifications: false
    }
  },
  watch: {
    notificationData () {
      for (let i in this.notificationData) {
        if (!this.notificationData[i].seen) {
          this.unseenIds.push(this.notificationData[i].id)
        }
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
  events: {
    clickedOutside (e) {
      this.hideMenu()
    }
  },
  methods: {
    toggleNotificationsDropdown () {
      this.showNotifications = !this.showNotifications
      this.markSeen()
    },
    markSeen () {
      if (this.unseenIds.length) {
        this.$options.service.markSeen(this.unseenIds)
          .then((data) => {
            this.unseenIds = []
          })
          .catch((nErr) => {
            alert('Something went wrong while marking your notifications as seen')
          })
      }
    },
    hideMenu () {
      this.showNotifications = false
    },
    checkMenu () {
      if (this.showNotifications) {
        this.hideMenu()
      }
    }
  }
}
</script>
