<template lang="pug">
</template>
<script>
import auth from '@/auth/helpers'

export default {
  name: 'General',
  data () {
    return {
      interval: 5000,
      currentUser: auth.getUser()
    }
  },
  mounted () {
    setInterval(this.checkUserCords, this.interval)
  },
  methods: {
    checkUserCords () {
      if (!this.currentUser.locationCords) {
        // alert('map')
      }
    }
  }
}
</script>
