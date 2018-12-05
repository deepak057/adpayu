<template lang="pug">
.row.text-center.justify-content-md-center
  .col-12
    <template v-if="!areFriends()">
    <template v-if="!requested && !requesting">
    button.btn.btn-success(@click="sendRequest()")
      i.mdi.mdi-account-plus.m-r-5
      font.font-medium Add Friend
    </template>
    <template v-if="requested">
    .btn-group
      button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
        i.fa.fa-check.m-r-5
        span
          | Friend Request Sent
      .dropdown-menu
       a.dropdown-item(href='javascript:void(0)' @click="cancelRequest()") Cencel
    </template>
    <template v-if="requesting">
    .btn-group
      button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
        i.fa.fa-check.m-r-5
        span
          | Sent you a freind request
      .dropdown-menu
       a.dropdown-item(href='javascript:void(0)' @click="acceptFriendship()") Accept
       a.dropdown-item(href='javascript:void(0)' @click="cancelRequest()") Cencel
    </template>
    </template>
    <template v-if="areFriends()">
    .btn-group
      button.btn.btn-outline-success.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
        i.fa.fa-check.m-r-5
        | Friends
      .dropdown-menu
       a.dropdown-item(href='javascript:void(0)' @click="cancelFriendship()") Cencel friendship
    </template>
</template>
<script>
import Service from './service'
export default {
  name: 'Friends',
  service: new Service(),
  props: {
    friendship: {
      type: Object,
      default () {
        return {}
      }
    },
    profileUser: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      requested: false,
      requesting: false
    }
  },
  watch: {
    friendship () {
      this.checkFriendship()
    }
  },
  methods: {
    sendRequest () {
      this.requested = true
      this.serverUpdate('request')
    },
    cancelRequest () {
      this.resetRequests()
      this.serverUpdate('remove')
    },
    serverUpdate (action) {
      this.$options.service.friendshipUpdate(action, this.profileUser.id)
        .then((data) => {})
        .catch((friendErr) => {
          alert('Something went wrong, please try again later')
        })
    },
    checkFriendship () {
      if (!this.areFriends()) {
        if (this.friendship.UserId === this.currentUser.id) {
          this.requested = true
        } else {
          this.requesting = true
        }
      }
    },
    areFriends () {
      return this.friendship && this.friendship.accepted
    },
    cancelFriendship () {
      if (confirm('Are you sure?')) {
        this.resetRequests()
        this.friendship.accepted = false
        this.serverUpdate('remove')
      }
    },
    resetRequests () {
      this.requesting = false
      this.requested = false
    },
    acceptFriendship () {
      this.resetRequests()
      this.friendship.accepted = true
      this.serverUpdate('add')
    }
  }
}
</script>
