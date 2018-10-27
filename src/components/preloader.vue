<template lang="pug">
img(src="static/img/l1.gif")
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
