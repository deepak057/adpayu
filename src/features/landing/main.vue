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
        section#services.module
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt About
                        .module-subtitle.font-serif
                            | It's a content and social media platform where for the first time in history, you get paid for spending time on social media. As time is money.
                            br
                            br
                            | In addition to having its own DNA, it combines best of modern social media features, protects your privacy and at the same time doesn't sell or monitor your data.
                .row.multi-columns-row
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-video
                            h3.features-title.font-alt Upload and Watch Video
                            p
                                | Upload short self made video answers or comments on various interesting questions and watch other's. It's lot of fun.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-quote
                            h3.features-title.font-alt Questions and Answers
                            p
                                | Spread knowledge. Ask questions and write answers.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-chat
                            h3.features-title.font-alt Status update
                            p
                                | Let the world or your friends know what you are up to. Optionally share pictures and let people comment and appreciate them.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-wallet
                            h3.features-title.font-alt Make money
                            p
                                | Consume beautiful and entertaining ads in your feed and get paid. Withdraw money to your bank or Paytm account.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-adjustments
                            h3.features-title.font-alt Content tagging and filtering
                            p
                                | Tag your content to various categories. Filter content and follow desired categories to see the content of your interest in your feed.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-megaphone
                            h3.features-title.font-alt Create ads
                            p
                                | Create content (video, question or status) and easily turn it into an ad. Review ad stats and track how your ad is doing.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-search
                            h3.features-title.font-alt Content Search
                            p
                                | In addition to searching content (questions, video etc), easily search users and categories. Search is highly optimised for speed.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-profile-male
                            h3.features-title.font-alt Profiles and Friends
                            p
                                | Maintain your profile and request or accept friendship with others. You can choose to share content privately only with your friends.
        section.module.bg-dark.landing-reason(:style="getTheImage('app-intro-background.png')")
          .container
            .row
              .col-sm-6
                img(:src="getTheImage('app-preview-tab-mobile.png', false)" alt='App preview in mobile and tab')
              .col-sm-6
                h2.module-title.font-alt.align-left.color-white What is {{siteName}}?
                p.module-subtitle.font-serif.align-left
                  | {{siteName}} is a Q&A network where answers are given in the form of short and entertaining videos instead of traditional text answers.
                p
                  | Additionally, you can opt to watch short sponsored videos or ads and get paid for it. So you learn and earn at the same time.
                a.btn.btn-border-w.btn-round.video-pop-up.highlighted-button.blue-text.font-bold(target="_blank" href='https://svanq.blogspot.com/')
                  i.icon-edit
                  |  See our blog
        section.pb-140
          .container
            .row.landing-image-text
              .col-sm-6.col-sm-push-6
                img.center-block(:src="getTheImage('app-dashboard-preview.png', false)" alt='App dashboard preview')
              .col-sm-6.col-sm-pull-6
                h2.font-alt Gain KNOWLEDGE
                  span.blue-text
                    |  and connect
                p.font-serif
                  | Knowledge served through entertaining videos, coupled with social media and easy content discovery features.
                ul
                  li See the feed of questions and their video answers right in your dashboard.
                  li
                    | Customize the feed based on your interests.
                  li Customize your profile and see other user's public profiles
                  li Use fast, efficient and speed-optimized search feature
                  li Be friends with like minded people to see their non-public content
                  li And much more.
                <router-link class="btn btn-border-d btn-circle" :to="redirectURLs('signup')">
                    | Free Sign Up
                </router-link>
            .row.landing-image-text
              .col-sm-6
                img.center-block(:src="getTheImage('app-ad-preview.png', false)" alt="App ad preview")
              .col-sm-6
                h2.font-alt Make
                  span.blue-text
                    |   Money
                p.font-serif
                  | Now get paid for spending time on social media. Your time is your money.
                ul
                  li See entertaining short ads in your feed and get paid for it.
                  li Disable or enable ads anytime at your will.
                  li Get bonuses and cashbacks on watching your first ad
                  li
                    | Withdraw money to your bank, Paytm or any other accounts.
                  li Help and support in case of any disputes or money withdrawal issues
                  li And much more.
                <router-link class="btn btn-border-d btn-circle" :to="getPageURL('faqs')">
                  | See FAQs
                </router-link>
        section.module.bg-dark-60.pt-0.pb-0.testimonial(:style="getTheImage('testimonial-background.png', true, true)")
          .testimonials-slider.pt-140.pb-140
            .flex-viewport
              ul.slides
                li.clone(aria-hidden='true' v-for="t in testimonials")
                  .container
                    .row
                      .col-sm-12
                        .module-icon
                          span.icon-quote
                    .row
                      .col-sm-8.col-sm-offset-2
                        blockquote.testimonial-text.font-alt
                          | {{t.text}}

                    .row
                      .col-sm-4.col-sm-offset-4
                        .testimonial-author
                          .testimonial-caption.font-alt
                            .testimonial-title {{t.title}}
                            .testimonial-descr {{t.subTitle}}
            ol.flex-control-nav.flex-control-paging
              li
                a(href='#') 1
              li
                a.flex-active(href='#') 2
              li
                a(href='#') 3
            ul.flex-direction-nav
              li.flex-nav-prev
                a.flex-prev(href='#') Previous
              li.flex-nav-next
                a.flex-next(href='#') Next

        section.module-small.free-trial.custom(:style="getTheImage('app-intro-background.png')")
          .container.text-center
            .row
              .col-sm-8.col-sm-offset-2
                h2.font-alt
                  | Ads that are
                  span
                    |  never skipped
                p.color-light.font-15
                  | Run ads on {{siteName}} at affordable prices and make almost every one watch your full ads as people get paid for watching them.
            div
              <router-link class="btn btn-border-w highlighted-button blue-text font-bold btn-circle" :to="getPageURL('advertise')">
                | Learn More
              </router-link>
        section.module.bg-dark-60(:style="getTheImage('stats-background.png', true, true)")
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt Stats
                        .module-subtitle.font-serif
                .row.multi-columns-row
                    .col-sm-6.col-md-3.col-lg-3
                        .count-item.mb-sm-40
                            .count-icon
                                span.icon-profile-male
                            h3.count-to.font-alt(:data-countto='stats.users')
                            h5.count-title.font-serif Active users
                    .col-sm-6.col-md-3.col-lg-3
                        .count-item.mb-sm-40
                            .count-icon
                                span.icon-megaphone
                            h3.count-to.font-alt(:data-countto='stats.adsPosted')
                            h5.count-title.font-serif Ads created
                    .col-sm-6.col-md-3.col-lg-3
                        .count-item.mb-sm-40
                            .count-icon
                                span.icon-video
                            h3.count-to.font-alt(:data-countto='stats.videosPosted')
                            h5.count-title.font-serif Video answers posted
                    .col-sm-6.col-md-3.col-lg-3
                        .count-item.mb-sm-40
                            .count-icon
                                span.icon-wallet
                            h3.count-to.font-alt(:data-countto='stats.adsPosted')
                            h5.count-title.font-serif dollars ($) earned by users
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
                a(href='target="_blank" href="https://play.google.com/store/apps/details?id=com.svanq&hl=en_IN"')
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
import Service from './service'
import auth from '@/auth/helpers'

