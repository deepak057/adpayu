<template lang="pug">
div.stats-page-wrap
  section.module.bg-dark-60.about-page-header.b-cover(:style="getTheImage('stats-and-testimonial.png')")
    .container
      .row
        .col-sm-6.col-sm-offset-3
          h2.module-title.font-alt Make Money
          .module-subtitle.font-serif
            | See different ways to make money on {{siteName}}.
  section.pb-140
    .container
      .row.landing-image-text
        .col-sm-6.col-sm-push-6
          img.center-block(:src="getTheImage('app-ad-preview.png', false)" alt="App ad preview")
        .col-sm-6.col-sm-pull-6
          h2.font-alt Watch
            span.blue-text
              |  short ads
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
          img.center-block(:src="getTheImage('app-dashboard-preview.png', false)" alt='App dashboard preview')
        .col-sm-6
          h2.font-alt Make
            span.blue-text
              |   short videos
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
          <router-link class="btn btn-border-d btn-circle" :to="getPageURL('video-answer-guidelines')">
            | Learn More
          </router-link>
      .row.landing-image-text
        .col-sm-6.col-sm-push-6
          img.center-block(:src="getTheImage('app-ad-preview.png', false)" alt="App ad preview")
        .col-sm-6.col-sm-pull-6
          h2.font-alt Invite
            span.blue-text
              |  friends
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
  section.module-small.free-trial.custom(:style="getTheImage('app-intro-background.png')")
    .container.text-center
      .row
        .col-sm-8.col-sm-offset-2
          h2.font-alt
            | Ready to make
            span
              |  money now?
          p.color-light.font-15
            | Get cashback on sign up and many more rewards. What are you waiting for?
      div
        <router-link class="btn btn-border-w highlighted-button blue-text font-bold btn-circle" to="/signup">
          | Free Sign Up
        </router-link>
</template>
<script>
import mixin from '../../globals/mixin'

export default {
  name: 'Stats',
  metaInfo () {
    return {
      title: this.getPageTitle('Make Money')
    }
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
