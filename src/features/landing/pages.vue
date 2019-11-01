<template lang="pug">
.main
  section.module.p-40
    .container
      <terms v-if="page('terms')"/>
      <privacy v-if="page('privacy')"/>
      <advertise v-if="page('advertise')"/>
      <faqs v-if="page('faqs')"/>
      <user-base v-if="page('user-base')"/>
      <Video-answer-guidelines v-if="page('video-answer-guidelines')"/>
</template>
<script>
import Privacy from './privacy'
import Terms from './terms'
import Advertise from './advertise'
import Faqs from './faqs'
import UserBase from './user_base'
import VideoAnswerGuidelines from './video_comment_guidelines.vue'

export default {
  name: 'Pages',
  components: {
    Terms,
    Privacy,
    Advertise,
    Faqs,
    UserBase,
    VideoAnswerGuidelines
  },
  methods: {
    page (page) {
      return page === (this.$route.params.page || 'terms')
    }
  }
}
</script>
