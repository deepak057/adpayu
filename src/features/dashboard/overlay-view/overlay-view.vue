<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" data-backdrop="static" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.video-overlay-view(:id="modalId" role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog(v-touch:swipe = "onSwipe")
      .modal-content
        <animation-template :animationTemplate = "animationTemplate" ref="AnimationTemplateComp"/>
        .modal-header.no-border(v-if="!isMobile()")
          .row.w-100
            .col-2
              img.img-icon.pointer(:src= "getAsset('images/logo-light-icon.png')" @click="closePopup()")
            .col-8.text-center
              a.m-l-5(href="javascript:void(0)" @click="prev()")
                i.mdi.mdi-arrow-left.m-r-5
                span(v-if="!isMobile()")
                  | Prev
                span.small(v-if="isMobile()")
                  | Swipe Down
              a.m-l-5(href="javascript:void(0)" @click="next()")
                span(v-if="!isMobile()")
                  | Next
                span.small.m-l-5(v-if="isMobile()")
                  | Swipe Up
                i.mdi.mdi-arrow-right.m-l-5
          i.mdi.mdi-refresh.mdi-24px.pointer.c-white(:class="{'spin': spinRefreshIcon}" @click="refreshFeed()" title="Refresh the feed")
        span(data-dismiss='modal', aria-hidden='true' :id="closeButtonId")
        .modal-body.p-b-0
          <template v-if="isMobile()">
          // i.mdi.mdi-24px.mdi-arrow-left.pointer.mobile-back-icon(@click="closePopup()" title="Back")
          // i.mdi.mdi-refresh.pointer.overlay-refresh-icon(@click="refreshFeed()" title = "Refresh the feed")
          </template>
          .btn-group.overlay-screen-info-icon
            button.btn.btn-xs.btn-secondary.dropdown-toggle.no-border-shadow.bg-none.f-s-16.text-muted.hide-after(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='true' title="More Options" :id="triggerOVOptionsBtn")
             i.ti.ti-more-alt
            .dropdown-menu.prevent-close-on-click
              span.dropdown-item.no-active-effect
                i.fa.fa-film.m-r-5
                | Background effect
                .m-t-5
                  select.form-control.custom-select(v-model="animationTemplate")
                    option(v-for="animation in animations" :value="animation.id")
                      | {{animation.name}}
              a.dropdown-item(v-if="isMobile()" href="javascript:void(0)" title="Edit the video"  data-container="body" :title="getInfoTitle()" data-toggle="popover" data-placement="bottom" :data-content='getInfoContent()')
                i.fa.fa-info-circle.m-r-5
                | Controls
          //.text-center.video-controls-nav-wrap.up(:class="{'animation white-arrow': animation.up, 'white-arrow': nextCommandInvoked}" v-if="isMobile() && currentPost < (feed.length -1 )")
            img.pointer(:src="staticImageUrl('arrow-up-grey.png')" @click="next()")
            .nav-text
              | Swipe up for next video
          <template v-if="!isLastPost() || noMoreFeed">
          .overlay-view-content-wrap
            <feed :useDefaultComment = useDefaultComment :autoReplay= "autoReplay" :userFeed = true :feed="[feed[currentPost]]"/>
            .show-more-answer-link( v-if="enableShowMoreAnswerLink()")
              <router-link class=" text-muted" :to="getPostLink(getCurrentPost().id)" @click.native="closeAllModals()">
                | See more answers
              </router-link>
          </template>
          .video-controls-nav-wrap
              button.btn(@click="prev()")
                | Prev
              button.btn(@click="next()")
                | Next
          //.text-center.video-controls-nav-wrap.down(:class="{'animation white-arrow': animation.down, 'white-arrow': prevCommandInvoked}" v-if="isMobile() && currentPost > 0")
            .nav-text
             | Swipe down for previous video
            img.pointer(:src="staticImageUrl('arrow-down-grey.png')" @click="prev()")
          //i.mdi.mdi-24px.mdi-refresh.pointer.overlay-refresh-icon.text-info(v-if="isMobile()" @click="refreshFeed()" title = "Refresh the feed" :class="{'spin': spinRefreshIcon}")
          <template v-if="isLastPost() && !noMoreFeed">
          .align-in-middle.text-center
            <preloader :option="3" class="w-100px"/>
          </template>
        //.modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          //<preloader class="m-l-5 preloader-next-to-text"/>
</template>
<script>
import mixin from '../../../globals/mixin.js'
import Preloader from './../../../components/preloader'
import Feed from './../../../components/feed/feed'
import AnimationTemplate from './animation-template'
import { router } from '@/http'
import store from '@/store'
import auth from '@/auth/helpers'

