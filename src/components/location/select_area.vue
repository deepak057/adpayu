<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title Select an area
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          div(:id="mapId" :class="mapId")
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect(type='button') Proceed
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
      mapId: 'google-map-area-select'
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
    triggerPopup () {
      /*eslint-disable*/
      let that = this
      document.getElementById(this.triggerButtonId).click()
      let map = new google.maps.Map(document.getElementById(that.mapId), {
            zoom: 4,
            center: {lat: 20.5937, lng: 78.9629},
          })
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          map.setCenter(pos)
          map.setZoom(14)
        })  
      }
    // Add the circle for this city to the map.
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: map.getCenter(),
      radius: 2000,
      editable: true,
      draggable: true
    })

    google.maps.event.addListener(cityCircle, 'radius_changed', function () {
      console.log(cityCircle.getRadius() + ' ' + cityCircle.getCenter())
    })

    google.maps.event.addListener(cityCircle, 'dragend', function () {
      console.log(cityCircle.getRadius() + ' ' + cityCircle.getCenter())
    })
    }
  }
}
</script>
