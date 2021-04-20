<template lang="pug">
section.module.bg-dark.landing-reason.custom(:style="getTheImage('paid-user-background.png')")
  .container
    .row(:class="{'change-direction-row': isMobile(), 'is-table-row': !isMobile()}")
      .col-sm-6.col-md-6.col-xs-12.table-coulmn(:class="{'mt-20': isMobile()}")
        .div
          .col-md-12.col-sm-12
            .text-center.mt-100(v-if="loader")
              <preloader />
            .row(v-if="!loader")
              #paidUsersCarousel.carousel.slide.vertical.paid-users-carousel(data-ride="carousel")
                // Carousel items
                .carousel-inner
                  .item(:class="{'active': !n}" v-for="(slide, n) in slides")
                    .row.paid-user-row(v-for ="user in slide")
                      .col-md-3.col-sm-4.col-xs-3.pt-20
                            <country-flag :country='user.country' size='big'/>
                      .col-md-9.col-sm-8.col-xs-9
                        h3
                          | {{user.name}}
                        h3.font-bold.blue-text
                          | ${{user.amount}}
                // Carousel nav
                //a.carousel-control.left(href='#paidUsersCarousel' data-slide='prev')
                  i.fa.fa-arrow-left
                //a.carousel-control.right(href='#paidUsersCarousel' data-slide='next')
                  i.fa.fa-arrow-right
      .col-sm-6.col-md-6.col-xs-12.table-coulmn.text-center-mobile(:class="{'pl-50': !isMobile()}")
        h1.font-alt.align-left.color-white.font-bold We just paid
        p.module-subtitle.font-serif.align-left
          | Don't go by our words, just see the stats. See some users who recently made money on {{siteName}}.
        <router-link :to='getPageURL("stats")' class="btn btn-border-w btn-round video-pop-up highlighted-button blue-text font-bold" :class="{'mb-30': isMobile()}">
          |  Learn More
        </router-link>
</template>
<script>
import mixin from '../../../globals/mixin'
import CountryFlag from 'vue-country-flag'
import Service from '../service'
import Preloader from '../../../components/preloader'

export default {
  name: 'PaidUsers',
  service: new Service(),
  components: {
    CountryFlag,
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      loader: true,
      maxRecordsInOneSlide: 3,
      slides: []
    }
  },
  mounted () {
    this.getStats()
  },
  methods: {
    getStats () {
      this.$options.service.getPaidUsersStats()
        .then((d) => {
          this.loader = false
          this.slides = this.formatTheData(d.users)
        })
    },
    formatTheData (users) {
      let finalArr = []
      let index_ = 0
      finalArr[index_] = []
      for (let i in users) {
        if (i > 0 && (i % this.maxRecordsInOneSlide === 0)) {
          ++index_
          finalArr.splice(index_, 0, [])
        }
        finalArr[index_].push(users[i])
      }
      return finalArr
    }
  }
}
</script>
