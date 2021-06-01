<template lang="pug">
.row
  .col-12.public-page-content-wrap
    .text-center
      h2.font-alt Advertise on {{siteName}}
    .text-center.min-h-500(v-if="pageLoader")
      <preloader class="m-t-20"/>
    <template v-if="!pageLoader">
    p.m-t-40 {{siteName}} offers a cost effective and easy way to promote and advertise businesses on the site. It revolutionises the way ads are created and consumed online. Unlike traditional model, where the site gets paid if a visitor/user engages with ads, on {{siteName}}, visitors/users are the ones to get paid for engaging with ads. As we at {{siteName}} believe, Time is Money.
    h4.m-l-10.all-caps WHAT IS AN AD ON {{siteName}}?
    p
      | By default, users see only those public posts (status update. question or video) in their feed which belong to the tags/topics/categories they follow or the posts created by their friends. While, ad is a special post (status update. question or video) that will show up in the feed of all the targeted users, regardless of topics/tags/categories they follow.
    h4.m-l-10 HOW IT WORKS?
    p
      | See below how a typical video ad looks on the site -
    p.text-center
      img.light-border(src="/static/images/site/sample_ad.png")
    p
      | When an user sees an ad in their feed, the CPI amount of that ad is instantly added to user's account. So say if an user sees the ad that is shown in the screenshot above, in their feed, the CPI amount of $0.0071 is instantly added to user's account. Additionally, if user clicks the link in the ad shown in the screenshot above, the user will get $0.028 added to their {{siteName}} account instantly. And finally, if user also chooses to watch the video in the above ad, they will get $0.21 added to their {{siteName}} account.
    h4.m-l-10 AD CONFIGURATION
    ol
      li
        | Advertisers can create an ad with following configuration-
        ul
          li CPI (Cost Per Impression)- Required. Your ad must always have impression budget. Without impression target, your ads won't show up in user's feed in first place.
          li CPC (Cost Per Click)- Optional. You can enable it in all types of post (status update, question, video), you will be able to specify a link/URL in your ad which users will be able to click when they see your ad.
          li CPV (Cost per video view)- Optional. You can enable it in Video Post. Once enabled, you can specify the CPV (the price you are willing to pay per unique video view).
      li
       | Advertisers can select maximum number of each of the above parameters and will specify the cost for each of those actions. So say, an advertiser can specify maximum number of impressions he wants say 1000 and cost for every single impression say $.0071 which will be paid to the user who will see the ad (as depicted in the screenshot below).
       p.text-center.m-t-20
         img.light-border(src="/static/images/site/ad_configuration.png")
       | However, there will be a minimum cost for each of those actions and the cost that advertiser specifies must be equal or greater than that minimum cost (explained in detail in AD PRICING section).
      li
        | Advertisers can target the audience in three ways:
        ul
          li
            | Internationally (default): By default, your ad will be shown to everyone (globally, all around the world) irrespective of their location.
          li
            | Nationally: You can target national audiences by specifying multiple countries. If you choose this option, your ad will be shown only to people who live in specified countries.
          li
            | Locally: You can also target local area audience by selecting a geographical area on the map. Basically, you can select any custom area which you can specify by the means of a circle on the Google Map. In this way, your ad will be shown only to the people who live within the radius of selected area.
    h4.m-l-10 AD PRICING
    p
      | Ads pricing will always be the same for any location or ad configuration. Also, the ad pricing below is specific to individual ads. Below is the pricing structure for running different types of ads on {{siteName}} -
    table.table.table-bordered.m-l-10(style="width: 70%")
      thead
        tr
          th Ad Type
          th Minimum Cost Per Action (INR)
          th Minimum Cost Per Action (USD)
          th Minimum number of actions
      tbody
        tr
          td Cost Per impression (CPI)
          td {{pricing.CPIINR}} per impression
          td {{pricing.defaultCPI}}
          td {{pricing.defaultImpressionTarget}}
        tr
          td Cost Per Click (CPC)
          td {{pricing.CPCINR}} per click
          td {{pricing.defaultCPC}}
          td 0
        tr
          td Cost Per Video View (CPV)
          td {{pricing.CPVINR}} per video view
          td {{pricing.defaultCPV}}
          td 0
    p.text-muted
      i
        | Note- The INR values above may vary due to Forex rates. However, the above USD pricing will be fixed and are taken as base for calculating the INR pricing.
    p
      | The above are the minimum pricing values that can be set for different ad types. However, you can edit those values while creating an ad but the values you specify must be equal or greater than the minimum values shown above. Higher ad values will encourage users more to consume the ad.
    p
      | Additionally, you can specify the number of actions your ad needs to acheive. So, you can specify the number of CPI as 500, which means your ad will stop running after it has been seen by 500 unique users. Having a CPI target on your ad is mandatory and the minimum number of CPI target is 500. CPC or CPV target is optional.
    h4.m-l-10 BENEFITS FOR ADVERTISERS
    p
      | Running ads on {{siteName}} has many advantages over traditional online ad services, including-
    ol
      li
        | You can target International, National and Local audience as per the need of your business.
      li
        | The ad pricing is very cheap and is same all over the world. There are no variations in ad pricing depending upon the location, users, interests, devices etc. No matter how you configure your ad or how you specify target audience, the pricing will always be the same, all around the world.
      li
        | For as long as your ad has not exhausted its budget, it will continue to appear in user's feed even though if they have already consumed it. Unlike other platforms, where if an user sees a particular ad once, the same ad doesn't appear again for them, on {{siteName}}, the ads actually become a part of your feed, just like a story/update in feed and will continue to be there until the overall ad budget has exhausted. So, same user sees your ad multiple times and you're charged only once. Seeing your ad multiple times will greatly increase the chances of them engaging with your ad.
      li
        | Once your ad exhausts its Impression target, it will cease to be an ad post and will simply turn into a regular public post. In which case, it will show up only in the feed of category that it was tagged to.
      li
        | Once CPC or CPV target has been achieved but CPI target is still not achieved on your ad, the links and videos will be there for users to click or watch. However, no money will be paid to them for clicking the link or watching the video as the CPC or CPV budget is already over. So there will always be a chance of getting a click or view at the very cheap price of an impression.
    // h4.m-l-10 EXPLORE OUR USER BASE
    // p
      <router-link :to="getPageURL('user-base')">
        |  Click here
      </router-link>
      |  to see how many users are registered in which area.
    h4.m-l-10  PLEASE NOTE
    ul
      li
        | If impression target is achieved but click (CPC) or view (CPV) target is still not achieved, a part of Click or View budget will be taken away and will be used to add more impressions to the impression target/budget of that ad. Once that happens, you will receive a notification about how many clicks or views were converted to how many new impressions. This is to ensure that impression budget is always there on your ad so that your ad doesn't stop showing up in user's feed. Without impression budget, the click and view budgets will not be effective as ad will not show up in user's feed in first place.
      li
        | This document/page is a part of {{siteName}}'s
        <router-link :to="getPageURL('terms')">
          |  Terms and Conditions
        </router-link>
        |  and you indicate you understand and agree to it while creating an account on the site.
    </template>
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../../components/preloader'
import Service from './service'

export default {
  name: 'Advertise',
  metaInfo () {
    return {
      title: this.getPageTitle('Advertise')
    }
  },
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      pricing: {}
    }
  },
  mounted () {
    // this.setDocumentTitle(this.getPageTitle('Advertise'))
    this.scrollToTop()
    this.$options.service.getDefaultAdPricing()
      .then((data) => {
        this.pageLoader = false
        this.pricing = data.options
      })
      .catch((pErr) => {
        this.showNotification('Something went wrong while loading the page.', 'error')
      })
  }
}
</script>
