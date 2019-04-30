<template lang="pug">
.row
  .col-12.public-page-content-wrap
    .text-center
      h2.font-alt Advertise on {{siteName}}
    p.m-t-40 {{siteName}} offers a cost effective and easy way to promote and advertise businesses on the site. It revolutionises the way ads are created and consumed online. Unlike traditional approach, where the site gets paid if a visitor/user engages with ads, on {{siteName}}, visitors/users are the ones to get paid for engaging with ads. As we at {{siteName}} believe, Time is Money.
    h4.m-l-10 HOW IT WORKS?
    ol
      li
        | Advertiesrs can create an ad with following configuration-
        ul
          li CPI (Cost Per Impression)- Required
          li CPC (Cost Per Click)- Optional
          li CPV (Cost per video view)- Optional
      li
       | Advertisers can select maximum number of each of the above parameters and will specify the cost for each of those actions. So say, an advertiser can specify maximum number of impression he wants say 1000 and cost for every single impression say $.0071 which will be paid to the user who will see the ad (as depicted in the screenshot below).
       p.text-center.m-t-20
         img.light-border(src="/static/images/site/ad_configuration.png")
       | However, there will be a minimum cost for each of those actions and the cost that advertier specifies must be equal or greater thant that minimumm cost.
      li
        | Advertisers can also specify the contries in which they want to show this ad. By default, each ad is shown globally.
    h4.m-l-10 BENEFITS FOR ADVERTISERS
    p
      | Running ads on {{siteName}} has many advantages over traditional online ad services, including-
    ol
      li
        | The ad pricing is very cheap and is same all over the world. There are no variations in ad pricing depending upon the location, users, likes, devices etc. No matter how you configure your ad or how you specify target audience, the pricing will always be the same, all arounf the world.
</template>
<script>
import mixin from '../../globals/mixin'

export default {
  name: 'Advertise',
  mixins: [mixin],
  mounted () {
    this.setDocumentTitle(this.getPageTitle('Advertise'))
    this.scrollToTop()
  }
}
</script>
