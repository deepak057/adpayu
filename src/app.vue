<template lang="pug">
  #app
    component(:is="component")
      slot
    <notifications group="appNotifications" position="top center" class="top-20"/>
    <notifications group="tips" position="bottom right" class="bottom-20">
      template(class="vue-notification" slot='body' slot-scope='props')
        .vue-notifcation.tip-notification-custom-template.bg-info
          .tip-notification-custom-template-icon(v-html="props.item.data.symbol")
          .tip-notification-custom-template-content
            .tip-notification-custom-template-title
              | {{props.item.title}}
            .tip-notification-custom-template-text(v-html='props.item.text')
          .tip-notification-custom-template-close(@click='props.close')
            i.mdi.mdi-close
    </notifications>
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
