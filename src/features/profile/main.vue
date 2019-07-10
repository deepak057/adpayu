<template lang="pug">
.container-fluid
  <page-title heading="Profile"/>
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
    // Column
    .col-lg-8.col-xlg-9.col-md-7.p-l-0.p-r-0
      <profile-tabs :profileUser = "user" :isOwnProfile="isOwnProfile" :currentUser="currentUser"></profile-tabs>
    // Column
    .col-lg-4.col-xlg-3.col-md-5.p-r-0.p-l-10
      .card
        .card-body
          center.m-t-30
            // img.img-circle(src='/static/assets/images/users/5.jpg', width='150')
            <profile-picture :profileUser="user" :imageAdmin="isOwnProfile"></profile-picture>
            <profile-user-name :profileUser="user"></profile-user-name>
            .row.text-center.justify-content-md-center
              .col-12
                <friends v-if="!isOwnProfile && !pagePreloader" :currentUser="currentUser" :profileUser="user" :friendship="friendship"></friends>
        <template v-if="isOwnProfile">
        div
          hr
        .card-body
          small.text-muted Email address
          h6 {{user.email}}
          <template v-if="currentUser.phone">
          small.text-muted.p-t-30.db Phone
          h6 {{currentUser.phone}}
          </template>
          //small.text-muted.p-t-30.db Address
          //h6 71 Pilgrim Avenue Chevy Chase, MD 20815
          //.map-box
            iframe(src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.1604841957!2d72.29955005258641!3d23.019996818380896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1493204785508', style='border:0', allowfullscreen='', width='100%', height='150', frameborder='0')
          //small.text-muted.p-t-30.db Social Profile
          //br
          //button.btn.btn-circle.btn-secondary
            i.fa.fa-facebook
          //button.btn.btn-circle.btn-secondary
            i.fa.fa-twitter
          //button.btn.btn-circle.btn-secondary
            i.fa.fa-youtube
        </template>
</template>
<script>
import auth from '@/auth/helpers'
import PageTitle from './../../components/page-title'
import Preloader from './../../components/preloader'
import Service from './service'
import mixin from '../../globals/mixin.js'
import ProfilePicture from './profile-pic'
import Friends from '../../components/users/friends'
import ProfileTabs from './profile-tabs/main'
import ProfileUserName from './profile-user-name'

export default {
  name: 'Profile',
  metaInfo () {
    return {
      title: 'Profile'
    }
  },
  service: new Service(),
  components: {
    PageTitle,
    Preloader,
    ProfilePicture,
    Friends,
    ProfileTabs,
    ProfileUserName
  },
  mixins: [mixin],
  data () {
    return {
      pagePreloader: false,
      uid: 0,
      user: {},
      friendship: {},
      isOwnProfile: false,
      currentUser: auth.getUser()
    }
  },
  watch: {
    '$route.params.uid' (newUid) {
      this.uid = newUid
      this.loadProfile()
    }
  },
  mounted () {
    this.scrollToTop()
    this.loadProfile()
  },
  methods: {
    fetchProfile () {
      this.pagePreloader = true
      this.$options.service.getUserProfile(this.uid)
        .then((data) => {
          this.pagePreloader = false
          this.user = data.user
          this.friendship = data.friendship
          this.setDocumentTitle(this.userName(this.user, false))
        })
        .catch((profileErr) => {
          alert('Something went wrong while fetching the user profile')
        })
    },
    uidCheck () {
      this.uid = this.$route.params.uid || this.currentUser.id
      this.isOwnProfile = parseInt(this.uid) === this.currentUser.id
    },
    loadProfile () {
      this.uidCheck()
      if (this.isOwnProfile) {
        this.pagePreloader = false
        this.user = this.currentUser
        this.setDocumentTitle('My Profile')
      } else {
        this.fetchProfile()
      }
    }
  }
}
</script>
