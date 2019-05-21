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
// End User profile text
</template>
<script>
import mixin from '@/globals/mixin.js'
import auth from '@/auth/helpers'

export default {
  name: 'UserLocation',
  mixins: [mixin],
  data () {
    return {
      mapId: 'side-bar-map-wrap',
      map: '',
      infoWindow: '',
      geocoder: '',
      marker: '',
      formattedAddress: '',
      maxlenAddress: 10,
      detailMenuExpended: false,
      currentUser: auth.getUser()
    }
  },
  mounted () {
    this.loadGoogleMapScript()
    setTimeout(this.initGoogleMap, 5000)
  },
  methods: {
    showLocationDetails () {
      this.detailMenuExpended = !this.detailMenuExpended
    },
    initGoogleMap () {
      let that = this
      /* eslint-disable */


      
      this.map = new google.maps.Map(document.getElementById(this.mapId), {
        center: {lat: 20.5937, lng: 78.9629},
        zoom: 2
      })
      this.geocoder = new google.maps.Geocoder
      this.infoWindow = new google.maps.InfoWindow;

      this.marker = new google.maps.Marker({
	    map: that.map,
	    draggable: true,
	    title: 'Your location'
	  })
	  
      google.maps.event.addListener(that.marker, 'click', function(event) {
        that.updateLocationOnMap(event.latLng)
        that.showInfoWindow()
  	  })
  	  google.maps.event.addListener(that.marker, 'dragend', function(event) {
          that.updateUserLocation(event.latLng)
          that.updateLocationOnMap(event.latLng)
  	  })
      if (!this.currentUser.locationCords) {
        this.getCurrentLocation()
      } else {
        this.updateLocationOnMap(JSON.parse(this.currentUser.locationCords))
      }
    },
    getCurrentLocation () {
      let that = this
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          that.updateUserLocation(pos)
          that.updateLocationOnMap(pos)
        })
      } else {
        this.setMapToUserCountry ()
      }
    },
    setMapToUserCountry () {
    },
    updateUserLocation (cords) {
      this.currentUser.locationCords = JSON.stringify(cords)
      auth.updateCurrentUser(this.currentUser)
    },
    updateLocationOnMap (pos) {
      let that = this
      that.map.setZoom(17)
      that.map.setCenter(pos)
      this.marker.setPosition(pos);
      this.geocoder.geocode({'location': pos}, function(results, status) {
    	if (status === 'OK') {
  			if (results[0]) {
  			  that.formattedAddress = results[0].formatted_address 
  			} else {
  				// that.infoWindow.setContent('Your location.')
  			}
  		} else {
  			// that.infoWindow.setContent('Your location.')
  		}	
      })
    },
    showInfoWindow () {
      this.infoWindow.close()
      this.infoWindow.setContent('<div style="text-align: center"><h4> Your Location </h4><p>' + this.formattedAddress + '</p></div>')
      this.infoWindow.open(this.map, this.marker)
    },
    updateLocation () {
    }
  }
}
</script>
