<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" data-backdrop="static" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.video-overlay-view(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Title
            a.m-l-5(href="javascript:void(0)" @click="next()")
              | Next
            a.m-l-5(href="javascript:void(0)" @click="prev()")
              | Prev
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body.p-b-0
          <feed :feed="[feed[currentPost]]"/>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          //<preloader class="m-l-5 preloader-next-to-text"/>
</template>
<script>
import mixin from '../../globals/mixin.js'
import Preloader from './../../components/preloader'
import Feed from './../../components/feed/feed'

export default {
  name: 'OverlayView',
  components: {
    Preloader,
    Feed
  },
  mixins: [mixin],
  props: {
    feed: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      triggered: false,
      id: this.getUniqueId() + '-overlay-view-modal',
      loader: true,
      currentPost: 0
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
        return this.id + '-overlay-view-modal'
      }
    },
    modalId: {
      get () {
        return this.id + '-overlay-view-modal-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '--overlay-view-modal-buton-close'
      }
    }
  },
  watch: {
    feed (newV) {
      if (newV.length) {
        // this.currentPost = [newV[0]]
        // alert(Array.isArray(this.currentPost))
      }
    }
  },
  methods: {
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    getPost () {
      this.loader = false
      return [
        this.feed[0]
      ]
    },
    next () {
      this.currentPost++
    },
    prev () {
      this.currentPost--
    },
    triggerPopup () {
      /*eslint-disable*/
      this.triggered = true
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval(()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
          }
        }, 100)
      } else {
        d.click()
      }
    }
  }
}
</script>
