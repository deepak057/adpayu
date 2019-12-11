<template lang="pug">
.card-body
  video(:id="videoElementId")
  <vue-range-slider ref="trimVideoRangeSlider" v-model="value" :min="min" :max="max" :enable-cross="enableCross" />
</template>
<script>
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
import mixin from '../../globals/mixin'

function trimVideoInitialState () {
  return {
    value: [0, 100],
    min: 0,
    max: 250,
    enableCross: false
  }
}

export default {
  name: 'TrimVideo',
  components: {
    VueRangeSlider
  },
  mixins: [mixin],
  props: {
    videoObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return trimVideoInitialState()
  },
  created () {
    this.videoElementId = this.getUniqueId()
  },
  methods: {
    refresh () {
      /*
      * produce the delay of 100 miliseconds
      * so that refresh method is called
      * when the container is fully visible
      */
      setTimeout(() => {
        this.$refs.trimVideoRangeSlider.refresh()
      }, 100)
    }
  }
}
</script>
