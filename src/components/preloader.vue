<template lang="pug">
img(:src="getImage()")
</template>
<script>
export default {
  name: 'Preloader',
  props: {
    option: {
      type: Number,
      default: 1
    }
  },
  methods: {
    getImage () {
      return 'static/img/' + this.option + '.gif'
    }
  }
}
</script>
