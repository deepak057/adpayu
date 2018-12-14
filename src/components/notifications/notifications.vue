<template lang="pug">
.message-center
  a.notification-block(href='javascript:void(0)' v-for="(noti, i) in notificationData" :class="{'grey-back': !noti.seen}")
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
  h5.text-center.m-t-20.text-muted(v-if="!notificationData.length") No Notifications
  <post-popup ref="postPopup"></post-popup>
</template>
<script>
import PostPopup from '../post-popup'
import mixin from '../../globals/mixin.js'
import auth from '@/auth/helpers'

export default {
  name: 'Notifications',
  components: {
    PostPopup
  },
  mixins: [mixin],
  props: {
    notificationData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      frienshipSettled: false,
      unseen: 0
    }
  },
  watch: {
    notificationData (newVal) {
      this.notificationData = this.prepareNotification()
    }
  },
  methods: {
    prepareNotification () {
      this.unseen = 0
      for (let i in this.notificationData) {
        this.unseen = !this.notificationData[i].seen ? this.unseen + 1 : this.unseen
        switch (this.notificationData[i].type) {
          case 'SENT_FRIEND_REQUEST':
            this.notificationData[i].text = 'Sent you a friend request'
            break
          case 'COMMENT_ON_POST':
            this.notificationData[i].text = this.getPostType(this.notificationData[i]) === 'question' ? 'wrote answer to your' : 'commented on your'
            break
          case 'LIKE_ON_POST':
            this.notificationData[i].text = 'loved your'
            break
          case 'LIKE_ON_COMMENT':
            this.notificationData[i].text = 'loved your ' + (this.getPostType(this.notificationData[i]) === 'question' ? 'answer' : 'comment') + ' on'
            break
          default:
            this.notificationData[i].text = 'Accepted your friend request'
            break
        }
      }
      return this.notificationData
    },
    isFriendRequest (noti) {
      return noti.type === 'SENT_FRIEND_REQUEST'
    },
    handleFriendRequest (action, notiIndex) {
      let friendId = this.notificationData[notiIndex].sender.id
      if (action === 'remove') {
        this.notificationData.splice(notiIndex, 1)
      } else {
        this.frienshipSettled = true
      }
      auth.friendshipUpdate(action, friendId)
        .then((data) => {})
        .catch((friendErr) => {
          alert('Something went wrong, please try again later')
        })
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
      if (!meta) {
        return false
      }
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
