<template lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0 Profile
      ol.breadcrumb
        li.breadcrumb-item
          <router-link to="/">
            | Home
          </router-link>
        li.breadcrumb-item.active Profile
    .col-md-8.col-12.align-self-center.text-right
      h3.m-b-0.font-light $3249
      h5.text-muted.m-b-0 Total Revenue
  // ==============================================================
  // End Bread crumb and right sidebar toggle
  // ==============================================================
  // ==============================================================
  // Start Page Content
  // ==============================================================
  // Row
  .row(v-show="pagePreloader")
    // Column
    .col-12.text-center.p-l-0.p-r-0
      .card
        .card-body.page-preloader
          <preloader></preloader>
  .row(v-show="!pagePreloader")
    // Column
    .col-lg-4.col-xlg-3.col-md-5.p-l-0.p-r-0
      .card
        .card-body
          center.m-t-30
            // img.img-circle(src='/static/assets/images/users/5.jpg', width='150')
            <profile-picture :user="user" :imageAdmin="isOwnProfile"></profile-picture>
            h4.card-title.m-t-10 {{userName(user)}}
            h6.card-subtitle A loyal AdpayU user
            .row.text-center.justify-content-md-center
            <friends v-if="!isOwnProfile" :friendId="parseInt(uid)"></friends>
        div
          hr
        .card-body
          <template v-if="isOwnProfile">
          small.text-muted Email address
          h6 {{user.email}}
          </template>
          small.text-muted.p-t-30.db Phone
          h6 +91 654 784 547
          small.text-muted.p-t-30.db Address
          h6 71 Pilgrim Avenue Chevy Chase, MD 20815
          .map-box
            iframe(src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.1604841957!2d72.29955005258641!3d23.019996818380896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1493204785508', style='border:0', allowfullscreen='', width='100%', height='150', frameborder='0')
          small.text-muted.p-t-30.db Social Profile
          br
          button.btn.btn-circle.btn-secondary
            i.fa.fa-facebook
          button.btn.btn-circle.btn-secondary
            i.fa.fa-twitter
          button.btn.btn-circle.btn-secondary
            i.fa.fa-youtube
    // Column
    // Column
    .col-lg-8.col-xlg-9.col-md-7.p-r-0.p-l-10
      .card
        // Nav tabs
        ul.nav.nav-tabs.profile-tab(role='tablist')
          li.nav-item
            a.nav-link.active(data-toggle='tab', href='#home', role='tab') Timeline
          li.nav-item
            a.nav-link(data-toggle='tab', href='#profile', role='tab') Profile
          li.nav-item
            a.nav-link(data-toggle='tab', href='#settings', role='tab') Settings
        // Tab panes
        .tab-content
          #home.tab-pane.active(role='tabpanel')
            .card-body
              .profiletimeline
                .sl-item
                  .sl-left
                    img.img-circle(src='/static/assets/images/users/1.jpg', alt='user')
                  .sl-right
                    div
                      a.link(href='#') John Doe
                      span.sl-date 5 minutes ago
                      p
                        | assign a new task
                        a(href='#')  Design weblayout
                      .row
                        .col-lg-3.col-md-6.m-b-20
                          img.img-responsive.radius(src='/static/assets/images/big/img1.jpg')
                        .col-lg-3.col-md-6.m-b-20
                          img.img-responsive.radius(src='/static/assets/images/big/img2.jpg')
                        .col-lg-3.col-md-6.m-b-20
                          img.img-responsive.radius(src='/static/assets/images/big/img3.jpg')
                        .col-lg-3.col-md-6.m-b-20
                          img.img-responsive.radius(src='/static/assets/images/big/img4.jpg')
                      .like-comm
                        a.link.m-r-10(href='javascript:void(0)') 2 comment
                        a.link.m-r-10(href='javascript:void(0)')
                          i.fa.fa-heart.text-danger
                          |  5 Love
                hr
                .sl-item
                  .sl-left
                    img.img-circle(src='/static/assets/images/users/2.jpg', alt='user')
                  .sl-right
                    div
                      a.link(href='#') John Doe
                      span.sl-date 5 minutes ago
                      .m-t-20.row
                        .col-md-3.col-xs-12
                          img.img-responsive.radius(src='/static/assets/images/big/img1.jpg', alt='user')
                        .col-md-9.col-xs-12
                          p
                            | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                          a.btn.btn-success(href='#')  Design weblayout
                      .like-comm.m-t-20
                        a.link.m-r-10(href='javascript:void(0)') 2 comment
                        a.link.m-r-10(href='javascript:void(0)')
                          i.fa.fa-heart.text-danger
                          |  5 Love
                hr
                .sl-item
                  .sl-left
                    img.img-circle(src='/static/assets/images/users/3.jpg', alt='user')
                  .sl-right
                    div
                      a.link(href='#') John Doe
                      span.sl-date 5 minutes ago
                      p.m-t-10
                        | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
                    .like-comm.m-t-20
                      a.link.m-r-10(href='javascript:void(0)') 2 comment
                      a.link.m-r-10(href='javascript:void(0)')
                        i.fa.fa-heart.text-danger
                        |  5 Love
                hr
                .sl-item
                  .sl-left
                    img.img-circle(src='/static/assets/images/users/4.jpg', alt='user')
                  .sl-right
                    div
                      a.link(href='#') John Doe
                      span.sl-date 5 minutes ago
                      blockquote.m-t-10
                        | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          // second tab
          #profile.tab-pane(role='tabpanel')
            .card-body
              .row
                .col-md-3.col-xs-6.b-r
                  strong Full Name
                  br
                  p.text-muted Johnathan Deo
                .col-md-3.col-xs-6.b-r
                  strong Mobile
                  br
                  p.text-muted (123) 456 7890
                .col-md-3.col-xs-6.b-r
                  strong Email
                  br
                  p.text-muted johnathan@admin.com
                .col-md-3.col-xs-6
                  strong Location
                  br
                  p.text-muted London
              hr
              p.m-t-30
                | Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              p
                | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
              p
                | It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              h4.font-medium.m-t-30 Skill Set
              hr
              h5.m-t-30
                | Wordpress
                span.pull-right 80%
              .progress
                .progress-bar.bg-success(role='progressbar', aria-valuenow='80', aria-valuemin='0', aria-valuemax='100', style='width:80%; height:6px;')
                  span.sr-only 50% Complete
              h5.m-t-30
                | HTML 5
                span.pull-right 90%
              .progress
                .progress-bar.bg-info(role='progressbar', aria-valuenow='90', aria-valuemin='0', aria-valuemax='100', style='width:90%; height:6px;')
                  span.sr-only 50% Complete
              h5.m-t-30
                | jQuery
                span.pull-right 50%
              .progress
                .progress-bar.bg-danger(role='progressbar', aria-valuenow='50', aria-valuemin='0', aria-valuemax='100', style='width:50%; height:6px;')
                  span.sr-only 50% Complete
              h5.m-t-30
                | Photoshop
                span.pull-right 70%
              .progress
                .progress-bar.bg-warning(role='progressbar', aria-valuenow='70', aria-valuemin='0', aria-valuemax='100', style='width:70%; height:6px;')
                  span.sr-only 50% Complete
          #settings.tab-pane(role='tabpanel')
            .card-body
              form.form-horizontal.form-material
                .form-group
                  label.col-md-12 Full Name
                  .col-md-12
                    input.form-control.form-control-line(placeholder='Johnathan Doe', type='text')
                .form-group
                  label.col-md-12(for='example-email') Email
                  .col-md-12
                    input#example-email.form-control.form-control-line(placeholder='johnathan@admin.com', name='example-email', type='email')
                .form-group
                  label.col-md-12 Password
                  .col-md-12
                    input.form-control.form-control-line(value='password', type='password')
                .form-group
                  label.col-md-12 Phone No
                  .col-md-12
                    input.form-control.form-control-line(placeholder='123 456 7890', type='text')
                .form-group
                  label.col-md-12 Message
                  .col-md-12
                    textarea.form-control.form-control-line(rows='5')
                .form-group
                  label.col-sm-12 Select Country
                  .col-sm-12
                    select.form-control.form-control-line
                      option London
                      option India
                      option Usa
                      option Canada
                      option Thailand
                .form-group
                  .col-sm-12
                    button.btn.btn-success Update Profile
</template>
<script>
import store from '@/store'
import Preloader from './../../components/preloader'
import Service from './service'
import mixin from '../../globals/mixin.js'
import ProfilePicture from './profile-pic'
import Friends from './friends'

export default {
  name: 'Profile',
  service: new Service(),
  components: {
    Preloader,
    ProfilePicture,
    Friends
  },
  mixins: [mixin],
  data () {
    return {
      pagePreloader: false,
      uid: 0,
      user: {},
      isOwnProfile: false
    }
  },
  watch: {
    '$route.params.uid' (newUid) {
      this.uid = newUid
      this.loadProfile()
    }
  },
  mounted () {
    this.loadProfile()
  },
  methods: {
    fetchProfile () {
      this.pagePreloader = true
      this.$options.service.getUserProfile(this.uid)
        .then((data) => {
          this.pagePreloader = false
          this.user = data.user
        })
        .catch((profileErr) => {
          alert('Something went wrong while fetching the user profile')
        })
    },
    uidCheck () {
      this.uid = this.$route.params.uid || store.state.auth.user.id
      this.isOwnProfile = parseInt(this.uid) === store.state.auth.user.id
    },
    loadProfile () {
      this.uidCheck()
      if (this.isOwnProfile) {
        this.pagePreloader = false
        this.user = store.state.auth.user
      } else {
        this.fetchProfile()
      }
    }
  }
}
</script>