export default {
  name: 'Landing',
  service: new Service(),
  metaInfo () {
    return {
      title: this.getPageTitle(constants.SITE_SLOGAN)
    }
  },
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      slogan: constants.SITE_SLOGAN,
      stats: {
        users: 0,
        totalMoneyMadeUSD: 0,
        adsPosted: 0,
        videosPosted: 0
      },
      testimonials: [
        {
          text: 'This app is really great because it gives you real money by just watching short ads.',
          title: 'Rishab Naagar',
          subTitle: 'Delhi'
        }, {
          text: 'This all is so easy to use, very simple and well designed. I will recommend everyone to learn and earn money online using this website.',
          title: 'Nikhil Guglani',
          subTitle: 'Punjab'
        }, {
          text: 'This is a wonderful website which is easy to use and easy to understand. You get to learn and make some quick money unlike any other social media platform.',
          title: 'Pooja Mishra',
          subTitle: 'Rajasthan'
        }, {
          text: 'To be honest this website is really good.',
          title: 'Amitabh Goswami',
          subTitle: 'Gujrat'
        }, {
          text: 'This website is the best of the best because it really paid me money for watching ads. trust me you won\'t regret after using this website.',
          title: 'Ankita Chitlangia',
          subTitle: 'Maharashtra'
        }, {
          text: 'An excellent and awesome program. Very easy to use and great videos.',
          title: 'Pun Lary',
          subTitle: 'Assam'
        }, {
          text: 'This app is very useful and made my life better.',
          title: 'Mansi Saxena',
          subTitle: 'Karnataka'
        }

      ]
    }
  },
  mounted () {
    this.scrollToTop()
    this.setRefCode()
    this.getStats()
  },
  methods: {
    getTheImage (img, style = true, image = false, folder = 'landing') {
      return !style ? this.publicThemeImg(img, folder) : 'background' + (image ? '-image' : '') + ':url("' + this.publicThemeImg(img, folder) + '")'
    },
    getStats () {
      this.$options.service.getStats()
        .then((d) => {
          this.stats = d.stats
        })
    },
    setRefCode () {
      let refCode = this.$route.query.refCode || false
      if (refCode) {
        auth.setRefCode(refCode)
      }
    }
  }
}
</script>
