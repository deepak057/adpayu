<template lang="pug">
 footer.footer
      | © {{getCurrentYear()}} {{siteName}}
</template>

<script>
import mixin from '@/globals/mixin'

export default {
  name: 'AppFooter',
  mixins: [mixin]
}
</script>

<style lang="stylus">
</style>
