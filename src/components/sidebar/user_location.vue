<template lang="pug">
.user-profile.custom(style='background: url(static/images/map-back.png) no-repeat;')
  div(:id="mapId")
  .profile-img
    i.mdi.mdi-map-marker.sidebar-map-icon.text-danger.cursor-hand
  .profile-text
    a.dropdown-toggle.u-dropdown(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='true')
      i.mdi.mdi-map-marker.m-r-2
      | Your Location
    .dropdown-menu.animated.flipInY
      a.dropdown-item(href='javascript:void(0)')
        i.fa.fa-map-marker
        |  Update Location
// End User profile text
</template>
<script>
import mixin from '@/globals/mixin.js'

export default {
  name: 'UserLocation',
  mixins: [mixin],
  data () {
    return {
      mapId: 'side-bar-map-wrap'
    }
  },
  mounted () {
    this.loadGoogleMapScript()
    setTimeout(this.initGoogleMap, 5000)
  },
  methods: {
    initGoogleMap () {
      /* eslint-disable */
      let map = new google.maps.Map(document.getElementById(this.mapId), {
        center: {lat: 20.5937, lng: 78.9629},
        zoom: 2
      })
      let geocoder = new google.maps.Geocoder

      let marker = new google.maps.Marker({
	    map: map,
	    draggable: true,
	    title: 'Your location'
	  })

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          map.setZoom(17)
          map.setCenter(pos)
          marker.setPosition(map.getCenter())
        })
      }
      marker.setPosition(map.getCenter())
    }
  }
}
</script>
