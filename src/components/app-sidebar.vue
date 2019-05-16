<template lang="pug">
aside.left-sidebar(style='overflow: visible;')
    // Sidebar scroll
    .scroll-sidebar(style='overflow: hidden;')
      // User profile
      .user-profile(:id="mapId" style='background: url(static/assets/images/background/user-info.jpg) no-repeat;')
        // User profile image
        .profile-img
          img(:src='getMedia(user.pic)', alt='user')
        // User profile text
        .profile-text
          a.dropdown-toggle.u-dropdown(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='true') {{userName(user)}}
          .dropdown-menu.animated.flipInY
            <router-link class="dropdown-item" :to="userProfileLink()">
              i.ti-user
              |  My Profile
            </router-link>
            // a.dropdown-item(href="#")
              // i.ti-wallet
              // |  My Balance
            // a.dropdown-item(href='#')
              // i.ti-email
              // |  Inbox
            // .dropdown-divider
            // a.dropdown-item(href='#')
              // i.ti-settings
              // |  Account Setting
            // .dropdown-divider
            a.dropdown-item(href='javascript:void(0)' @click="logout()")
              i.fa.fa-power-off
              |  Logout
      // End User profile text
      // Preloader
      .sidebar-preloader(v-show="preloader")
        <preloader></preloader>
      // Sidebar navigation
      nav.sidebar-nav(v-show="!preloader")
        ul#sidebarnav
          <router-link tag="li" v-for="(item, k) in menuItems" :to="getTagLink(item.name)" :key="item.name">
            a.waves-effect.waves-dark.no-ative-anchor(aria-expanded='false')
              i.mdi(:class="item.icon")
              span.hide-menu {{item.name | capitalize}}
          </router-link>
          li.add-topics-wrap
            <router-link tag="a" to="/tags" class="waves-effect waves-dark" title="Browse and add more topics in your feed">
              i.mdi.mdi-plus
              span.hide-menu
                |  Add Topics
            </router-link>
      // End Sidebar navigation
    // End Sidebar scroll
    // Bottom points
    // .sidebar-footer
      // item
      // a.link(href='', data-toggle='tooltip', title='Settings')
        // i.ti-settings
      // item
      // a.link(href='', data-toggle='tooltip', title='Email')
        // i.mdi.mdi-gmail
      // item
      // a.link(href='', data-toggle='tooltip', title='Logout')
        // i.mdi.mdi-power
    // End Bottom points
</template>

<script>
import auth from '@/auth/helpers'
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
      user: auth.getUser(),
      menuItems: [],
      mapId: 'side-bar-map-wrap'
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
  watch: {
    '$store.state.auth.userTags' (tags) {
      this.menuItems = tags
    },
    '$store.state.auth.user' (user) {
      this.user = user
    }
  },
  mounted () {
    this.loadGoogleMapScript()
    this.$options.service.getTags()
      .then((data) => {
        // add the default menu item
        data.tags.unshift(this.defaultItem)
        this.menuItems = data.tags
        auth.updateUserTags(data.tags)
        this.preloader = false
      })
      .catch((Tagserror) => {
        alert('Soemthing went wrong while getting your tags')
      })
    this.initGoogleMap()
  },
  methods: {
    logout () {
      auth.logout()
    },
    initGoogleMap () {
      /* eslint-disable */
      let that = this
      setTimeout(function () {
        let map = new google.maps.Map(document.getElementById(that.mapId), {
          center: {lat: 20.5937, lng: 78.9629},
          zoom: 14
        })  
      }, 5000)  
    }
  }
}
</script>

<style lang="stylus">
</style>
