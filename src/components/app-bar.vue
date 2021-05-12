<template lang="pug">
header.topbar
    nav.navbar.top-navbar.navbar-expand-md.navbar-light
      // ==============================================================
      // Logo
      // ==============================================================
      .navbar-header.text-left
        <router-link :to="getTagLink('all')" class="navbar-brand logo-side-margin h-100">
          // Logo icon
          b.p-r-t--12
            // You can put here icon as well // <i class="wi wi-sunset"></i> //
            // Dark Logo icon
            // img.dark-logo(:src="getAsset('images/logo-icon.png')" alt='homepage')
            // Light Logo icon
            img.light-logo.logo-icon(:src="getAsset('images/logo-light-icon.png')" alt='homepage')
          // End Logo icon
          // Logo text
          span.m-l-10.p-r-t--12(style='display: none;')
            // dark Logo text
            // img.dark-logo(:src="getAsset('images/logo-text.png')" alt='homepage')
            // Light Logo text
            img.light-logo.m-t-8(:src="getAsset('images/logo-light-text.png')" alt='homepage')
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
            a.nav-link.nav-toggler.hidden-md-up.text-muted.waves-effect.waves-dark(:id="constants.appBarElementsIDs.mobileNavTriggerId" href='javascript:void(0)')
              i.mdi.mdi-menu
          li.nav-item
            a.nav-link.sidebartoggler.hidden-sm-down.text-muted.waves-effect.waves-dark(:id="constants.appBarElementsIDs.navTriggerId" href='javascript:void(0)')
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
              img.profile-pic(:src='getUserProfileImage(user.pic)', alt='user' :class="{'white-default-pic-thumb': !user.pic}")
            .dropdown-menu.dropdown-menu-right.scale-up
              ul.dropdown-user.custom-user-dropdown
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
                  <router-link :to="userProfileLink()+'?tab=timeline'">
                    i.ti-user
                    |  My Content
                  </router-link>
                  <router-link :to="userProfileLink()+'?tab=friends'">
                    i.mdi.mdi-account-multiple-outline
                    |  My Friends
                  </router-link>
                  <router-link :to="userProfileLink()+'?tab=settings'">
                    i.ti-settings
                    |  Settings
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
