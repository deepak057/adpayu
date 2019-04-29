<template lang="pug">
div
  link(href='static/assets/plugins/bootstrap/css/bootstrap.min.css', rel='stylesheet')
  // Popup CSS
  link(href='static/assets/plugins/Magnific-Popup-master/dist/magnific-popup.css', rel='stylesheet')
  // Custom CSS
  link(href='static/material/css/style.css', rel='stylesheet')
  // You can change the theme colors from here
  link#theme(href='static/material/css/colors/blue.css', rel='stylesheet')
  // ==============================================================
  // Preloader - style you can find in spinners.css
  // ==============================================================
  .preloader
    svg.circular(viewBox='25 25 50 50')
      circle.path(cx='50', cy='50', r='20', fill='none', stroke-width='2', stroke-miterlimit='10')
  // ==============================================================
  // Main wrapper - style you can find in pages.scss
  // ==============================================================
  #main-wrapper
    // ==============================================================
    // Topbar header - style you can find in pages.scss
    // ==============================================================
    header.topbar.is_stuck
      nav.navbar.top-navbar.navbar-expand-md.navbar-light
        // ==============================================================
        // Logo
        // ==============================================================
        .navbar-header
          a.navbar-brand(href='index.html')
            // Logo icon
            b
              // You can put here icon as well // <i class="wi wi-sunset"></i> //
              // Dark Logo icon
              img.dark-logo(src='/static/assets/images/logo-icon.png', alt='homepage')
              // Light Logo icon
              img.light-logo(src='/static/assets/images/logo-light-icon.png', alt='homepage')
            // End Logo icon
            // Logo text
            span(style='display: none')
              // dark Logo text
              img.dark-logo(src='/static/assets/images/logo-text.png', alt='homepage')
              // Light Logo text
              img.light-logo(src='/static/assets/images/logo-light-text.png', alt='homepage')
        // ==============================================================
        // End Logo
        // ==============================================================
        .navbar-collapse
          // ==============================================================
          // toggle and nav items
          // ==============================================================
          ul.navbar-nav.mr-auto.mt-md-0
            // This is
            li.nav-item
              a.nav-link.nav-toggler.hidden-md-up.text-muted.waves-effect.waves-dark(href='javascript:void(0)')
                i.mdi.mdi-menu
            li.nav-item
              a.nav-link.sidebartoggler.hidden-sm-down.text-muted.waves-effect.waves-dark(href='javascript:void(0)')
                i.ti-menu
            // ==============================================================
            // Search
            // ==============================================================
            li.nav-item.hidden-sm-down.search-box
              a.nav-link.hidden-sm-down.text-muted.waves-effect.waves-dark(href='javascript:void(0)')
                i.ti-search
              form.app-search
                input.form-control(type='text', placeholder='Search & enter')
                a.srh-btn
                  i.ti-close
            // ==============================================================
            // Messages
            // ==============================================================
            // ==============================================================
            // User profile and search
            // ==============================================================
          ul.navbar-nav.my-lg-0
            // ==============================================================
            // Profile
            // ==============================================================
            li.nav-item.dropdown
              a.nav-link.dropdown-toggle.text-muted.waves-effect.waves-dark(href='', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                img.profile-pic(src='/static/assets/images/users/1.jpg', alt='user')
              .dropdown-menu.dropdown-menu-right.scale-up
                ul.dropdown-user
                  li
                    .dw-user-box
                      .u-img
                        img(src='/static/assets/images/users/1.jpg', alt='user')
                      .u-text
                        h4 Steave Jobs
                        p.text-muted varun@gmail.com
                        a.btn.btn-rounded.btn-danger.btn-sm(href='profile.html') View Profile
                  li.divider(role='separator')
                  li
                    a(href='#')
                      i.ti-user
                      |  My Profile
                  li
                    a(href='#')
                      i.ti-wallet
                      |  My Balance
                  li
                    a(href='#')
                      i.ti-email
                      |  Inbox
                  li.divider(role='separator')
                  li
                    a(href='#')
                      i.ti-settings
                      |  Account Setting
                  li.divider(role='separator')
                  li
                    a(href='#')
                      i.fa.fa-power-off
                      |  Logout
    // ==============================================================
    // End Topbar header
    // ==============================================================
    // ==============================================================
    // Left Sidebar - style you can find in sidebar.scss
    // ==============================================================
    aside.left-sidebar
      // Sidebar scroll
      .scroll-sidebar
        // User profile
        .user-profile(style='background: url(/static/assets/images/background/user-info.jpg) no-repeat;')
          // User profile image
          .profile-img
            img(src='/static/assets/images/users/profile.png', alt='user')
          // User profile text
          .profile-text
            a.dropdown-toggle.u-dropdown(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='true') Markarn Doe
            .dropdown-menu.animated.flipInY
              a.dropdown-item(href='login.html')
                i.fa.fa-power-off
                |  Logout
        // End User profile text
        // Sidebar navigation
        nav.sidebar-nav
          ul#sidebarnav
            <router-link tag="li" :to="adminURL('overview')">
              a.waves-effect.waves-dark.no-ative-anchor
                i.mdi.mdi-gauge
                span.hide-menu Dashboard
            </router-link>
            <router-link tag="li" :to="adminURL('posts')">
              a.waves-effect.waves-dark.no-ative-anchor
                i.mdi.mdi-gauge
                span.hide-menu Posts
            </router-link>
    .page-wrapper
      router-view
</template>
<script>
import mixin from '@/globals/mixin'

export default {
  name: 'AdminLayout',
  mixins: [mixin],
  data () {
    return {
      scripts: [
        'static/assets/plugins/jquery/jquery.min.js',
        'static/assets/plugins/bootstrap/js/popper.min.js',
        'static/assets/plugins/bootstrap/js/bootstrap.min.js',
        'static/material/js/waves.js',
        'static/material/js/sidebarmenu.js',
        'static/assets/plugins/sticky-kit-master/dist/sticky-kit.min.js',
        'static/assets/plugins/sparkline/jquery.sparkline.min.js',
        'static/assets/plugins/Magnific-Popup-master/dist/jquery.magnific-popup.min.js',
        'static/material/js/custom.js'
      ]
    }
  },
  mounted () {
    for (let i in this.scripts) {
      this.loadScript(this.scripts[i])
    }
  },
  methods: {
    ifHomePage () {
      return this.$route.name === 'home'
    }
  }
}
</script>
