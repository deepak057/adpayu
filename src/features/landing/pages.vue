<template lang="pug">
.main
  section.module.p-40(v-if="!specialPage()")
    .container
      <terms v-if="page('terms')"/>
      <privacy v-if="page('privacy')"/>
      <advertise v-if="page('advertise')"/>
      <faqs v-if="page('faqs')"/>
      <user-base v-if="page('user-base')"/>
      <Video-answer-guidelines v-if="page('video-answer-guidelines')"/>
      <contact v-if="page('contact')"/>
  <template v-if="specialPage()">
  <stats v-if="page('stats')"/>
  <about v-if="page('about')"/>
  </template>
</template>
<script>
import Privacy from './privacy'
import Terms from './terms'
import Advertise from './advertise'
import Faqs from './faqs'
import UserBase from './user_base'
import VideoAnswerGuidelines from './video_comment_guidelines'
import Contact from './contact'
import Stats from './stats'
import About from './about'

export default {
  name: 'Pages',
  components: {
    Terms,
    Privacy,
    Advertise,
    Faqs,
    UserBase,
    VideoAnswerGuidelines,
    Contact,
    Stats,
    About
  },
  data () {
    return {
      specialPages: ['stats', 'about']
    }
  },
  methods: {
    page (page) {
      return page === (this.$route.params.page || 'terms')
    },
    specialPage () {
      return this.specialPages.indexOf(this.$route.params.page) !== -1
    }
  }
}
</script>
