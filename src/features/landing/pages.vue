<template lang="pug">
.main
  section.module.p-40
    .container
      <terms v-if="page('terms')"/>
      <privacy v-if="page('privacy')"/>
      <advertise v-if="page('advertise')"/>
</template>
<script>
import Privacy from './privacy'
import Terms from './terms'
import Advertise from './advertise'
export default {
  name: 'Pages',
  components: {
    Terms,
    Privacy,
    Advertise
  },
  methods: {
    page (page) {
      return page === (this.$route.params.page || 'terms')
    }
  }
}
</script>
