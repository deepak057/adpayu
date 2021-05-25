<template lang="pug">
.about-page-wrap
  section.module.bg-dark.landing-reason.custom(:style="getTheImage('app-intro-background.png')")
    .container
      .row
        .col-sm-6
          img(:src="getTheImage('app-preview-tab-mobile.png', false)" alt='App preview in mobile and tab')
        .col-sm-6
          h2.module-title.font-alt.align-left.color-white Make extra money in your spare time
          p.module-subtitle.font-serif.align-left
            | {{siteName}} is a Q&A network where answers are given in the form of short and entertaining videos instead of traditional text answers.
          p
            | Additionally, you can opt to watch short sponsored videos or ads and get paid for it. So you learn and earn at the same time.
          a.btn.btn-border-w.btn-round.video-pop-up.highlighted-button.blue-text.font-bold(target="_blank" href='https://svanq.blogspot.com/')
            i.icon-edit
            |  See our blog
  section#services.module.custom
    .container
        .row
            .col-sm-6.col-sm-offset-3
                h2.module-title.font-alt Features
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
                        | Consume beautiful and entertaining ads in your feed and get paid. Withdraw money to your bank, Paytm or other accounts.
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
                <router-link class="btn btn-border-d btn-circle" :to="getPageURL('make-money')">
                  | Learn More
                </router-link>
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
</template>
<script>
import mixin from '../../globals/mixin'
export default {
  name: 'About',
  metaInfo () {
    return {
      title: this.getPageTitle('About')
    }
  },
  mixins: [mixin],
  mounted () {
    this.scrollToTop()
  }
}
</script>
