<template lang="pug">
.main
  section.module.p-40
    .container
      <terms v-if="page('terms')"/>
      <privacy v-if="page('privacy')"/>
      <advertise v-if="page('advertise')"/>
      <faqs v-if="page('faqs')"/>
</template>
<script>
import Privacy from './privacy'
import Terms from './terms'
import Advertise from './advertise'
import Faqs from './faqs'

export default {
  name: 'Pages',
  components: {
    Terms,
    Privacy,
    Advertise,
    Faqs
  },
  methods: {
    page (page) {
      return page === (this.$route.params.page || 'terms')
    }
  }
}
</script>
