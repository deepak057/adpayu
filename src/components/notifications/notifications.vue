<template lang="pug">
.noti-dropdown-wrap.message-center
  a.notification-block(href='javascript:void(0)' v-for="(noti, i) in notificationData" :class="{'grey-back': !noti.seen}")
    <router-link tag="span" class="pointer" :to="userProfileLink(noti.sender.id)">
      img.img-circle(:src="getMedia(noti.sender.pic)")
    </router-link>
    .mail-contnet.m-l-10.w-77
      h5
        <template v-if="!noti.heading">
        <router-link tag="span" class="pointer" :to="userProfileLink(noti.sender.id)">
          | {{userName(noti.sender)}}
        </router-link>
        </template>
        <template v-if="noti.heading">
          | {{noti.heading}}
        </template>
        span.mail-desc
          <template v-if="noti.linkObject0">
            <router-link tag="span" :to="noti.linkObject0.url" class="pointer">
              | Your <u>{{noti.linkObject0.label}}</u>
            </router-link>
          </template>
          | {{noti.text}}
          span.m-l-5.pointer(v-if="getPostId(noti) && !noti.linkObject" @click="triggerPostPopup(noti)")
            | <u>{{getPostType(noti)}}</u>
          span.m-l-5.pointer(v-if="noti.linkObject")
            <router-link tag="span" :to="noti.linkObject.url">
              | <u>{{noti.linkObject.label}}</u>
            </router-link>
        span.time.text-muted
          <timeago :datetime="noti['createdAt']" :auto-update="60" :title="noti['createdAt'] | date"></timeago>
        <template v-if="isFriendRequest(noti)">
        <template v-if="!noti.frienshipSettled">
        button.btn.btn-success.btn-sm(@click="handleFriendRequest('add', i)") Accept
        button.btn.btn-sm(@click="handleFriendRequest('remove', i)") Ignore
        </template>
        <template v-if="noti.frienshipSettled">
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
  name: 'UserNotifications',
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
      let meta, linkObj
      for (let i in this.notificationData) {
        /* add a property to keep track of freindship status
        ** on friendship requests
        */
        if (!this.notificationData[i].hasOwnProperty('frienshipSettled')) {
          this.$set(this.notificationData[i], 'frienshipSettled', false)
        }
        this.unseen = !this.notificationData[i].seen ? this.unseen + 1 : this.unseen
        switch (this.notificationData[i].type) {
          case 'SENT_FRIEND_REQUEST':
            this.notificationData[i].text = 'Sent you a friend request'
            break
          case 'COMMENT_ON_POST':
            this.notificationData[i].text = this.getPostType(this.notificationData[i]) === 'question' ? 'left an answer on your' : 'commented on your'
            break
          case 'LIKE_ON_POST':
            this.notificationData[i].text = 'loved your'
            break
          case 'LIKE_ON_COMMENT':
            this.notificationData[i].text = 'loved your ' + (this.getPostType(this.notificationData[i]) === 'question' ? 'answer' : 'comment') + ' on'
            break
          case 'FRIENDSHIP_ACCEPTED':
            this.notificationData[i].text = 'Accepted your friend request'
            break
          case 'AD_TARGET_COMPLETED':
            this.notificationData[i].heading = 'Ad completed running'
            this.notificationData[i].text = 'Budget is exhausted on your'
            break
          case 'AD_TARGET_MANIPULATED':
            this.notificationData[i].heading = 'Ad targets manipulated'
            meta = this.getNotiMeta(this.notificationData[i])
            this.notificationData[i].text = meta.targetsManipulation.impressionsAdded + ' impressions added and ' + meta.targetsManipulation.ViewOrClickRemoved + ' ' + meta.targetsManipulation.removedAction + ' removed in the targets of your'
            break
          case 'VIDEO_COMMENT_ACCEPTED':
            this.notificationData[i].heading = 'Video comment approved'
            meta = this.getNotiMeta(this.notificationData[i])
            this.notificationData[i].text = '$' + meta.amountUSD + ' (' + meta.amountINR + ' INR) added to your account for your'
            linkObj = {
              label: 'comment',
              url: this.getCommentLink(meta.commentId)
            }
            this.$set(this.notificationData[i], 'linkObject', linkObj)
            break
          case 'VIDEO_COMMENT_REJECTED':
            this.notificationData[i].heading = 'Video comment rejected'
            meta = this.getNotiMeta(this.notificationData[i])
            this.notificationData[i].text = 'You will not be paid for your video comment on'
            break
          case 'COMMENT_ASSOCIATION_CHANGED':
            meta = this.getNotiMeta(this.notificationData[i])
            let labelType = meta.postType === 'question' ? 'answer' : 'comment'
            this.notificationData[i].heading = this.capitalizeString(labelType) + ' Moved'
            this.notificationData[i].text = ' was moved to this'
            let linkObj0 = {
              label: labelType,
              url: this.getCommentLink(meta.commentId)
            }
            this.$set(this.notificationData[i], 'linkObject0', linkObj0)
            break
          case 'IDENTITY_DOCS_APPROVED':
            this.notificationData[i].heading = 'Your Identity Verified'
            meta = this.getNotiMeta(this.notificationData[i])
            this.notificationData[i].text = 'Your verification is successful. You can now withdraw money.'
            break
          case 'IDENTITY_DOCS_REJECTED':
            this.notificationData[i].heading = 'Identity Verification Failed'
            meta = this.getNotiMeta(this.notificationData[i])
            this.notificationData[i].text = 'Sorry, there was a problem. Please check your mail for more details.'
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
        this.notificationData[notiIndex].frienshipSettled = true
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
      let defaultType = 'post'
      if (!meta) {
        return defaultType
      }
      if ('postType' in meta) {
        return this.getPostTypeLabel(meta.postType)
      }
      return defaultType
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
