<template lang="pug">
.user-profile.custom.bg-info.c-white
  .sidebar-map-header-wrap.f-s-16
    span.m-r-5(v-html="getUserCurrencySymbol()")
    | Total Earnings
    i.mdi.mdi-information-outline.cursor-hand.m-l-5(data-container="body" title="Your Location" data-toggle="popover" data-placement="right" data-content="It's total amount of money you have made by consuming the ads. Click on Withdraw button above to get this money transferred to your bank, Paytm or other accounts.")
  div.text-center.centered-content.side-bar-revenue-wrap.m-r-15
    <total-revenue />
  .profile-img.cursor-hand(title="Toggle Map")
    i.mdi.mdi-map-marker.sidebar-map-icon.text-danger.toggle-sidebar
  //.profile-text
    a.small(href='javascript: void(0)')
      span.d-inherit(:class="{'truncate-text': !detailMenuExpended}" @click="showLocationDetails()")
        i.mdi.mdi-map-marker.m-r-2(v-if="!pageLoader")
        span(v-if="!pageLoader")
          | {{formattedAddress}}
        .text-center(v-if="pageLoader")
          | Money...
      i.mdi.menu-icon(v-if="!pageLoader" :class="{'mdi-menu-up': detailMenuExpended, 'mdi-menu-down': !detailMenuExpended}" @click="showLocationDetails()")
      // p.small.m-t-10(v-if="formattedAddress")
        | {{formattedAddress}}
      .text-center.m-t-10.f-s-16.light-text-8(v-if="detailMenuExpended")
        i.fa.fa-edit.m-r-10(@click="updateLocation()" title="Update location")
        i.fa.fa-refresh(@click="getCurrentLocation()" title="Reset to current location")
    .dropdown-menu.animated.flipInY
      a.dropdown-item(href='javascript:void(0)')
        i.fa.fa-map-marker
        |  Update Location
  <update-location ref="updateLocationComp"/>
// End User profile text
</template>
<script>
import mixin from '@/globals/mixin.js'
import Preloader from '@/components/preloader'
import TotalRevenue from '../total-revenue'

export default {
  name: 'Revenue',
  components: {
    Preloader,
    TotalRevenue
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
