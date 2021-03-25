<template lang="pug">
section.module(:class="{'bg-dark-60': background}" :style="background? getTheImage('stats-background.png', true, true) : ''")
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
                    h3.count-to.font-alt(:data-countto='stats.totalMoneyMadeUSD')
                    h5.count-title.font-serif dollars ($) earned by users
</template>
<script>
import Service from '../service'
import mixin from '../../../globals/mixin'

export default {
  name: 'StatsOverview',
  service: new Service(),
  mixins: [mixin],
  props: {
    background: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      stats: {
        users: 0,
        totalMoneyMadeUSD: 0,
        adsPosted: 0,
        videosPosted: 0
      }
    }
  },
  mounted () {
    this.getStats()
  },
  methods: {
    getStats () {
      this.$options.service.getStats()
        .then((d) => {
          this.stats = d.stats
        })
    }
  }
}
</script>
