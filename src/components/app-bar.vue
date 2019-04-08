<template lang="pug">
header.topbar
    nav.navbar.top-navbar.navbar-expand-md.navbar-light
      // ==============================================================
      // Logo
      // ==============================================================
      .navbar-header
        <router-link :to="getTagLink('all')" class="navbar-brand">
          // Logo icon
          b
            // You can put here icon as well // <i class="wi wi-sunset"></i> //
            // Dark Logo icon
            img.dark-logo(src='static/assets/images/logo-icon.png', alt='homepage')
            // Light Logo icon
            img.light-logo(src='static/assets/images/logo-light-icon.png', alt='homepage')
          // End Logo icon
          // Logo text
          span(style='display: none;')
            // dark Logo text
            img.dark-logo(src='static/assets/images/logo-text.png', alt='homepage')
            // Light Logo text
            img.light-logo(src='static/assets/images/logo-light-text.png', alt='homepage')
        </router-link>
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
          <search-bar></search-bar>
          // ==============================================================
          // Messages
          // ==============================================================
          // ==============================================================
          // End Messages
          // ==============================================================
        // ==============================================================
        // User profile and search
        // ==============================================================
        ul.navbar-nav.my-lg-0
          // ==============================================================
          // Comment
          // ==============================================================
          <notification-dropdown></notification-dropdown>
          // ==============================================================
          // ==============================================================
          // Profile
          // ==============================================================
          li.nav-item.dropdown
            a.nav-link.dropdown-toggle.text-muted.waves-effect.waves-dark(href='', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
              img.profile-pic(:src='getMedia(user.pic)', alt='user')
            .dropdown-menu.dropdown-menu-right.scale-up
              ul.dropdown-user
                li
                  .dw-user-box
                    .u-img
                      img(:src='getMedia(user.pic)', alt='user')
                    .u-text
                      h4 {{userName(user)}}
                      // p.text-muted {{user.email}}
                      <router-link :to="userProfileLink()" class="btn btn-rounded btn-danger btn-sm m-t-5">
                        | View Profile
                      </router-link>
                li.divider(role='separator')
                li
                  <router-link :to="userProfileLink()">
                    i.ti-user
                    |  My Profile
                  </router-link>
                // li
                  // a(href='#')
                    // i.ti-wallet
                    // |  My Balance
                // li
                  // a(href='#')
                    // i.ti-email
                    // |  Inbox
                li.divider(role='separator')
                // li
                  // a(href='#')
                    // i.ti-settings
                    // |  Account Setting
                // li.divider(role='separator')
                li
                  a(href='javascript:void(0)' @click="logout")
                    i.fa.fa-power-off
                    |  Logout
</template>

<script>
import auth from '@/auth/helpers'
import mixin from '../globals/mixin.js'
import NotificationDropdown from './notifications/main'
import SearchBar from './search-bar'

export default {
  name: 'AppBar',
  components: {
    NotificationDropdown,
    SearchBar
  },
  mixins: [mixin],
  data () {
    return {
      user: auth.getUser()
    }
  },
  watch: {
    '$store.state.auth.user' (user) {
      this.user = user
    }
  },
  methods: {
    logout () {
      auth.logout()
    }
  }
}
</script>

<style lang="stylus">
</style>
