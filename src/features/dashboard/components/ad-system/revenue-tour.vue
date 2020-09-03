<template lang="pug">
</template>
<script>
import auth from '@/auth/helpers'
import mixin from '../../../../globals/mixin'
import Preloader from '../../../../components/preloader'
// import Service from './service'

export default {
  name: 'RevenueTour',
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      currentUser: auth.getUser(),
      loader: false
    }
  },
  mounted () {
  },
  methods: {
    trigger () {
      auth.togglePageTitle(true)
    }
  }
}
</script>
