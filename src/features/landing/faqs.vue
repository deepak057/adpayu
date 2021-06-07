<template lang="pug">
.row
  .col-sm-8.col-sm-offset-2.min-h-500
    .text-center.public-page-content-wrap
      h2
        | FAQs
    .m-t-40(role='tabpanel')
      ul.nav.nav-tabs.font-alt(role='tablist')
        li.active
          a(href='#support', data-toggle='tab', aria-expanded='true')
            span.icon-chat
            | general
        // li
          a(href='#sales', data-toggle='tab', aria-expanded='false')
            span.icon-tools-2
            | Other
      .tab-content
        #support.tab-pane.active
          #accordion.panel-group
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support1', aria-expanded='true') How do I make money on the site?
              #support1.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | While using the site, you will see the promoted posts or ads in your feed. You make money as soon as you see an ad in your feed. Optionally, more money can be made by clicking the links or watching the videos in the ad (if links or videos are available in the ad). You can also make money by uploading video answers on the questions. Your videos will be reviewed by our moderators and you will be paid as per our
                  <router-link class="pointer" :to="getPageURL('video-answer-guidelines')">
                    |  video answer policies and guidelines.
                  </router-link>
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support12', aria-expanded='true') What is a video comment or video answer?
              #support12.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | Video answer is basically a short video clip made in response to a given question asked on the platform. So, say there can be a question, such as "Show us your Pet?" and people can make a very small video clip (ideally 10-15 seconds) and post it as a response to that question. After you post it, a site moderator will review the video and upon their approval, you will get paid and money will be added to your {{siteName}} account which you can withdraw to your bank or other accounts. If the video is rejected, you will not be paid for that video. You will get notified about the status of the video via an on-site notification and an email.
                  br
                  br
                  <router-link class="pointer" :to="getPageURL('video-answer-guidelines')">
                    | See Guidelines for video answers
                  </router-link>
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support2', aria-expanded='false') How to withdraw money to my bank account?
              #support2.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | You will see Total Earnings section on the sidemenu. In that section, you will see a Withdraw button. Click on the button to withdraw money to your bank or other accounts. However, before being able to withdraw money, you will have to upload your identity verification document for the verification of your identity.
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support3', aria-expanded='false') I don't have an Indian bank or Paytm account. How do I withdraw money?
              #support3.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | After clicking the Withdraw button in Total Revenue section on the side menu, choose Other Accounts option. You can send us a custom message and let us know how else you'd like to withdraw your money. We will be in touch with you and help you withdraw your money. This option will work for those who are outside of India or the ones who want to get paid via some other Payment option such as Paypal, Paytm etc.
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support4', aria-expanded='false') What is the minimum amount that can be withdrawn?
              #support4.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | You must accumulate at least 500 INR (roughly 6.87 USD at the time of writing this answer) to be able to withdraw money.
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support5', aria-expanded='false') The website doesn't work for me or I have found some issues/bugs in the site. What do I do?
              #support5.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | You can
                  <router-link :to="getPageURL('contact')">
                    |  contact us
                  </router-link>
                  |  and share details about the issue. We will be in touch with you and try to resolve the issue for you as soon as possible.
</template>
<script>
import mixin from '../../globals/mixin'

export default {
  name: 'Faqs',
  metaInfo () {
    return {
      title: this.getPageTitle('FAQs')
    }
  },
  mixins: [mixin],
  mounted () {
    // this.setDocumentTitle(this.getPageTitle('FAQs'))
    this.scrollToTop()
  }
}
</script>
