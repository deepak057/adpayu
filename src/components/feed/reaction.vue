<template lang="pug">
div(v-if="triggered")
  .reaction-wrap(:class="{'block': shown, 'none': !shown}")
    .reaction-modal-header
      .text-center
        h5
          | Reactions
        .reaction-close(@click="close()")
          i.fa.fa-chevron-down.pointer
    .reaction-modal-body
      .hv-align(v-if="loading")
        <preloader class="loader-medium" />
    .reaction-footer
    .row
      .col-10
        textarea.form-control.b-0(placeholder='Type your message here')
      .col-2.text-right
        button.btn.btn-info.btn-circle.post-reaction-btn(:class="{'btn-lg': !isMobile()}" type='button')
          i.fa.fa-paper-plane-o
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import Service from './service'

export default {
  name: 'Reaction',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      id: this.getUniqueId() + '-reaction-wrap',
      triggered: false,
      shown: false,
      loading: true
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    close () {
      this.shown = false
    },
    trigger () {
      this.triggered = true
      this.shown = true
    }
  }
}
</script>
