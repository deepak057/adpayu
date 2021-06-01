<template lang="pug">
section.module.stats-wrap(:class="{'bg-dark-60': background}" :style="background? getTheImage('stats-background.png', true, true) : ''")
    .container
        .row
            .col-sm-6.col-sm-offset-3
                h1.font-alt.text-center.font-bold Stats
                .module-subtitle.font-serif
        .row.multi-columns-row
            .col-sm-6.col-md-3.col-lg-3.stats-right-border
                .count-item.mb-sm-40
                    .count-icon
                        i.fa.fa-question-circle
                    h2.count-to.font-alt(:data-countto='stats.questionsPosted')
                    h4.count-title.font-serif Questions Asked
            .col-sm-6.col-md-3.col-lg-3.stats-right-border
                .count-item.mb-sm-40
                    .count-icon
                        i.fa.fa-bullhorn
                    h2.count-to.font-alt(:data-countto='stats.adsPosted')
                    h4.count-title.font-serif Ads Created
            .col-sm-6.col-md-3.col-lg-3.stats-right-border
                .count-item.mb-sm-40
                    .count-icon
                        i.fa.fa-film
                    h2.count-to.font-alt(:data-countto='stats.videosPosted')
                    h4.count-title.font-serif Video Answers Posted
            .col-sm-6.col-md-3.col-lg-3
                .count-item.mb-sm-40
                    .count-icon
                        i.fa.fa-users
                    h2.count-to.font-alt(:data-countto='stats.usersPaid')
                    h4.count-title.font-serif Users Paid
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
