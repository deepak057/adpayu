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
        .message-center
          <template v-if="!loading">
          a.notification-block(href='javascript:void(0)' v-for="(noti, i) in notifications")
            <router-link tag="span" class="pointer" :to="userProfileLink(noti.sender.id)">
              img.img-circle(:src="getMedia(noti.sender.pic)")
            </router-link>
            .mail-contnet.m-l-10
              h5
                <router-link tag="span" class="pointer" :to="userProfileLink(noti.sender.id)">
                  | {{userName(noti.sender)}}
                </router-link>
              span.mail-desc
                | {{noti.text}}
                span.m-l-5.pointer(v-show="getPostId(noti)" @click="triggerPostPopup(noti)")
                  | <u>{{getPostType(noti)}}</u>
              span.time.text-muted
                <timeago :datetime="noti['createdAt']" :auto-update="60" :title="noti['createdAt'] | date"></timeago>
              <template v-if="isFriendRequest(noti)">
              <template v-if="!frienshipSettled">
              button.btn.btn-success.btn-sm(@click="handleFriendRequest('add', i)") Accept
              button.btn.btn-sm(@click="handleFriendRequest('remove', i)") Ignore
              </template>
              <template v-if="frienshipSettled">
                span.text-muted.text-success.small
                  i.mdi.mdi-check.m-r-5
                  | You are friends now
              </template>
              </template>
          h5.text-center.m-t-20.text-muted(v-if="!notifications.length") No Notifications
          </template>
          .text-center.m-t-20(v-if="loading")
            <preloader ></preloader>
      li
        a.nav-link.text-center(href='javascript:void(0);')
          strong Check all notifications
          i.fa.fa-angle-right
  <post-popup ref="postPopup"></post-popup>
// ==============================================================
// End Comment
// ==============================================================
</template>
<script>
import Preloader from './preloader'
import PostPopup from './post-popup'
import Service from './service'
import mixin from '../globals/mixin.js'
import auth from '@/auth/helpers'

export default {
  name: 'Notifications',
  service: new Service(),
  components: {
    Preloader,
    PostPopup
  },
  mixins: [mixin],
  data () {
    return {
      loading: true,
      notifications: [],
      frienshipSettled: false,
      unseen: 0,
      showNotifications: false
    }
  },
  watch: {
    notifications (newV) {
      this.notifications = this.prepareNotification()
    }
  },
  mounted () {
    this.$options.service.getNotifications()
      .then((data) => {
        this.notifications = data.notifications
        this.loading = false
      })
      .catch((errNoti) => {
        alert('Something went wrong while getting your notifications')
      })
  },
  methods: {
    prepareNotification () {
      this.unseen = 0
      for (let i in this.notifications) {
        this.unseen = !this.notifications[i].seen ? this.unseen + 1 : this.unseen
        switch (this.notifications[i].type) {
          case 'SENT_FRIEND_REQUEST':
            this.notifications[i].text = 'Sent you a friend request'
            break
          case 'COMMENT_ON_POST':
            this.notifications[i].text = this.getPostType(this.notifications[i]) === 'question' ? 'wrote answer to your' : 'commented on your'
            break
          case 'LIKE_ON_POST':
            this.notifications[i].text = 'loved your'
            break
          case 'LIKE_ON_COMMENT':
            this.notifications[i].text = 'loved your ' + (this.getPostType(this.notifications[i]) === 'question' ? 'answer' : 'comment') + ' on'
            break
          default:
            this.notifications[i].text = 'Accepted your friend request'
            break
        }
      }
      return this.notifications
    },
    isFriendRequest (noti) {
      return noti.type === 'SENT_FRIEND_REQUEST'
    },
    handleFriendRequest (action, notiIndex) {
      let friendId = this.notifications[notiIndex].sender.id
      if (action === 'remove') {
        this.notifications.splice(notiIndex, 1)
      } else {
        this.frienshipSettled = true
      }
      auth.friendshipUpdate(action, friendId)
        .then((data) => {})
        .catch((friendErr) => {
          alert('Something went wrong, please try again later')
        })
    },
    toggleNotificationsDropdown () {
      this.unseen = 0
      this.showNotifications = !this.showNotifications
    },
    triggerPostPopup (noti) {
      this.showNotifications = false
      this.$refs.postPopup.triggerPostpopup(this.getPostId(noti))
    },
    getNotiMeta (noti) {
      if (!noti.meta) {
        return false
      }
      let meta
      try {
        meta = JSON.parse(noti.meta)
      } catch (e) {
        return false
      }
      return meta
    },
    getPostType (noti) {
      let meta = this.getNotiMeta(noti)
      if ('postType' in meta) {
        return meta.postType === 'text' ? 'status' : meta.postType
      }
      return false
    },
    getPostId (noti) {
      let meta = this.getNotiMeta(noti)
      if (meta && 'postId' in meta) {
        return meta.postId
      } else {
        return false
      }
    }
  }
}
</script>
