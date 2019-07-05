<template lang="pug">
.main
  section.module.p-40
    .container
      <terms v-if="page('terms')"/>
      <privacy v-if="page('privacy')"/>
      <advertise v-if="page('advertise')"/>
      <faqs v-if="page('faqs')"/>
      <user-base v-if="page('user-base')"/>
</template>
<script>
import Privacy from './privacy'
import Terms from './terms'
import Advertise from './advertise'
import Faqs from './faqs'
import UserBase from './user_base'

export default {
  name: 'Pages',
  components: {
    Terms,
    Privacy,
    Advertise,
    Faqs,
    UserBase
  },
  methods: {
    page (page) {
      return page === (this.$route.params.page || 'terms')
    }
  }
}
</script>
