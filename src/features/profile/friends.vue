<template lang="pug">
.row.text-center.justify-content-md-center
  .col-12
    <template v-if="!request">
    button.btn.btn-success(@click="sendRequest()")
      i.mdi.mdi-account-plus.m-r-5
      font.font-medium Add Friend
    </template>
    <template v-if="request">
    .btn-group
      button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
        i.fa.fa-check.m-r-5
        | Friend Request Sent
      .dropdown-menu
       a.dropdown-item(href='javascript:void(0)' @click="sendRequest()") Cencel
    </template>
</template>
<script>
import Service from './service'
export default {
  name: 'Friends',
  service: new Service(),
  props: {
    friendId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      request: false
    }
  },
  watch: {
    request (newV) {
      let action = 'request'
      if (!newV) {
        action = 'remove'
      }
      this.$options.service.friendRequest(action, this.friendId)
    }
  },
  methods: {
    sendRequest () {
      this.request = !this.request
    }
  }
}
</script>
