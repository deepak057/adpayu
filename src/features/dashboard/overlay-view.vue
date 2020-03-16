<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" data-backdrop="static" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.video-overlay-view(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog(v-touch:swipe = "onSwipe")
      .modal-content
        .modal-header.no-border(v-if="!isMobile()")
          .row.w-100
            .col-2
              img.img-icon.pointer(src= "static/assets/images/logo-light-icon.png" @click="closePopup()")
            .col-8.text-center
              a.m-l-5(href="javascript:void(0)" @click="prev()")
                i.mdi.mdi-arrow-left.m-r-5
                // img.img-icon.m-r-5(:src= "staticImageUrl('swipeDown.svg')" v-if="isMobile()")
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
                // img.img-icon.m-l-5(:src= "staticImageUrl('swipeUp.svg')" v-if="isMobile()")
          // button.close(type='button', )
          i.mdi.mdi-close.close.pointer.c-white(title="Close" data-dismiss='modal', aria-hidden='true' :id="closeButtonId")
        .modal-body.p-b-0()
          .row.w-100(v-if="isMobile()")
            .col-2
              i.mdi.mdi-24px.mdi-arrow-left.pointer(title="Back" :id="closeButtonId" data-dismiss='modal')
            // .col-10.text-right
              img.img-icon(src= "static/assets/images/logo-light-icon.png")
          <feed :useDefaultComment = useDefaultComment :autoReplay= "autoReplay" :userFeed = true :feed="[feed[currentPost]]"/>
          i.mdi.mdi-18px.mdi-information-outline.pointer.fixed-br(v-if="isMobile()" data-container="body" :title="getInfoTitle()" data-toggle="popover" data-placement="bottom" :data-content='getInfoContent()')
        //.modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          //<preloader class="m-l-5 preloader-next-to-text"/>
</template>
<script>
import mixin from '../../globals/mixin.js'
import Preloader from './../../components/preloader'
import Feed from './../../components/feed/feed'
import { router } from '@/http'

export default {
  name: 'OverlayView',
  components: {
    Preloader,
    Feed
  },
  mixins: [mixin],
  props: {
    popupFeed: {
      type: Array,
      required: true
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
      feed: []
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
      this.feed = this.manipulateFeed(this.copyObject(newV))
      if (this.triggered && newV.length && !this.currentPost) {
        this.autoPlayVideo()
      }
    }
  },
  methods: {
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    manipulateFeed (feed) {
      let arr = []
      for (let i in feed) {
        if ((feed[i].type === 'question' && 'defaultComment' in feed[i]) || feed[i].type === 'video' || feed[i].AdOptionId) {
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
      router.push(this.userProfileLink(uid))
    },
    next () {
      let threshholdPostNumber = 3
      if (this.currentPost === (this.feed.length - threshholdPostNumber)) {
        this.$emit('GetMoreFeed')
      }
      if (this.currentPost < (this.feed.length - 1)) {
        this.currentPost++
        this.autoPlayVideo()
      } else {
        this.showNotification('Sorry, no more feed.', 'info')
      }
    },
    autoPlayVideo () {
      let currentPost = this.getCurrentPost()
      let defaultComment = this.getLastComment(currentPost)
      let videoContanierClass = currentPost.type === 'video' ? this.getPostVideoPlayerClass(currentPost) : (defaultComment ? this.getCommentVideoPlayerClass(defaultComment) : false)
      if (videoContanierClass) {
        let modal = document.getElementById(this.modalId)
        if (modal) {
          let interval = setInterval(() => {
            let container = modal.getElementsByClassName(videoContanierClass)[0]
            let player = container.getElementsByClassName('vjs-big-play-button')[0]
            if (player) {
              clearInterval(interval)
              setTimeout(() => {
                player.click()
              }, 50)
            }
          }, 50)
        }
      }
    },
    prev () {
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
      this.triggered = true
      this.setCustomDefaultPost(obj)
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval(()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
            this.autoPlayVideo()
          }
        }, 100)
      } else {
        d.click()
        this.autoPlayVideo()
      }
    }
  }
}
</script>
