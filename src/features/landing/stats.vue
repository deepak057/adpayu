<template lang="pug">
div.stats-page-wrap
  section.module.bg-dark-60.about-page-header(data-background='/static/titan-master/assets/images/about_bg.jpg' style='background-image: url("assets/images/about_bg.jpg");')
    .container
      .row
        .col-sm-6.col-sm-offset-3
          h2.module-title.font-alt Stats And User Testimonials
          .module-subtitle.font-serif
            | See a brief overview of stats and what people have to say about {{siteName}}.
  <stats-overview :background="false"/>
  <testimonial />
</template>
<script>
import mixin from '../../globals/mixin'
import Testimonial from './components/testimonial'
import StatsOverview from './components/stats-overview'

export default {
  name: 'Stats',
  metaInfo () {
    return {
      title: this.getPageTitle('Stats And User Testimonials')
    }
  },
  components: {
    Testimonial,
    StatsOverview
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
