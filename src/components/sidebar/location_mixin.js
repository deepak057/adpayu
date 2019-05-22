import auth from '@/auth/helpers'

export default {
  methods: {
    loadGoogleMap () {
      this.loadGoogleMapScript()
      setTimeout(this.initGoogleMap, 5000)
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
  }
}
