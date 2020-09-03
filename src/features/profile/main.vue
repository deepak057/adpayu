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
  .row.change-direction-row(v-show="!pagePreloader")
    // Column
    // Column
    .col-lg-8.col-xlg-9.col-md-7.p-l-0.p-r-0
      <profile-tabs :profileUser = "user" :isOwnProfile="isOwnProfile" :currentUser="currentUser"></profile-tabs>
    // Column
    .col-lg-4.col-xlg-3.col-md-5.p-r-0.p-l-10.no-p-mobile
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
          this.showNotification('Something went wrong while fetching the user profile', 'error')
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
