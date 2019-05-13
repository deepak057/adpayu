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
      document.getElementById(this.triggerButtonId).click()
      let citymap = {
        chicago: {
          center: {lat: 41.878, lng: -87.629},
          population: 2714856
        }
      }
      var map = new google.maps.Map(document.getElementById(this.mapId), {
        zoom: 4,
        center: {lat: 37.090, lng: -95.712},
        mapTypeId: 'terrain'
      })
      for (var city in citymap) {
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: citymap[city].center,
          radius: Math.sqrt(citymap[city].population) * 100,
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
}
</script>
