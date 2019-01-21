<template lang="pug">
.row.el-element-overlay(v-show="users.length")
    .col-lg-3.col-md-6.p-7(v-for="user in users")
      .card.friend-block-up
        .el-card-item
          .el-card-avatar.el-overlay-1
            img(:src='getMedia(user.pic)', alt='user')
            .el-overlay
              ul.el-info
                li(v-show="user.pic")
                  a.btn.default.btn-outline.image-popup-vertical-fit(:href='getMedia(user.pic)' :title="userName(user)")
                    i.icon-magnifier
                li
                  <router-link :to="userProfileLink(user.id)" class="btn default btn-outline" title="Go to profile">
                    i.icon-link
                  </router-link>
          .el-card-content
            h3.box-title
              <router-link :to="userProfileLink(user.id)">
                | {{userName(user)}}
              </router-link>
            .m-t-10
            <friends :currentUser="currentUser" :profileUser="user" :friendship = "user.Friendship" :smallButton="true"></friends>
</template>
<script>
import Preloader from '../preloader'
import Service from '../../features/profile/service'
import mixin from '../../globals/mixin.js'
import Friends from './friends'

export default {
  name: 'UserGrid',
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
    },
    users: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
