<template lang="pug">
.card-body
  .min-h-400.text-center.p-t-20(v-show="pageLoader")
    <preloader></preloader>
  .message-box.custom-msg-box.contact-box(v-show="!pageLoader")
    h2.add-ct-btn
      button.btn.btn-circle.btn-lg.btn-success.waves-effect.waves-dark(type='button') +
    .message-widget.contact-widget
      // Message
      .msg-box-wrap(v-for="friend in friends")
        .user-img
          <router-link class="pointer" tag="span" :to="userProfileLink(friend.id)">
            img.img-circle(:src='getMedia(friend.pic)', alt='user')
          </router-link>
          // span.profile-status.online.pull-right
        .mail-contnet
          h5
          <router-link tag="span" class="pointer" :to="userProfileLink(friend.id)">
            | {{userName(friend)}}
          </router-link>
          <friends :currentUser="currentUser" :profileUser="friend" :friendship="friend.Friendship"></friends>
          // span.mail-desc info@wrappixel.com
</template>
<script>
import Preloader from './../../../components/preloader'
import Service from './service'
import mixin from '../../../globals/mixin.js'
import Friends from '../friends'

export default {
  name: 'FriendList',
  service: new Service(),
  components: {
    Preloader,
    Friends
  },
  mixins: [mixin],
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      friends: [],
      pageLoader: true
    }
  },
  mounted () {
    this.$options.service.getFriends()
      .then((data) => {
        this.pageLoader = false
        this.friends = data.friends
      })
      .catch((errFrnd) => {
        alert('Something went wrong while fetching your friends')
      })
  }
}
</script>
