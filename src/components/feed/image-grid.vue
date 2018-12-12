<template lang="pug">
.card-columns.el-element-overlay.post-image-grid-wrap
  .card(v-for="image in images")
    .el-card-item
      .el-card-avatar.el-overlay-1
        a.image-popup-vertical-fit(:href='getMedia(image.path)')
          img(:src='getMedia(image.path)')
</template>
<script>
import mixin from '../../globals/mixin.js'
export default {
  name: 'ImageGrid',
  mixins: [mixin],
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
