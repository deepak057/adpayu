<template lang="pug">
.card-body.min-h-400
  .text-center.p-t-20(v-show="pageLoader")
    <preloader></preloader>
  .text-center.p-t-20(v-show="!pageLoader && !friends.length")
    h4
      | You have no friends yet
    p
      | Search profiles and send people friend requests
  <user-grid v-show="!pageLoader && friends.length" :currentUser = "currentUser" :users = "friends"></user-grid>
</template>
<script>
import Preloader from './../../../components/preloader'
import Service from './service'
import UserGrid from './../../../components/users/user-grid'

export default {
  name: 'FriendList',
  service: new Service(),
  components: {
    Preloader,
    UserGrid
  },
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
