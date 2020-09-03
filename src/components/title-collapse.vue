<template lang="pug">
.page-title-collapse-control-wrap
  i.mdi.mdi-tune(title="Show or hide more options" @click="toggleCollapse()")
</template>
<script>
import auth from '@/auth/helpers'

export default {
  name: 'TitleCollapes',
  data () {
    return {
    }
  },
  methods: {
    toggleCollapse () {
      auth.togglePageTitle()
    }
  }
}
</script>
