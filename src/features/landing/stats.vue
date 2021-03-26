<template lang="pug">
div.stats-page-wrap
  section.module.bg-dark-60.about-page-header.b-cover(:style="getTheImage('stats-and-testimonial.png')")
    .container
      .row
        .col-sm-6.col-sm-offset-3
          h2.module-title.font-alt Stats And User Testimonials
          .module-subtitle.font-serif
            | See a brief overview of stats and what people have to say about {{siteName}}.
  <stats-overview :background="false"/>
  <testimonial />
  <social-media :moduleSmall="true"/>
</template>
<script>
import mixin from '../../globals/mixin'
import Testimonial from './components/testimonial'
import StatsOverview from './components/stats-overview'
import SocialMedia from './components/social-media'

export default {
  name: 'Stats',
  metaInfo () {
    return {
      title: this.getPageTitle('Stats And User Testimonials')
    }
  },
  components: {
    Testimonial,
    StatsOverview,
    SocialMedia
  },
  mixins: [mixin],
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
