<template lang="pug">
.card-body.min-h-400
  .accordion.accordion-blue.f-s-16(:id="accordion.parentId")
    .card
      .card-header(:id = "getAccSectionIds(1)" :aria-controls="getAccSectionIds(1, 'content')" data-toggle="collapse" :data-target = "'#' + getAccSectionIds(1, 'content')")
        h2.mb-0
          button.btn
            i.mdi.mdi-account-edit
            span.tab-label.m-l-10
              | Basic Details
      .collapse(:id = "getAccSectionIds(1, 'content')" :data-parent="'#'+accordion.parentId")
        .card-body
          .row
            .col-12
              form.form-horizontal.form-material(@submit.prevent='updateProfile()')
                span
                  | More information you provide, more relevant ads you'll see
                .form-group.m-t-20(:class="{'has-danger': nameError}")
                  label.col-md-12(for='up-user-name-field')
                    | Full Name
                    i.mdi.mdi-earth.text-muted.m-l-5(title="Full name is publicly visible")
                  .col-md-12
                    input#up-user-name-field.form-control.form-control-line(placeholder='Enter Name' type='text' v-model.trim="name" autocomplete="off")
                    small.form-control-feedback(v-show="nameError")
                      | {{nameError}}
                .form-group(:class="{'has-danger': taglineError}")
                  label.col-md-12
                    | Tagline
                    i.mdi.mdi-earth.text-muted.m-l-5(title="Tagline is publicly visible")
                  .col-md-12
                    input.form-control.form-control-line(type="text" v-model.trim="user.tagline" placeholder="Enter your tagline")
                    small.form-control-feedback(v-show="taglineError")
                      | {{taglineError}}
                .form-group(:class="{'has-danger': phoneNumberError}")
                  label.col-md-12
                    | Phone Number
                    i.mdi.mdi-lock.text-muted.m-l-5(title="No one can see your phone number")
                  .col-md-12
                    input.form-control.form-control-line(type="text" @keypress="isNumber(event)" v-model.trim="user.phone" placeholder="Enter Phone number")
                    small.form-control-feedback(v-show="phoneNumberError")
                      | {{phoneNumberError}}
                .form-group
                  label.col-sm-12
                    | Gender
                    i.mdi.mdi-lock.text-muted.m-l-5(title="No one can see your gender")
                  .col-sm-12
                    select.form-control.form-control-line(v-model="user.gender")
                      option(value="" selected disabled hidden) Choose here
                      option(value="male") Male
                      option(value="female") Female
                      option(value="other") Other
                .form-group
                  label.col-sm-12
                    | Select Country
                    i.mdi.mdi-lock.text-muted.m-l-5(title="No one can see your country")
                  .col-sm-12
                    select.form-control.form-control-line(v-model="user.location")
                      option(value="" selected disabled hidden) Choose here
                      option(v-for="country in countryList" :value='country.code') {{country.text}}
                h4 Security
                .form-group.m-t-20
                  label.col-md-12(for='up-user-email')
                    | Email
                    i.mdi.mdi-lock.text-muted.m-l-5(title="No one can see your email")
                  .col-md-12
                    input#up-user-email.form-control.form-control-line(placeholder='Enter email', type='email' v-model = "user.email" readonly autocomplete="off")
                .form-group(:class="{'has-danger': passwordError}")
                  label.col-md-12
                    | New Password
                    i.mdi.mdi-lock.text-muted.m-l-5(title="Only you know your password")
                  .col-md-12
                    input.form-control.form-control-line(type='password' placeholder="Enter new password" v-model="newPassword")
                    small.form-control-feedback(v-show="passwordError")
                      | {{passwordError}}
                .form-group
                  .col-sm-12
                    button.btn.btn-success Update Profile
    .card
      .card-header(:id = "getAccSectionIds(2)" :aria-controls="getAccSectionIds(2, 'content')" data-toggle="collapse" :data-target = "'#' + getAccSectionIds(2, 'content')")
        h2.mb-0
          button.btn
            i.mdi.mdi-newspaper
            span.tab-label.m-l-10
              | Feed Settings
      .collapse(:id = "getAccSectionIds(2, 'content')" :data-parent="'#' + accordion.parentId")
        .card-body
          .m-b-10
            | Customize your feed
          .row
            .col-12.col-md-3
              label.m-r-5(for='show-feed-option')
                i.mdi.mdi-newspaper
                span(title = "Enable or disable feed")
                  |  Feed
                i.mdi.mdi-information-outline.m-l-5.cursor-hand.m-r-5(data-container="body" title="Feed" data-toggle="popover" data-content="Enable or disable regular posts in your feed.")
              <toggle-button title = "Enable or disable feed" v-model="currentUser.feedEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5"></toggle-button>
            .col-md-3.col-12
                label(for='show-ads-option')
                  i.mdi.mdi-currency-usd
                  span(title = "Enable or disable Ads")
                    | Ads
                  i.mdi.mdi-information-outline.m-l-5.cursor-hand.m-r-5(data-container="body" title="Ads" data-toggle="popover" data-content="Enable or disable ads in your feed")
                <toggle-button title = "Enable or disable Ads" v-model="currentUser.adsEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
            .col-md-6.col-12
                label.m-r-5
                  i.mdi.mdi-comment-question-outline
                  span(title = "Enable or disable unanswered questions")
                    |  Questions
                  i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Questions" data-toggle="popover" data-content="Enable or disable unanswered questions in your feed.")
                <toggle-button title = "Enable or disable unanswered questions" v-model="currentUser.unCommentedEnabled" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
    .card
      .card-header(:id = "getAccSectionIds(3)" :aria-controls="getAccSectionIds(3, 'content')" data-toggle="collapse" :data-target = "'#' + getAccSectionIds(3, 'content')")
        h2.mb-0
          button.btn
            i.mdi.mdi-map-marker
            span.tab-label.m-l-10
              | Location
      .collapse(:id = "getAccSectionIds(3, 'content')" :data-parent="'#' + accordion.parentId")
        .card-body
          .row
            .col-12
              span
                | Specify your location to see more relevant promoted posts/ads from your local area. If you don't specify your location, you will be able to see only the national and international ads, not the ads from your local area.
              .m-t-10
                button.btn.btn-danger(@click="triggerLocation()")
                  | Get My Location Now
        <update-location ref="updateLocationComp"/>
    .card
      .card-header(:id = "getAccSectionIds(4)" :aria-controls="getAccSectionIds(4, 'content')" data-toggle="collapse" :data-target = "'#' + getAccSectionIds(4, 'content')")
        h2.mb-0
          button.btn
            i.mdi.mdi-account-multiple
            span.tab-label.m-l-10
              | Referral
      .collapse(:id = "getAccSectionIds(4, 'content')" :data-parent="'#' + accordion.parentId")
        .card-body
          .row
            .col-12
              span
                | Get referral link to track people registered through you
              .form-group
                <template v-if="!refCode">
                a.btn.btn-secondary.m-t-10(@click="getReferralLink()")
                  i.mdi.mdi-link.m-r-5
                  | Get Referral Link
                <preloader v-if="gettingReferralLink" class="preloader-next-to-text m-l-5 m-t-5"/>
                </template>
                <template v-if="refCode">
                  .m-t-10
                    a(:href="refCode" target="_blank")
                      | {{refCode}}
                    input(:type="URLCopied ? 'hidden' : 'text' " :class="{'hidden-from-view': !URLCopied}" type="text" :id="copyTextElementId" :value="refCode")
                    i.mdi.mdi-content-copy.pointer.m-l-10(title="Copy Link" @click="copyURLToClipboard()")
                </template>
