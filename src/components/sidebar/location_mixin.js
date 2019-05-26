import auth from '@/auth/helpers'

export default {
  data () {
    return {
      defaultLanLat: {lat: 20.5937, lng: 78.9629}
    }
  },
  methods: {
    loadGoogleMap () {
      this.loadGoogleMapScript()
    },
    initGoogleMap () {
      let that = this
      /* eslint-disable */
      this.map = new google.maps.Map(document.getElementById(this.mapId), {
        center: that.defaultLanLat,
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
      google.maps.event.addListener(that.map, 'click', function(event) {
        that.updateUserLocation(event.latLng)
        that.updateLocationOnMap(event.latLng)
      })
      
      google.maps.event.addListener(that.marker, 'dragend', function(event) {
          that.updateUserLocation(event.latLng)
          that.updateLocationOnMap(event.latLng)
          //that.showInfoWindow()
      })
      if (!this.currentUser.locationCords) {
        this.getCurrentLocation()
      } else {
        this.updateLocationOnMap(JSON.parse(this.currentUser.locationCords))
        this.positionMap(JSON.parse(this.currentUser.locationCords))
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
          that.positionMap(pos)
        }, function(error) {
             if (error.code == error.PERMISSION_DENIED) {
                that.setMapToUserCountry()
              }
            })
      }
    },
    setMapToUserCountry () {
      let pos = this.map.getCenter()
      this.updateLocationOnMap(pos)
    },
    positionMap (pos) {
      this.map.setCenter(pos)
      this.map.setZoom(17)
    },
    updateUserLocation (cords) {
      this.currentUser.locationCords = JSON.stringify(cords)
      auth.updateCurrentUser(this.currentUser)
        .then((data) => {
          if (data.success) {
            this.showNotification('Location Updated.', 'success')
          }
        })
    },
    updateLocationOnMap (pos) {
      let that = this
      // this.map.setZoom(17)
      // this.map.setCenter(pos)
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
