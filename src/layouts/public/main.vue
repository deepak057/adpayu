<template lang="pug">
main
    .page-loader
        .loader Loading...
    link(href='/static/titan-master/assets/lib/bootstrap/dist/css/bootstrap.min.css', rel='stylesheet')
    // Template specific stylesheets
    link(href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700', rel='stylesheet')
    link(href='https://fonts.googleapis.com/css?family=Volkhov:400i', rel='stylesheet')
    link(href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800', rel='stylesheet')
    // link(href='static/titan-master/assets/lib/animate.css/animate.css', rel='stylesheet')
    link(href='/static/titan-master/assets/lib/components-font-awesome/css/font-awesome.min.css', rel='stylesheet')
    link(href='/static/titan-master/assets/lib/et-line-font/et-line-font.css', rel='stylesheet')
    link(href='static/titan-master/assets/lib/flexslider/flexslider.css', rel='stylesheet')
    // link(href='static/titan-master/assets/lib/owl.carousel/dist/assets/owl.carousel.min.css', rel='stylesheet')
    // link(href='static/titan-master/assets/lib/owl.carousel/dist/assets/owl.theme.default.min.css', rel='stylesheet')
    // link(href='static/titan-master/assets/lib/magnific-popup/dist/magnific-popup.css', rel='stylesheet')
    // link(href='static/titan-master/assets/lib/simple-text-rotator/simpletextrotator.css', rel='stylesheet')
    // Main stylesheet and color file
    link(href='/static/titan-master/assets/css/style.min.css', rel='stylesheet')
    link(href='/static/titan-master/assets/css/custom.css', rel='stylesheet')
    // link#color-scheme(href='static/titan-master/assets/css/colors/default.css', rel='stylesheet')
    nav.navbar.navbar-custom.navbar-fixed-top.one-page(:class="{'navbar-transparent make-transparent': ifHomePage()}" role='navigation')
        .container
            .navbar-header
                button.navbar-toggle(type='button', data-toggle='collapse', data-target='#custom-collapse')
                    span.sr-only Toggle navigation
                    span.icon-bar
                    span.icon-bar
                    span.icon-bar
                <router-link to="/" class="navbar-brand">
                  | {{siteName}}
                </router-link>
            #custom-collapse.collapse.navbar-collapse
                ul.nav.navbar-nav.navbar-right
                    li
                        a.section-scroll(href='#home' :class="{'active': ifHomePage()}") Home
                    // li
                        a.section-scroll(href='#services') Services
                    // li
                        a.section-scroll(href='#works') Works
                    li
                        a.section-scroll(href='#services') About
                    // li
                        a.section-scroll(href='#team') Team
                    // li
                        a.section-scroll(href='#pricing') Prices
                    // li
                        a.section-scroll(href='#news') News
                    li
                        <router-link :to="getPageURL('advertise')">
                            | Advertise
                        </router-link>
                    li
                        <router-link :to="getPageURL('faqs')">
                            | FAQs
                        </router-link>
                    li
                        <router-link :to="getPageURL('contact')">
                            | Contact
                        </router-link>
                    li(v-if="!isLoggedIn()")
                        <router-link :to="redirectURLs('login')">
                            | Login
                        </router-link>
                    li(v-if="!isLoggedIn()")
                        <router-link :to="redirectURLs('signup')">
                            | Register
                        </router-link>
                    li(v-if="isLoggedIn()")
                        <router-link to="/dashboard">
                            | Dashboard
                        </router-link>
    router-view
    footer.footer.bg-dark
        .container
            .row
                .col-sm-3
                    p.copyright.font-alt
                        | © {{getCurrentYear()}}
                        <router-link to="/">
                          |  {{siteName}}
                        </router-link>
                        | , All Rights Reserved
                .col-sm-6.text-center.font-alt
                    a(href="https://svanq.blogspot.com/" target="_blank")
                      | Blog
                    |  |
                    <router-link :to="getPageURL('terms')">
                      |  Terms
                    </router-link>
                    |  |
                    <router-link :to="getPageURL('privacy')">
                      |  Privacy
                    </router-link>
                    |  |
                    span.c-faded  Made with passion and
                    i.icon-heart.m-l-5
                    // <router-link :to="getPageURL('privacy')">
                      |  FAQs
                    </router-link>
                //.col-sm-3
                    .footer-social-links
                        a(href='#')
                            i.fa.fa-facebook
                        a(href='#')
                            i.fa.fa-twitter
                        a(href='#')
                            i.fa.fa-dribbble
                        a(href='#')
                            i.fa.fa-skype
    .scroll-up
        a(href='#totop')
            i.fa.fa-angle-double-up
</template>
<script>
import mixin from '@/globals/mixin'
import auth from '@/auth/helpers'

export default {
  name: 'PublicLayout',
  mixins: [mixin],
  data () {
    return {
      scripts: [
        '/static/titan-master/assets/lib/jquery/dist/jquery.min.js',
        '/static/titan-master/assets/lib/bootstrap/dist/js/bootstrap.min.js',
        /* 'static/titan-master/assets/lib/smoothscroll.js',
        'static/titan-master/assets/lib/wow/dist/wow.js',
        'static/titan-master/assets/lib/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.js',
        'static/titan-master/assets/lib/isotope/dist/isotope.pkgd.js',
        'static/titan-master/assets/lib/imagesloaded/imagesloaded.pkgd.js',
        'static/titan-master/assets/lib/owl.carousel/dist/owl.carousel.min.js',
        'static/titan-master/assets/lib/magnific-popup/dist/jquery.magnific-popup.js',
        'static/titan-master/assets/lib/simple-text-rotator/jquery.simple-text-rotator.min.js', */
        'static/titan-master/assets/js/plugins.js',
        'static/titan-master/assets/lib/flexslider/jquery.flexslider.js',
        '/static/titan-master/assets/js/main.js'
      ]
    }
  },
  mounted () {
    for (let i in this.scripts) {
      this.loadScript(this.scripts[i])
    }
    /*
    * Set a guest User Id for the visiting user
    * in local storage of user's browser
    */
    auth.getGuestId()
  },
  methods: {
    ifHomePage () {
      return this.$route.name === 'home'
    }
  }
}
</script>

<style>
.page-loader {
  position: fixed;
  background: #000;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9998;
}
.loader {
  position: absolute;
  border-left: 2px solid #ffffff;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  height: 46px;
  width: 46px;
  left: 50%;
  top: 50%;
  margin: -23px 0 0 -23px;
  text-indent: -9999em;
  font-size: 10px;
  z-index: 9999;
  -webkit-animation: load 0.8s infinite linear;
  -moz-animation: load 0.8s infinite linear;
  ms-animation: load 0.8s infinite linear;
  o-animation: load 0.8s infinite linear;
  animation: load 0.8s infinite linear;
}

.loader,.loader:after {
  border-radius: 50%;
  width: 46px;
  height: 46px;
}

</style>
