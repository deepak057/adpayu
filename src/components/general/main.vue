<template lang="pug">
div
  <location ref="location"/>
</template>
<script>
import auth from '@/auth/helpers'
import Location from './location'
export default {
  name: 'General',
  components: {
    Location
  },
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
        // this.$refs.location.trigger()
      }
    }
  }
}
</script>
