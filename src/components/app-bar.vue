<template lang="pug">
header.topbar
    nav.navbar.top-navbar.navbar-expand-md.navbar-light
      // ==============================================================
      // Logo
      // ==============================================================
      .navbar-header
        <router-link to="/" class="navbar-brand">
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
          li.nav-item.hidden-sm-down.search-box
            a.nav-link.hidden-sm-down.text-muted.waves-effect.waves-dark(href='javascript:void(0)')
              i.ti-search
            form.app-search
              input.form-control(placeholder='Search & enter', type='text')
              a.srh-btn
                i.ti-close
          // ==============================================================
          // Messages
          // ==============================================================
          li.nav-item.dropdown.mega-dropdown
            a.nav-link.dropdown-toggle.text-muted.waves-effect.waves-dark(href='', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
              i.mdi.mdi-view-grid
            .dropdown-menu.scale-up-left
              ul.mega-dropdown-menu.row
                li.col-lg-3.col-xlg-2.m-b-30
                  h4.m-b-20 CAROUSEL
                  // CAROUSEL
                  #carouselExampleControls.carousel.slide(data-ride='carousel')
                    .carousel-inner(role='listbox')
                      .carousel-item.active
                        .container
                          img.d-block.img-fluid(src='static/assets/images/big/img1.jpg', alt='First slide')
                      .carousel-item
                        .container
                          img.d-block.img-fluid(src='static/assets/images/big/img2.jpg', alt='Second slide')
                      .carousel-item
                        .container
                          img.d-block.img-fluid(src='static/assets/images/big/img3.jpg', alt='Third slide')
                    a.carousel-control-prev(href='#carouselExampleControls', role='button', data-slide='prev')
                      span.carousel-control-prev-icon(aria-hidden='true')
                      span.sr-only Previous
                    a.carousel-control-next(href='#carouselExampleControls', role='button', data-slide='next')
                      span.carousel-control-next-icon(aria-hidden='true')
                      span.sr-only Next
                  // End CAROUSEL
                li.col-lg-3.m-b-30
                  h4.m-b-20 ACCORDION
                  // Accordian
                  #accordion.nav-accordion(role='tablist', aria-multiselectable='true')
                    .card
                      #headingOne.card-header(role='tab')
                        h5.mb-0
                          a(data-toggle='collapse', data-parent='#accordion', href='#collapseOne', aria-expanded='true', aria-controls='collapseOne')
                            | Collapsible Group Item #1
                      #collapseOne.collapse.show(role='tabpanel', aria-labelledby='headingOne')
                        .card-body  Anim pariatur cliche reprehenderit, enim eiusmod high.
                    .card
                      #headingTwo.card-header(role='tab')
                        h5.mb-0
                          a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#collapseTwo', aria-expanded='false', aria-controls='collapseTwo')
                            | Collapsible Group Item #2
                      #collapseTwo.collapse(role='tabpanel', aria-labelledby='headingTwo')
                        .card-body
                          | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                    .card
                      #headingThree.card-header(role='tab')
                        h5.mb-0
                          a.collapsed(data-toggle='collapse', data-parent='#accordion', href='#collapseThree', aria-expanded='false', aria-controls='collapseThree')
                            | Collapsible Group Item #3
                      #collapseThree.collapse(role='tabpanel', aria-labelledby='headingThree')
                        .card-body
                          | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                li.col-lg-3.m-b-30
                  h4.m-b-20 CONTACT US
                  // Contact
                  form
                    .form-group
                      input#exampleInputname1.form-control(placeholder='Enter Name', type='text')
                    .form-group
                      input.form-control(placeholder='Enter email', type='email')
                    .form-group
                      textarea#exampleTextarea.form-control(rows='3', placeholder='Message')
                    button.btn.btn-info(type='submit') Submit
                li.col-lg-3.col-xlg-4.m-b-30
                  h4.m-b-20 List style
                  // List style
                  ul.list-style-none
                    li
                      a(href='javascript:void(0)')
                        i.fa.fa-check.text-success
                        |  You can give link
                    li
                      a(href='javascript:void(0)')
                        i.fa.fa-check.text-success
                        |  Give link
                    li
                      a(href='javascript:void(0)')
                        i.fa.fa-check.text-success
                        |  Another Give link
                    li
                      a(href='javascript:void(0)')
                        i.fa.fa-check.text-success
                        |  Forth link
                    li
                      a(href='javascript:void(0)')
                        i.fa.fa-check.text-success
                        |  Another fifth link
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
          <notifications></notifications>
          // ==============================================================
          // Messages
          // ==============================================================
          li.nav-item.dropdown
            a#2.nav-link.dropdown-toggle.text-muted.waves-effect.waves-dark(href='', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
              i.mdi.mdi-email
              .notify
                span.heartbit
                span.point
            .dropdown-menu.mailbox.dropdown-menu-right.scale-up(aria-labelledby='2')
              ul
                li
                  .drop-title You have 4 new messages
                li
                  .message-center
                    // Message
                    a(href='#')
                      .user-img
                        img.img-circle(src='static/assets/images/users/1.jpg', alt='user')
                        span.profile-status.online.pull-right
                      .mail-contnet
                        h5 Pavan kumar
                        span.mail-desc Just see the my admin!
                        span.time 9:30 AM
                    // Message
                    a(href='#')
                      .user-img
                        img.img-circle(src='static/assets/images/users/2.jpg', alt='user')
                        span.profile-status.busy.pull-right
                      .mail-contnet
                        h5 Sonu Nigam
                        span.mail-desc I've sung a song! See you at
                        span.time 9:10 AM
                    // Message
                    a(href='#')
                      .user-img
                        img.img-circle(src='static/assets/images/users/3.jpg', alt='user')
                        span.profile-status.away.pull-right
                      .mail-contnet
                        h5 Arijit Sinh
                        span.mail-desc I am a singer!
                        span.time 9:08 AM
                    // Message
                    a(href='#')
                      .user-img
                        img.img-circle(src='static/assets/images/users/4.jpg', alt='user')
                        span.profile-status.offline.pull-right
                      .mail-contnet
                        h5 Pavan kumar
                        span.mail-desc Just see the my admin!
                        span.time 9:02 AM
                li
                  a.nav-link.text-center(href='javascript:void(0);')
                    strong See all e-Mails
                    i.fa.fa-angle-right
          // ==============================================================
          // End Messages
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
                      p.text-muted {{user.email}}
                      <router-link :to="userProfileLink()" class="btn btn-rounded btn-danger btn-sm">
                        | View Profile
                      </router-link>
                li.divider(role='separator')
                li
                  <router-link :to="userProfileLink()">
                    i.ti-user
                    |  My Profile
                  </router-link>
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
                  a(href='javascript:void(0)' @click="logout")
                    i.fa.fa-power-off
                    |  Logout
          // ==============================================================
          // Language
          // ==============================================================
          li.nav-item.dropdown
            a.nav-link.dropdown-toggle.text-muted.waves-effect.waves-dark(href='', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
              i.flag-icon.flag-icon-us
            .dropdown-menu.dropdown-menu-right.scale-up
              a.dropdown-item(href='#')
                i.flag-icon.flag-icon-in
                |  India
              a.dropdown-item(href='#')
                i.flag-icon.flag-icon-fr
                |  French
              a.dropdown-item(href='#')
                i.flag-icon.flag-icon-cn
                |  China
              a.dropdown-item(href='#')
                i.flag-icon.flag-icon-de
                |  Dutch
</template>

<script>
import auth from '@/auth/helpers'
import mixin from '../globals/mixin.js'
import Notifications from './notifications'

export default {
  name: 'AppBar',
  components: {
    Notifications
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
