<template lang="pug">
img(:src="getImage()")
</template>
<script>
import mixin from '../globals/mixin'
export default {
  name: 'Preloader',
  mixins: [mixin],
  props: {
    option: {
      type: Number,
      default: 1
    }
  },
  methods: {
    getImage () {
      return this.staticImageUrl(this.option + '.gif')
    }
  }
}
</script>
