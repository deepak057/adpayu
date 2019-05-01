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
                  | While using the site, you will see the promoted posts or ads in your feed. You make money as soon as you see an ad in your feed. Optioanlly, more money can be made by clicking the links or watching the videos in the ad (if links or video are available in the ad).
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support2', aria-expanded='false') How to withdraw money to my bank account?
              #support2.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | You will see Total Revenue section on the top-right corner of your Dashboard. In that section, you will see a Withdraw button. Click on the button to withdraw money to your Indian Bank or Paytm account.
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support3', aria-expanded='false') I don't have an Indian bank or Paytm account. How do I withdraw money?
              #support3.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | After clicking the Withdraw button in Total Revenue section on the top-right corner of your dashboard, choose Manual option. You can send us a custom message and let us know how else you'd like to withdraw your money. We will be in touch with you and help you withdraw your money. This option will work for those who are outside of India or the ones who want to get paid via some other Payment option such as Paypal.
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support4', aria-expanded='false') What is the minimum amount that can be withdrawn?
              #support4.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | You must accumulate at least 10 INR (roughly 0.14 USD at the time of writing this answer) to be able to withdraw money.
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#support5', aria-expanded='false') The website doesn't work for me or I have found some issues/bugs in the site. What do I do?
              #support5.panel-collapse.collapse(aria-expanded='false')
                .panel-body
                  | You can
                  a(href="/#contact")
                    |  contact us
                  |  and share details about the issue. We will be in touch with you and try to resolve the issue for you as soon as possible.
        // #sales.tab-pane
          #accordion.panel-group
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a(data-toggle='collapse', data-parent='#accordion', href='#sales1') Sales Question 1
              #sales1.panel-collapse.collapse.in
                .panel-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
            .panel.panel-default
              .panel-heading
                h4.panel-title.font-alt
                  a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#sales2') Sales Question 2
              #sales2.panel-collapse.collapse
                .panel-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
</template>
<script>
import mixin from '../../globals/mixin'

export default {
  name: 'Faqs',
  mixins: [mixin],
  mounted () {
    this.setDocumentTitle(this.getPageTitle('FAQs'))
    this.scrollToTop()
  }
}
</script>
