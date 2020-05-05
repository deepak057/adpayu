<template lang="pug">
aside.left-sidebar.bg-special-2(style='overflow: visible;')
    // Sidebar scroll
    .scroll-sidebar(style='overflow: hidden;')
      <user-location />
      // Preloader
      .sidebar-preloader(v-show="preloader")
        <preloader></preloader>
      // Sidebar navigation
      nav.sidebar-nav.bg-special-2(v-if="!preloader")
        ul#sidebarnav
          <router-link tag="li" v-for="(item, k) in menuItems" :to="getTagLink(item.name)" :key="item.name">
            a.waves-effect.waves-dark.no-ative-anchor(aria-expanded='false')
              i.mdi(:class="item.icon")
              span.hide-menu {{ (item.name === 'all' ? 'All Tags' : item.name) | capitalize}}
          </router-link>
          li.add-topics-wrap
            <router-link tag="a" to="/tags" class="waves-effect waves-dark" title="Browse and add more topics in your feed">
              i.mdi.mdi-tag-plus
              span.hide-menu
                |  Follow Tags
            </router-link>
          li.add-topics-wrap
            <router-link tag="a" :to="postAnswerPageLink()" class="waves-effect waves-dark" title="Add video or text answers to unanswered questions">
              i.mdi.mdi-comment-plus-outline
              span.hide-menu
                |  Add Answer
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
import mixin from '@/globals/mixin.js'
import Service from './service'
import Preloader from '../preloader'
import UserLocation from './user_location'

export default {
  name: 'AppSidebar',
  service: new Service(),
  components: {
    Preloader,
    UserLocation
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
        icon: 'mdi-tag-multiple',
        default: true
      },
      user: auth.getUser(),
      menuItems: []
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
    this.$options.service.getTags()
      .then((data) => {
        // add the default menu item
        data.tags.unshift(this.defaultItem)
        this.menuItems = data.tags
        auth.updateUserTags(data.tags)
        this.preloader = false
      })
      .catch((Tagserror) => {
        // alert('Soemthing went wrong while getting your tags')
      })
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
