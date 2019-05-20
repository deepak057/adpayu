<template lang="pug">
.user-profile.custom()
  .sidebar-map-header-wrap
    | Your Location
  div(:id="mapId")
  .profile-img
    i.mdi.mdi-map-marker.sidebar-map-icon.text-danger.cursor-hand
  .profile-text
    a.dropdown-toggle.u-dropdown.small(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='true')
      i.mdi.mdi-map-marker.m-r-2
      | {{formattedAddress}}
      // p.small.m-t-10(v-if="formattedAddress")
        | {{formattedAddress}}
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
      maxlenAddress: 10
    }
  },
  mounted () {
    this.loadGoogleMapScript()
    setTimeout(this.initGoogleMap, 5000)
  },
  methods: {
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

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          that.updateUserLocation(pos)
          that.updateLocationOnMap(pos)
        })
      }
      this.marker.setPosition(this.map.getCenter())
      google.maps.event.addListener(that.marker, 'click', function(event) {
        that.updateLocationOnMap(event.latLng)
        that.showInfoWindow()
  	  });
    },
    updateUserLocation (cords) {
      let user = auth.getUser()
      user.locationCords = JSON.stringify(cords)
      auth.updateCurrentUser(user)
    },
    updateLocationOnMap (pos) {
      let that = this
      that.map.setZoom(17)
      that.map.setCenter(pos)
      this.marker.setPosition(pos);
      this.geocoder.geocode({'location': pos}, function(results, status) {
    	if (status === 'OK') {
    	  console.log(results)
  			if (results[0]) {
  			  that.formattedAddress = results[2].formatted_address 
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
    }
  }
}
</script>