</template>
<script>
import mixin from '../../../globals/mixin.js'
import countryList from '../../../globals/countries.js'
import userRegistrationMixin from '../../../globals/user-register'
import auth from '@/auth/helpers'
import Preloader from './../../../components/preloader'
import Service from './service'
import UpdateLocation from '@/components/location/update_location'

export default {
  name: 'Settings',
  service: new Service(),
  components: {
    Preloader,
    UpdateLocation
  },
  mixins: [mixin, userRegistrationMixin, countryList],
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      accordion: {
        parentId: 'sp-main-acc-wrap'
      },
      user: Object.assign({}, this.currentUser),
      name: this.userName(this.currentUser, false),
      id: this.getUniqueId() + '-ref-link',
      nameError: false,
      taglineError: false,
      maxTaglineChars: 100,
      newPassword: '',
      passwordError: false,
      phoneNumberError: false,
      gettingReferralLink: false,
      refCode: false,
      URLCopied: false
    }
  },
  computed: {
    copyTextElementId: {
      get () {
        return this.id + '-referral-link-copy-text-field'
      }
    }
  },
  watch: {
    '$store.state.auth.user' (user) {
      this.user = user
    },
    'currentUser.feedEnabled' (newV) {
      this.saveUser(this.currentUser)
    },
    'currentUser.adsEnabled' (newV) {
      this.saveUser(this.currentUser)
    },
    'currentUser.unCommentedEnabled' (newV) {
      this.saveUser(this.currentUser)
    }
  },
  methods: {
    triggerLocation () {
      this.$refs.updateLocationComp.triggerPopup()
    },
    getAccSectionIds (id, type_ = 'header') {
      return this.accordion.parentId + 'sec-' + id + '-' + type_
    },
    copyURLToClipboard () {
      this.URLCopied = true
      let copyElem = document.getElementById(this.copyTextElementId)
      copyElem.select()
      // copyElem.setSelectionRange(0, 99999)
      try {
        document.execCommand('copy')
        this.showNotification('Link copied.', 'success')
        this.URLCopied = false
      } catch (err) {
        this.showNotification('Failed to copy URL', 'error')
      }
    },
    getReferralLink () {
      let getReferralLink = () => {
        let localRef = this.currentUser.refCode
        let getRefURL = (code) => {
          return this.getDomainName() + '?refCode=' + code
        }
        if (localRef) {
          this.gettingReferralLink = false
          this.refCode = getRefURL(localRef)
        } else {
          this.$options.service.getReferralCode()
            .then((d) => {
              this.gettingReferralLink = false
              this.refCode = getRefURL(d.code)
            })
            .catch((rErr) => {
              this.gettingReferralLink = false
              this.showNotification('Something went wrong, please try again', 'error')
            })
        }
      }
      if (!this.gettingReferralLink) {
        this.gettingReferralLink = true
        getReferralLink()
      }
    },
    updateProfile () {
      if (this.nameValidate() && this.validateTagLine() && this.PhoneValidate() && this.passwordVaildate()) {
        // this.showNotification('Saving profile, please wait....', 'warn', -1)
        this.saveUser(this.getUserObject())
      }
    },
    saveUser (userObj) {
      auth.updateCurrentUser(userObj)
        .then((data) => {
          this.showNotification('Changes Saved', 'success')
          this.reset()
        })
        .catch((errUser) => {
          this.showNotification('Something went wrong, please try again', 'error')
        })
    },
    // get updated properties of
    // User object after successfull validation
    getUserObject () {
      let t = this.getUserFirstAndLastName(this.name)
      this.user.first = t.first
      this.user.last = t.last
      this.user.newPassword = this.newPassword
      return this.user
    },
    nameValidate () {
      if (!this.validateName(this.name)) {
        this.nameError = 'Please enter your full name'
        return false
      } else {
        this.nameError = false
        return true
      }
    },
    validateTagLine () {
      if (!this.user.tagline || (this.user.tagline && this.user.tagline.length < this.maxTaglineChars)) {
        this.taglineError = false
        return true
      } else {
        this.taglineError = 'Max ' + this.maxTaglineChars + ' chars allowed. You have entered ' + this.user.tagline.length
        return false
      }
    },
    PhoneValidate () {
      if (!this.user.phone || this.validatePhoneNumber(this.user.phone)) {
        this.phoneNumberError = false
        return true
      } else {
        this.phoneNumberError = 'Please enter a valid 10 digit phone number'
        return false
      }
    },
    passwordVaildate () {
      if (!this.newPassword || (this.newPassword && this.validatePassword(this.newPassword))) {
        this.passwordError = false
        return true
      } else {
        this.passwordError = 'Please enter a valid password'
        return false
      }
    },
    reset () {
      this.newPassword = ''
    }
  }
}
</script>
