<template lang="pug">
div
      // Container fluid
      // ==============================================================
      .container-fluid
        // ==============================================================
        // Bread crumb and right sidebar toggle
        // ==============================================================
        .row.page-titles
          .col-md-5.col-8.align-self-center
            h3.text-themecolor ADMIN PANEL
            ol.breadcrumb
              li.breadcrumb-item
                a(href='javascript:void(0)') Home
              li.breadcrumb-item.active Dashboard
        // ==============================================================
        // End Bread crumb and right sidebar toggle
        // ==============================================================
        // ==============================================================
        // Start Page Content
        // ==============================================================
        <overview v-if="page('overview')"/>
        <posts v-if="page('posts')"/>
</template>
<script>
import Overview from './overview'
import Posts from './posts'

export default {
  name: 'AdminDashboard',
  components: {
    Overview,
    Posts
  },
  methods: {
    page (page) {
      return page === (this.$route.params.action || 'overview')
    }
  }
}
</script>
