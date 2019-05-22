<template lang="pug">
.user-profile.custom()
  .sidebar-map-header-wrap
    i.mdi.mdi-home-map-marker.m-r-5
    | Your Location
  div(:id="mapId")
  .profile-img
    i.mdi.mdi-map-marker.sidebar-map-icon.text-danger.cursor-hand
  .profile-text
    a.small(href='javascript: void(0)')
      span.d-inherit(:class="{'truncate-text': !detailMenuExpended}" @click="showLocationDetails()")
        i.mdi.mdi-map-marker.m-r-2
        | {{formattedAddress}}
      i.mdi.menu-icon(:class="{'mdi-menu-up': detailMenuExpended, 'mdi-menu-down': !detailMenuExpended}" @click="showLocationDetails()")
      // p.small.m-t-10(v-if="formattedAddress")
        | {{formattedAddress}}
      .text-center.m-t-10.f-s-16.light-text-8(v-if="detailMenuExpended")
        i.fa.fa-edit.m-r-10(@click="updateLocation()")
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
import locationMixin from './location_mixin'
import auth from '@/auth/helpers'
import UpdateLocation from './update_location'

export default {
  name: 'UserLocation',
  components: {
    UpdateLocation
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
      currentUser: auth.getUser()
    }
  },
  mounted () {
    this.loadGoogleMap()
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
