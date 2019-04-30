<template lang="pug">
.row
  .col-12.public-page-content-wrap
    .text-center
      h2.font-alt Advertise on {{siteName}}
</template>
<script>
import mixin from '../../globals/mixin'

export default {
  name: 'Advertise',
  mixins: [mixin],
  mounted () {
    this.setDocumentTitle(this.getPageTitle('Advertise'))
    this.scrollToTop()
  }
}
</script>
