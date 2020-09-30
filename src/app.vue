<template lang="pug">
  #app
    component(:is="component")
      slot
    <notifications group="appNotifications" position="top center" class="top-20"/>
    <notifications group="tips" position="bottom right" class="bottom-20"/>
</template>

<script>
import PublicLayout from '@/layouts/public/main.vue'
import DefaultLayout from '@/layouts/default/main.vue'
import AdminLayout from '@/layouts/admin/main.vue'

export default {
  name: 'App',

  components: {
    PublicLayout,
    DefaultLayout,
    AdminLayout
  },

  computed: {
    component () {
      return this.$store.state.common.layout
    }
  },

  mounted () {
    // Update page title.
    this.$store.watch((state) => {
      return state.common.title
    }, (title) => {
      document.title = title
    }, {
      deep: true
    })
  }
}
</script>
