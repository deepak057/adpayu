<template lang="pug">
.card-body.min-h-400
  .text-center.p-t-20(v-show="pageLoader")
    <preloader></preloader>
  .text-center.p-t-20(v-show="!pageLoader && !friends.length")
    h4
      | You have no friends yet
    p
      | Search profiles and send people friend requests
  .row.el-element-overlay(v-show="!pageLoader && friends.length")
    .col-lg-3.col-md-6.p-7(v-for="friend in friends")
      .card.friend-block-up
        .el-card-item
          .el-card-avatar.el-overlay-1
            img(:src='getMedia(friend.pic)', alt='user')
            .el-overlay
              ul.el-info
                li(v-show="friend.pic")
                  a.btn.default.btn-outline.image-popup-vertical-fit(:href='getMedia(friend.pic)' :title="userName(friend)")
                    i.icon-magnifier
                li
                  <router-link :to="userProfileLink(friend.id)" class="btn default btn-outline" title="Go to profile">
                    i.icon-link
                  </router-link>
          .el-card-content
            h3.box-title
              <router-link :to="userProfileLink(friend.id)">
                | {{userName(friend)}}
              </router-link>
            .m-t-10
            <friends :currentUser="currentUser" :profileUser="friend" :friendship = "friend.Friendship" :smallButton="true"></friends>
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
