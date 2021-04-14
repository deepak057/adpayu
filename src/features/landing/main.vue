<template lang="pug">
div
    section#home.home-section.custom-home.home-full-height.bg-dark.bg-gradient(:style="getTheImage('user-images-collage.jpg')")
        .hpv-container
            .hp-overlay
        .titan-caption
            .caption-content
                .font-alt.mb-30.titan-title-size-4.main-banner-title-custom {{slogan}}
                .font-alt.mb-50.titan-title-size-2 Learn and earn at the same time
                <router-link to="/signup" class="btn btn-info btn-round color-white btn-info custom">
                  | Sign Up
                </router-link>
                <router-link to="/login" class="btn btn-border-w btn-round highlighted-button font-bold blue-text m-l-10">
                  | Log In
                </router-link>
    .main
        section.pb-140.pt-50(:style="getTheImage('main-white-background.png')")
          .container
              h1.font-alt.text-center
                | How we
                span.blue-text
                  |  help you?
              .row.landing-image-text
                .col-sm-6.col-sm-push-6
                  h2.font-alt Watch
                    span.blue-text
                      |  Videos
                  p.module-subtitle.font-serif.align-left
                    | Watch short entertaining videos and learn new things. We love videos at Svanq and we know you do too! So make videos and share your opinion on the videos.
                  <router-link class="btn btn-border-d btn-circle" :to="getPageURL('about')">
                      | Learn More
                  </router-link>
                .col-sm-6.col-sm-pull-6
                  img.center-block(:class="{'mt-20': isMobile()}" :src="getTheImage('app-benefits-watch-videos.png', false)" alt='App Benefits, Watch Videos')
              .row.landing-image-text
                .col-sm-6
                  h2.font-alt Make
                    span.blue-text
                      |   Money
                  p.module-subtitle.font-serif.align-left
                    | Watch entertaining videos and earn money. {{siteName}} allows you to make money with videos. Our video inventory refreshes daily. Find more ways to make even more money.
                  <router-link class="btn btn-border-d btn-circle" :to="getPageURL('make-money')">
                    | Learn More
                  </router-link>
                .col-sm-6
                  img.center-block(:src="getTheImage('app-benefits-make-money.png', false)" alt="App Benefits, Make Money")
        <paid-users />
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
import StatsOverview from './components/stats-overview'
import SocialMedia from './components/social-media'
import PaidUsers from './components/paid-users'

export default {
  name: 'Landing',
  metaInfo () {
    return {
      title: this.getPageTitle(constants.SITE_SLOGAN)
    }
  },
  components: {
    Preloader,
    StatsOverview,
    SocialMedia,
    PaidUsers
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
