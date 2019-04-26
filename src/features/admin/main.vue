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
        .row
          // Column
          .col-lg-3.col-md-6
            .card
              .card-body
                .d-flex.flex-row
                  .round.round-lg.align-self-center.round-info
                    i.ti-wallet
                  .m-l-10.align-self-center
                    h3.m-b-0.font-light $3249
                    h5.text-muted.m-b-0 Advertiser's money
          // Column
          // Column
          .col-lg-3.col-md-6
            .card
              .card-body
                .d-flex.flex-row
                  .round.round-lg.align-self-center.round-warning
                    i.mdi.mdi-cellphone-link
                  .m-l-10.align-self-center
                    h3.m-b-0.font-lgiht $2376
                    h5.text-muted.m-b-0 User's Money
          // Column
          // Column
          .col-lg-3.col-md-6
            .card
              .card-body
                .d-flex.flex-row
                  .round.round-lg.align-self-center.round-primary
                    i.mdi.mdi-cart-outline
                  .m-l-10.align-self-center
                    h3.m-b-0.font-lgiht 1795
                    h5.text-muted.m-b-0 Total Users
          // Column
          // Column
          .col-lg-3.col-md-6
            .card
              .card-body
                .d-flex.flex-row
                  .round.round-lg.align-self-center.round-danger
                    i.mdi.mdi-bullseye
                  .m-l-10.align-self-center
                    h3.m-b-0.font-lgiht 687
                    h5.text-muted.m-b-0 Total Posts
          // Column
</template>
<script>
export default {
  name: 'AdminDashboard'
}
</script>
