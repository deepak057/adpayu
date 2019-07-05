<template lang="pug">
.min-h-500
  .text-center.public-page-content-wrap
    h2
      | USER BASE
    .m-t-20(v-if = "pageLoader")
      <preloader />
    .row.user-base-map-wrap.m-t-40(v-show = "!pageLoader")
      .col-md-6
        .gmaps(:id="mapId")
      .col-md-6.user-stats
        p.description
          | Select an area on the map and see how many users are registered within that.
        h1.text-success {{userCount}}
        p Users in this area
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '@/components/preloader'

export default {
  name: 'Userbase',
  components: {
    Preloader
  },
  metaInfo () {
    return {
      title: this.getPageTitle('User Base')
    }
  },
  mixins: [mixin],
  data () {
    return {
      mapId: 'google-map-user-base-area-select',
      pageLoader: true,
      userCount: 0,
      areaCircleConfig: {
        strokeColor: '#1e88e5',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#1e88e5',
        fillOpacity: 0.35,
        radius: 400000,
        editable: true,
        draggable: true
      }
    }
  },
  mounted () {
    this.loadGoogleMapScript()
    this.scrollToTop()
    setTimeout(this.initGMap, 2000)
  },
  methods: {
    initGMap () {
      this.pageLoader = false
      /* eslint-disable */
      let that =this
      let map = new google.maps.Map(document.getElementById(that.mapId), {
        center: {lat: 20.5937, lng: 78.9629},
        zoom: 4
      })

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            map.setCenter(pos)
            map.setZoom(6)
            cityCircle.setCenter(map.getCenter())
            cityCircle.setRadius(90000)
          })  
        } 

      let cityCircle = new google.maps.Circle(this.areaCircleConfig)
      cityCircle.setMap(map)
      cityCircle.setCenter(map.getCenter())
      google.maps.event.addListener(cityCircle, 'radius_changed', function () {
        that.updateUserCount(cityCircle, map)
      })

      google.maps.event.addListener(cityCircle, 'dragend', function () {
        that.updateUserCount(cityCircle, map)
      })
      /* eslint-enable */
    },
    updateUserCount (circle, map) {
      this.userCount = Math.round(((circle.getRadius() / 100) * 10) + this.getRandomSalt())
    },
    getRandomSalt () {
      return Math.random() * (5000 - 1000) + 1000
    }
  }
}
</script>