export default {
  name: 'OverlayView',
  components: {
    Preloader,
    Feed,
    AnimationTemplate
  },
  mixins: [mixin],
  props: {
    popupFeed: {
      type: Array,
      required: true
    },
    noMoreFeed: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      triggered: false,
      id: this.getUniqueId() + '-overlay-view-modal',
      loader: true,
      currentPost: 0,
      autoReplay: true,
      useDefaultComment: true,
      feed: [],
      animation: {
        up: false,
        down: false
      },
      nextCommandInvoked: false,
      prevCommandInvoked: false,
      spinRefreshIcon: false,
      TextNoMoreFeed: 'Sorry, no more posts.',
      animationTemplate: auth.getUser().animationTemplate,
      animations: [
        {
          id: 0,
          name: 'None'
        },
        {
          id: 1,
          name: 'Cloudy Night'
        },
        {
          id: 2,
          name: 'Cosmos'
        },
        {
          id: 3,
          name: 'Glowing Bubbles'
        },
        {
          id: 4,
          name: 'Fireflies'
        },
        {
          id: 5,
          name: 'Lines'
        },
        {
          id: 6,
          name: 'Moving Balls'
        },
        {
          id: 7,
          name: 'Shooting Stars'
        },
        {
          id: 8,
          name: 'Starry Night'
        }
      ],
      triggerOVOptionsBtn: 'trigger-OV-Options-Btn'
    }
  },
  computed: {
    modalIdHash: {
      get () {
        return '#' + this.modalId
      }
    },
    triggerButtonId: {
      get () {
        return this.id + '-overlay-view-modal'
      }
    },
    modalId: {
      get () {
        return this.id + '-overlay-view-modal-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '--overlay-view-modal-buton-close'
      }
    }
  },
  watch: {
    popupFeed (newV) {
      /*
      * if the feed Array changes, before
      * updating component's internall feed array
      * keep the copy of currentPost and after
      * updating the internal array, set the current post
      * counter to the current post's index in the array
      */
      let currentPostObj = false
      // keeping track if this current post is last post
      let isLastPost = this.isLastPost()
      if (this.feed.length && this.currentPost) {
        currentPostObj = this.getCurrentPost()
      }
      this.feed = this.manipulateFeed(this.copyObject(newV))
      if (currentPostObj && newV.length) {
        this.currentPost = this.getPostIndexById(currentPostObj.id)
      }
      // if it was last post before, the feed load
      // after the feed load, trigger Auto Play video
      if (isLastPost) {
        this.autoPlayVideo()
      }
      /* if (this.triggered && newV.length && !this.currentPost) {
        this.autoPlayVideo()
        this.handleTutorial()
      } */
    },
    noMoreFeed (newV) {
      if (newV) {
        this.showNotification(this.TextNoMoreFeed, 'info')
        this.currentPost = this.feed.length - 1
      }
    },
    animationTemplate (newV) {
      this.updateUser()
    }
  },
  methods: {
    toggleMoreOptions () {
      let el = document.getElementById(this.triggerOVOptionsBtn)
      if (el) {
        el.click()
      }
    },
    updateUser () {
      this.toggleMoreOptions()
      let currentUser = auth.getUser()
      currentUser.animationTemplate = this.animationTemplate
      auth.updateCurrentUser(currentUser)
        .then((data) => {
          this.showNotification('Changes saved', 'success')
        })
    },
    refreshFeed () {
      this.spinRefreshIcon = true
      this.closePopup()
      this.scrollToTop()
      this.$emit('ReloadFeed')
    },
    closePopup (closeAll = true) {
      this.pauseAllOtherVideos()
      this.closeReactions()
      document.getElementById(this.closeButtonId).click()
      if (closeAll) {
        this.closeAllModals()
      }
    },
    highlightArrow (action = 'next') {
      let highlightDuration = 500
      if (action === 'next') {
        this.nextCommandInvoked = true
        setTimeout(() => {
          this.nextCommandInvoked = false
        }, highlightDuration)
      } else {
        this.prevCommandInvoked = true
        setTimeout(() => {
          this.prevCommandInvoked = false
        }, highlightDuration)
      }
    },
    enableShowMoreAnswerLink () {
      let f = this.getCurrentPost()
      return f && f.type === 'question'
    },
    manipulateFeed (feed) {
      let arr = []
      for (let i in feed) {
        if ((feed[i].type === 'question' && 'defaultComment' in feed[i] && feed[i].defaultComment) || feed[i].type === 'video' || feed[i].AdOptionId) {
          arr.push(feed[i])
        }
      }
      return arr
    },
    getInfoTitle () {
      return 'Controls'
    },
    getInfoContent () {
      return 'Swipe Up = Next Video, Swipe Down = Previous Video, Swipe Right = User Profile, Swipe Left = Close'
    },
    onSwipe (direction) {
      switch (direction) {
        case 'top':
          this.next()
          break
        case 'bottom':
          this.prev()
          break
        case 'left':
          this.closePopup()
          this.closeAllModals()
          break
        default:
          this.redirectToProfile()
          break
      }
    },
    getCurrentPost () {
      return this.feed[this.currentPost]
    },
    redirectToProfile () {
      let currentPost = this.getCurrentPost()
      let defaultComment = this.getLastComment(currentPost)
      let uid = defaultComment ? defaultComment.User.id : currentPost.User.id
      this.closePopup()
      this.closeAllModals()
      router.push(this.userProfileLink(uid))
    },
    next () {
      this.closeReactions()
      this.animation.up = false
      this.highlightArrow('next')
      let threshholdPostNumber = 3
      if (this.currentPost >= (this.feed.length - threshholdPostNumber)) {
        this.$emit('GetMoreFeed')
      }
      if (!this.isLastPost()) {
        this.currentPost++
        this.autoPlayVideo()
      } else {
        let text = this.noMoreFeed ? this.TextNoMoreFeed : 'Loading more posts...'
        this.showNotification(text, 'info')
      }
    },
    isLastPost () {
      return this.currentPost >= (this.feed.length - 1)
    },
    handleTutorial () {
      let key = 'overlayViewTutorial'
      let maxTutorialAttempts = 1
      let overlayViewTutorial = sessionStorage.getItem(key)
      if ((overlayViewTutorial === null || overlayViewTutorial <= maxTutorialAttempts) && !store.state.auth.overlayViewTutorialDisabled) {
        this.animation.up = true
        this.animation.down = true
        let newV = overlayViewTutorial ? ++overlayViewTutorial : 1
        sessionStorage.setItem(key, newV)
      } else {
        store.state.auth.overlayViewTutorialDisabled = true
        store.dispatch('auth/update', store.state.auth)
      }
    },
    autoPlayVideo () {
      setTimeout(() => {
        let currentPost = this.getCurrentPost()
        let defaultComment = this.getLastComment(currentPost)
        if (!currentPost) {
          return
        }
        let videoContanierClass = currentPost.type === 'video' ? this.getPostVideoPlayerClass(currentPost) : (defaultComment ? this.getCommentVideoPlayerClass(defaultComment) : false)
        if (videoContanierClass) {
          let modal = document.getElementById(this.modalId)
          if (modal) {
            let attemptsCount = 0
            let interval = setInterval(() => {
              if (attemptsCount >= 15) {
                clearInterval(interval)
              }
              let container = modal.getElementsByClassName(videoContanierClass)[0]
              if (container) {
                let player = container.getElementsByClassName('vjs-big-play-button')[0]
                if (player) {
                  if (this.isVisible(player)) {
                    setTimeout(() => {
                      player.click()
                    }, 50)
                  }
                  clearInterval(interval)
                }
              }
              attemptsCount++
            }, 50)
          }
        }
      }, 100)
    },
    prev () {
      this.closeReactions()
      this.animation.down = false
      this.highlightArrow('prev')
      if (this.currentPost > 0) {
        this.currentPost--
        this.autoPlayVideo()
      } else {
        this.showNotification('Sorry, there is no previous post, please go to next one.', 'info')
      }
    },
    getPostIndexById (postId) {
      for (let i in this.feed) {
        if (this.feed[i].id === postId) {
          return i
        }
      }
    },
    setCustomDefaultPost (obj) {
      if (obj) {
        if ('postId' in obj) {
          this.currentPost = this.getPostIndexById(obj.postId)
        }
        if ('comment' in obj) {
          // this.$set(this.feed[this.currentPost], 'defaultComment', obj.comment)
          this.feed[this.currentPost].defaultComment = obj.comment
        }
        // this.autoPlayVideo()
      }
    },
    triggerPopup (obj = false) {
      /*eslint-disable*/
      this.closeReactions()
      this.triggered = true
      this.spinRefreshIcon = false
      this.setCustomDefaultPost(obj)
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval(()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
            this.autoPlayVideo()
            this.handleTutorial()
          }
        }, 100)
      } else {
        d.click()
        this.autoPlayVideo()
        this.handleTutorial()
      }
    }
  }
}
</script>
