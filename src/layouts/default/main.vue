<template lang="pug">
#main-wrapper
  .preloader(style="width: 100%;height: 100%;top: 0px;position: fixed;z-index: 99999;background: #fff;")
    svg.circular(viewBox='25 25 50 50')
      circle.path(cx='50', cy='50', r='20', fill='none', stroke-width='2', stroke-miterlimit='10')
  link(href='/static/assets/plugins/bootstrap/css/bootstrap.min.css', rel='stylesheet')
  // Popup CSS
  link(href='/static/assets/plugins/Magnific-Popup-master/dist/magnific-popup.css', rel='stylesheet')
  // Custom CSS
  link(href='/static/material/css/style.css', rel='stylesheet')
  // You can change the theme colors from here
  link#theme(href='/static/material/css/colors/blue.css', rel='stylesheet')
  // Custom CSS  outside of theme
  link(href='/static/material/css/custom.css', rel='stylesheet')
  <app-bar/>
  <app-sidebar :cat="cat"/>
  .page-wrapper
    router-view
    <app-footer/>
  .scroll-up
    a(href='#totop')
      i.fa.fa-angle-double-up
</template>

<script>
import AppBar from '@/components/app-bar'
import AppSidebar from '@/components/sidebar/main'
import AppFooter from '@/components/app-footer'
import mixin from '@/globals/mixin'
import Service from './service'
import auth from '@/auth/helpers'

export default {
  name: 'DefaultLayout',
  service: new Service(),
  components: { AppBar, AppSidebar, AppFooter },
  mixins: [mixin],
  data () {
    return {
      cat: 'all',
      scripts: [
        /* 'static/assets/plugins/jquery/jquery.min.js',
        'static/assets/plugins/bootstrap/js/popper.min.js',
        'static/assets/plugins/bootstrap/js/bootstrap.min.js',
        'static/material/js/waves.js',
        'static/material/js/sidebarmenu.js',
        'static/material/js/jquery.slimscroll.js',
        'static/assets/plugins/sticky-kit-master/dist/sticky-kit.min.js',
        'static/assets/plugins/sparkline/jquery.sparkline.min.js',
        'static/assets/plugins/Magnific-Popup-master/dist/jquery.magnific-popup.min.js', */
        '/static/material/js/all-plugins-compressed.js',
        '/static/material/js/custom.js'
      ]
    }
  },
  created () {
    auth.syncUser()
  },
  mounted () {
    this.loadScripts()
    // updateUser()
  },
  methods: {
    loadScripts () {
      for (let i in this.scripts) {
        this.loadScript(this.scripts[i])
      }
    }
    /* updateUser () {
      this.$options.service.getUser(auth.getUser().id)
        .then((data) => {
          auth.updateUserState(data.user)
        })
        .catch((uErr) => {
        })
    } */
  }
}
</script>

<style>
</style>
