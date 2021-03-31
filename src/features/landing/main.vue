<template lang="pug">
div
    section#home.home-section.custom-home.home-full-height.bg-dark.bg-gradient(:style="getTheImage('user-images-collage.jpg')")
        .hpv-container
            .hp-overlay
        .titan-caption
            .caption-content
                .font-alt.mb-30.titan-title-size-1 A content network
                .font-alt.mb-40.titan-title-size-4 {{slogan}}
                <router-link to="/signup" class="btn btn-info btn-round color-white btn-info custom">
                  | Sign Up
                </router-link>
                <router-link to="/login" class="btn btn-border-w btn-round highlighted-button font-bold blue-text m-l-10">
                  | Log In
                </router-link>
    .main
        section.module
          h2.module-title.font-alt
            | How we
            span.blue-text
              |  help you?
          .module-subtitle.font-serif.large-text
            | Watch short entertaining videos and learn new things.
            br
            | And also make money at the same time.
            br
            <router-link class="mt-20 btn btn-border-d btn-circle" :to="getPageURL('about')">
              | Learn More
            </router-link>
        <testimonial />
        <stats-overview />
        <social-media :specialSection="true"/>
        section.module.download.pb-0
          .container.text-center
            h2.module-title.font-alt Download
              span.blue-text
                |  the app
            .row
              .col-md-6.col-md-offset-3
                p.module-subtitle
                  | {{siteName}} is best when used in the app. Download the app for the best experience.
                //a(href='#')
                  img.image-button(src='assets/images/landing/apple-store-icon.png')
                a(target="_blank" href="https://play.google.com/store/apps/details?id=com.svanq&hl=en_IN")
                  img.image-button.w-100-px.mb-40(:src="staticImageUrl('play_store.png')")
                //a(href='#')
                  img.image-button(src='assets/images/landing/windows-store-icon.png')
            img(:src="getTheImage('app-download-banner.png', false)" alt="Download the app banner")
        hr.divider-d
</template>
<script>
import mixin from '../../globals/mixin'
import * as constants from '@/constants'
import Preloader from '../../components/preloader'
import auth from '@/auth/helpers'
import Testimonial from './components/testimonial'
import StatsOverview from './components/stats-overview'
import SocialMedia from './components/social-media'

export default {
  name: 'Landing',
  metaInfo () {
    return {
      title: this.getPageTitle(constants.SITE_SLOGAN)
    }
  },
  components: {
    Preloader,
    Testimonial,
    StatsOverview,
    SocialMedia
  },
  mixins: [mixin],
  data () {
    return {
      slogan: constants.SITE_SLOGAN
    }
  },
  mounted () {
    this.scrollToTop()
    this.setRefCode()
  },
  methods: {
    setRefCode () {
      let refCode = this.$route.query.refCode || false
      if (refCode) {
        auth.setRefCode(refCode)
      }
    }
  }
}
</script>
