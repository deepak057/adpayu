<template lang="pug">
.card-body.min-h-400
  .text-center.p-t-20(v-show="pageLoader")
    <preloader></preloader>
  .text-center.p-t-20(v-show="!pageLoader && !friends.length")
    h4
      | You have no friends yet
    p
      | Search profiles and send people friend requests
    .row.content-center
      <search-field :searchType="'users'" class="m-t-10"></search-field>
  <template v-if="!pageLoader && friends.length">
  .row
     <search-field :searchType="'users'" class="m-b-10 m-l-5"></search-field>
  <user-grid :currentUser = "currentUser" :users = "friends"></user-grid>
  </template>
</template>
<script>
import Preloader from './../../../components/preloader'
import SearchField from './../../../components/search-field'
import Service from './service'
import UserGrid from './../../../components/users/user-grid'

export default {
  name: 'FriendList',
  service: new Service(),
  components: {
    Preloader,
    UserGrid,
    SearchField
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
