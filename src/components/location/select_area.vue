<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Select an area
            i.mdi.mdi-information-outline.cursor-hand.m-l-5.text-muted.p-r-t-1(data-container="body" title="Select an Area on Map" data-toggle="popover" data-placement="right" data-content='You can drag or expand the circle to select the area of your choice. Once you are sure about the location, hit Save button. This ad will be shown only to the people who live within that selected area')
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          div(:id="mapId" :class="mapId")
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect(type='button' @click="emitEvent()") Save
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'

export default {
  name: 'SelectMapArea',
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-map-select-area-',
      mapId: 'google-map-area-select',
      areaCircleConfig: {
        strokeColor: '#1e88e5',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#1e88e5',
        fillOpacity: 0.35,
        radius: 200000,
        editable: true,
        draggable: true
      },
      defaultMapCenter: {lat: 20.5937, lng: 78.9629},
      mapArea: '',
      zoomLevel: 4
    }
  },
  computed: {
    modalIdHash: {
      get () {
        return '#' + this.modalId
      }
    },
    triggerButtonId: {
      get () {
        return this.id + '-MAP'
      }
    },
    modalId: {
      get () {
        return this.id + '-area-select-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-area-select-modal-buton-close'
      }
    }
  },
  mounted () {
    this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBwMd4oRgisDbb4gxsTsmBZwgk1WBITlGQ&callback=initMap')
  },
  methods: {
    updateArea (cityCircle, map) {
      this.mapArea = {
        radius: cityCircle.getRadius(),
        center: cityCircle.getCenter(),
        zoom: map.getZoom()
      }
    },
    emitEvent () {
      this.closePopup()
      this.$emit('MapAreaUpdated', this.mapArea)
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    triggerPopup (defaultCords) {
      /*eslint-disable*/
      let that = this
      let cityCircle
      let map
      defaultCords = defaultCords ? JSON.parse(defaultCords) : ''
      let defaultCenter = defaultCords ? defaultCords.center: that.defaultMapCenter
      document.getElementById(this.triggerButtonId).click()
      map = new google.maps.Map(document.getElementById(that.mapId), {
            zoom: that.zoomLevel,
            center: defaultCenter
      })
      cityCircle = new google.maps.Circle(this.areaCircleConfig)
      cityCircle.setMap(map)

      if (defaultCords) {
        map.setZoom(defaultCords.zoom)
        cityCircle.setCenter(defaultCenter)
        cityCircle.setRadius(defaultCords.radius)
        that.updateArea(cityCircle, map)
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            map.setCenter(pos)
            map.setZoom(15)
            cityCircle.setCenter(map.getCenter())
            cityCircle.setRadius(500)
            that.updateArea(cityCircle, map)
          })  
        }
        cityCircle.setCenter(map.getCenter())
        that.updateArea(cityCircle, map)
      }
      google.maps.event.addListener(cityCircle, 'radius_changed', function () {
        that.updateArea(cityCircle, map)
      })

      google.maps.event.addListener(cityCircle, 'dragend', function () {
        that.updateArea(cityCircle, map)
      })

      map.addListener('zoom_changed', function() {
        that.updateArea(cityCircle, map)
      })
    }
  }
}
</script>
