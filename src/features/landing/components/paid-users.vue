<template lang="pug">
section.module.bg-dark.landing-reason(:style="getTheImage('paid-user-background.png')")
  .container
    .row(:class="{'change-direction-row': isMobile(), 'is-table-row': !isMobile()}")
      .col-sm-6.col-md-6.col-xs-12.table-coulmn(:class="{'mt-20': isMobile()}")
        .div
          .col-md-12.col-sm-12
            .row
              #paidUsersCarousel.carousel.slide.vertical.paid-users-carousel(data-ride="carousel")
                // Carousel items
                .carousel-inner
                  .item(:class="{'active': !n}" v-for="(slide, n) in slides")
                    .row.paid-user-row(v-for ="user in slide")
                      .col-md-2.col-sm-2.col-xs-3.pt-20
                            <country-flag :country='user.country' size='big'/>
                      .col-md-10.col-sm-10.col-xs-9
                        h3
                          | {{user.name}}
                        h3.font-bold.blue-text
                          | ${{user.amount}}
                // Carousel nav
                a.carousel-control.left(href='#paidUsersCarousel' data-slide='prev') ‹
                a.carousel-control.right(href='#paidUsersCarousel' data-slide='next') ›
      .col-sm-6.col-md-6.col-xs-12.table-coulmn(:class="{'pl-50': !isMobile()}")
        h1.font-alt.align-left.color-white.font-bold We just paid
        p.module-subtitle.font-serif.align-left
          | Don't go by our words, just see the stats. See some users who recently made money on {{siteName}}.
        a.btn.btn-border-w.btn-round.video-pop-up.highlighted-button.blue-text.font-bold(target="_blank" :href='getPageURL("stats")')
          |  Learn More
</template>
<script>
import mixin from '../../../globals/mixin'
import CountryFlag from 'vue-country-flag'

export default {
  name: 'PaidUsers',
  components: {
    CountryFlag
  },
  mixins: [mixin],
  data () {
    return {
      users: [
        {
          name: 'Harish Rawat',
          country: 'In',
          amount: 25
        },
        {
          name: 'James Chin',
          country: 'US',
          amount: 30
        },
        {
          name: 'Javed Khan',
          country: 'in',
          amount: 20
        },
        {
          name: 'Sam Curren',
          country: 'Us',
          amount: 35
        }
      ],
      maxRecordsInOneSlide: 3,
      slides: []
    }
  },
  mounted () {
    this.slides = this.formatTheData()
  },
  methods: {
    formatTheData () {
      let finalArr = []
      let index_ = 0
      finalArr[index_] = []
      for (let i in this.users) {
        if (i > 0 && (i % this.maxRecordsInOneSlide === 0)) {
          ++index_
          finalArr.splice(index_, 0, [])
        }
        finalArr[index_].push(this.users[i])
      }
      return finalArr
    }
  }
}
</script>
