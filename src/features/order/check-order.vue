<template lang="pug">
div
  .page-preloader(v-if="pageLoader")
    <preloader/>
    br
    .m-t-20
      h5 Checking Payment Status...
</template>
<script>
// import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Service from './service'
import mixin from '../../globals/mixin.js'

export default {
  name: 'OrderCheck',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true
    }
  }
}
</script>
