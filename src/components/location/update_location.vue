<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Update your location
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          p
            i.mdi.mdi-information-outline.m-r-5
            | Drag and drop the marker or click/tap on your desired location.
          p
            strong
              i.mdi.mdi-map-marker.m-r-5
              | {{formattedAddress}}
              i.fa.fa-refresh.m-l-10.cursor-hand(@click="getCurrentLocation()" title="Reset to current location")
          div(:id="mapId" :class="mapId")
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect(type='button' @click="saveLocation()") Save
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import locationMixin from './location_mixin'
import auth from '@/auth/helpers'

export default {
  name: 'SelectMapArea',
  components: {
    Preloader
  },
  mixins: [mixin, locationMixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-map-update-location',
      mapId: 'google-map-update-location',
      map: '',
      infoWindow: '',
      geocoder: '',
      marker: '',
      formattedAddress: '',
      currentUser: auth.getUser(),
      autoSave: false
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
        return this.id + '-MAP-update-location'
      }
    },
    modalId: {
      get () {
        return this.id + '-update-location-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-update-location-modal-buton-close'
      }
    }
  },
  watch: {
    '$store.state.auth.user' (user) {
      this.onUserLocationUpdate(user)
    }
  },
  mounted () {
    this.loadGoogleMap()
  },
  methods: {
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    triggerPopup () {
      /*eslint-disable*/
      document.getElementById(this.triggerButtonId).click()
      this.initGoogleMap()
    },
    saveLocation () {
      this.updateUserLocation (this.marker.getPosition())
      this.closePopup()
    }
  }
}
</script>
