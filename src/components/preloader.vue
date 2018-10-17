<template lang="pug">
.feed-preloader(v-if="show")
  svg.circular(viewBox='25 25 50 50')
    circle.path(cx='50', cy='50', r='20', fill='none', stroke-width='2', stroke-miterlimit='10')
</template>
<script>
export default {
  name: 'Preloader',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>
