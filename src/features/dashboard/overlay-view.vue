<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" data-backdrop="static" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.video-overlay-view(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog(v-touch:swipe = "onSwipe")
      .modal-content
        .modal-header
          .row.w-100
            .col-2
              img.app-logo.pointer(:src='staticImageUrl("logo.png")' @click="closePopup()")
            .col-8.text-center(v-if="!isMobile()")
              a.m-l-5(href="javascript:void(0)" @click="prev()")
                i.mdi.m-r-5(:class="{'mdi-arrow-left': !isMobile(), 'mdi-gesture-swipe-down': isMobile()}")
                | Prev
              a.m-l-5(href="javascript:void(0)" @click="next()")
                | Next
                i.mdi.m-l-5(:class="{'mdi-arrow-right': !isMobile(), 'mdi-gesture-swipe-up': isMobile()}")
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body.p-b-0()
          <feed :useDefaultComment = useDefaultComment :autoReplay= "autoReplay" :userFeed = true :feed="[feed[currentPost]]"/>
        .modal-footer
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
      this.feed = this.copyObject(newV)
      if (newV.length && !this.currentPost) {
        this.autuPlayVideo()
      }
    }
  },
  methods: {
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    manipulateFeed (feed) {
      for (let i in feed) {
        if (feed[i].type === 'question' && 'defaultComment' in feed[i]) {
          // eed[i].showComments = true
        }
      }
      return feed
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
      } else {
        this.showNotification('Sorry, no more feed.', 'info')
      }
      this.autuPlayVideo()
    },
    autuPlayVideo () {
      setTimeout(() => {
        let currentPost = this.getCurrentPost()
        let defaultComment = this.getLastComment(currentPost)
        let videoContanierClass = currentPost.type === 'video' ? this.getPostVideoPlayerClass(currentPost) : (defaultComment ? this.getCommentVideoPlayerClass(defaultComment) : false)
        if (videoContanierClass) {
          let modal = document.getElementById(this.modalId)
          let container = modal.getElementsByClassName(videoContanierClass)[0]
          let player = container.getElementsByClassName('vjs-big-play-button')[0]
          if (player) {
            player.click()
          }
        }
      }, 100)
    },
    prev () {
      if (this.currentPost > 0) {
        this.currentPost--
      } else {
        this.showNotification('Sorry, there is no previous post, please go to next one.', 'info')
      }
      this.autuPlayVideo()
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
        this.autuPlayVideo()
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
            this.autuPlayVideo()
            clearInterval(interval)
          }
        }, 100)
      } else {
        d.click()
        this.autuPlayVideo()
      }
    }
  }
}
</script>
