<template lang="pug">
aside.left-sidebar(style='overflow: visible;')
    // Sidebar scroll
    .scroll-sidebar(style='overflow: hidden;')
      // User profile
      .user-profile(style='background: url(static/assets/images/background/user-info.jpg) no-repeat;')
        // User profile image
        .profile-img
          img(src='static/assets/images/users/profile.png', alt='user')
        // User profile text
        .profile-text
          a.dropdown-toggle.u-dropdown(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='true') {{userName | capitalize}}
          .dropdown-menu.animated.flipInY
            a.dropdown-item(href='#')
              i.ti-user
              |  My Profile
            a.dropdown-item(href='#')
              i.ti-wallet
              |  My Balance
            a.dropdown-item(href='#')
              i.ti-email
              |  Inbox
            .dropdown-divider
            a.dropdown-item(href='#')
              i.ti-settings
              |  Account Setting
            .dropdown-divider
            a.dropdown-item(href='login.html')
              i.fa.fa-power-off
              |  Logout
      // End User profile text
      // Preloader
      .sidebar-preloader(v-show="preloader")
        <preloader></preloader>
      // Sidebar navigation
      nav.sidebar-nav(v-show="!preloader")
        ul#sidebarnav
          <router-link tag="li" v-for="(item, k) in menuItems" :to="getTagLink(item.name)">
            a.waves-effect.waves-dark(aria-expanded='false')
              i.mdi(:class="item.icon")
              span.hide-menu {{item.name | capitalize}}
          </router-link>
      // End Sidebar navigation
    // End Sidebar scroll
    // Bottom points
    .sidebar-footer
      // item
      a.link(href='', data-toggle='tooltip', title='Settings')
        i.ti-settings
      // item
      a.link(href='', data-toggle='tooltip', title='Email')
        i.mdi.mdi-gmail
      // item
      a.link(href='', data-toggle='tooltip', title='Logout')
        i.mdi.mdi-power
    // End Bottom points
</template>

<script>
import auth from '@/auth/helpers'
import store from '@/store'
import mixin from '../globals/mixin.js'
import Service from './service'
import Preloader from './preloader'

export default {
  name: 'AppSidebar',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  props: {
    cat: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      preloader: true,
      defaultItem: {
        name: 'all',
        icon: 'mdi-gauge',
        default: true
      },
      userName: store.state.auth.user.name
    }
  },
  computed: {
    /* isActive: {
      get () {
        return this.$store.state.common.sidebar.visible
      },
      set (val) {
        this.$store.dispatch('common/updateSidebar', { visible: val })
      }
    } */
  },
  mounted () {
    let that = this
    this.$options.service.getTags()
      .then((data) => {
        // add the default menu item
        data.tags.unshift(that.defaultItem)
        that.menuItems = data.tags
        that.preloader = false
      })
      .catch((Tagserror) => {
        alert('Soemthing went wrong while getting your tags')
      })
  },
  methods: {
    logout () {
      auth.logout()
    },
    getTagLink (tag) {
      return '/tag/' + tag
    }
  }
}
</script>

<style lang="stylus">
</style>
