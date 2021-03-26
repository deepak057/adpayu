<template lang="pug">
section.module.social-media.module-small(:class="{'special-section': specialSection}")
    .container.text-center
      h2.module-title.font-alt
        | Find
        span.blue-text
          |  {{siteName}} on
      .row.multi-columns-row
        .col-md-3.col-sm-3.col-xs-3
          .features-item
            .features-icon
              a(:href="URLS.FB" target="_blank" title="Facebook")
                i.fa.fa-facebook
        .col-md-3.col-sm-3.col-xs-3
          .features-item
            .features-icon
              a(:href="URLS.twitter" target="_blank" title="Twitter")
                i.fa.fa-twitter
        .col-md-3.col-sm-3.col-xs-3
          .features-item
            .features-icon
              a(:href="URLS.insta" target="_blank" title="Instagram")
                i.fa.fa-instagram
        .col-md-3.col-sm-3.col-xs-3
          .features-item
            .features-icon
              a(:href="URLS.YT" target="_blank" title="Youtube")
                i.fa.fa-youtube
</template>
<script>
import mixin from '../../../globals/mixin'
export default {
  name: 'SocialMedia',
  mixins: [mixin],
  props: {
    specialSection: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      URLS: {
        FB: process.env.SM_FB_URL,
        YT: process.env.SM_YOUTUBE_URL,
        twitter: process.env.SM_TWITTER_URL,
        insta: process.env.SM_INSTAGRAM_URL
      }
    }
  },
  mounted () {
  }
}
</script>
