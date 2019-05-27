<template lang="pug">
.user-profile.custom()
  .sidebar-map-header-wrap
    i.mdi.mdi-home-map-marker.m-r-5
    | Your Location
    i.mdi.mdi-information-outline.cursor-hand.m-l-5(data-container="body" title="Your Location" data-toggle="popover" data-placement="right" data-content="Specifying your location will enable you to see more relevant promoted posts/ads from local area. If you don't specify your location, you will be able to see only the national and international ads, not the ads from local area.")
  div(:id="mapId")
    .text-center.side-bar-user-location-preloader(v-if="pageLoader")
      <preloader />
  .profile-img
    i.mdi.mdi-map-marker.sidebar-map-icon.text-danger.cursor-hand
  .profile-text
    a.small(href='javascript: void(0)')
      span.d-inherit(:class="{'truncate-text': !detailMenuExpended}" @click="showLocationDetails()")
        i.mdi.mdi-map-marker.m-r-2(v-if="!pageLoader")
        span(v-if="!pageLoader")
          | {{formattedAddress}}
        .text-center(v-if="pageLoader")
          | Getting your location...
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
import locationMixin from '@/components/location/location_mixin'
import auth from '@/auth/helpers'
import UpdateLocation from '@/components/location/update_location'

export default {
  name: 'UserLocation',
  components: {
    UpdateLocation,
    Preloader
  },
  mixins: [mixin, locationMixin],
  data () {
    return {
      mapId: 'side-bar-map-wrap',
      map: '',
      infoWindow: '',
      geocoder: '',
      marker: '',
      formattedAddress: '',
      detailMenuExpended: false,
      currentUser: auth.getUser(),
      pageLoader: true,
      autoSave: true
    }
  },
  watch: {
    '$store.state.auth.user' (user) {
      this.currentUser = user
      this.onUserLocationUpdate(user)
      if (this.map) {
        this.map.setCenter(JSON.parse(this.currentUser.locationCords))
      }
    }
  },
  mounted () {
    this.loadGoogleMap()
    let that = this
    setTimeout(function () {
      that.pageLoader = false
      that.initGoogleMap()
    }, 5000)
  },
  methods: {
    showLocationDetails () {
      this.detailMenuExpended = !this.detailMenuExpended
    },
    updateLocation () {
      this.$refs.updateLocationComp.triggerPopup()
    }
  }
}
</script>
