<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" data-backdrop="static" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.video-overlay-view(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog(v-touch:swipe = "onSwipe")
      .modal-content
        .modal-header
          h4.modal-title
            a.m-l-5(href="javascript:void(0)" @click="prev()")
              | Prev
            a.m-l-5(href="javascript:void(0)" @click="next()")
              | Next
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body.p-b-0()
          <feed :userFeed = true :feed="[feed[currentPost]]"/>
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
    feed: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      triggered: false,
      id: this.getUniqueId() + '-overlay-view-modal',
      loader: true,
      currentPost: 0
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
    feed (newV) {
      if (newV.length) {
        // this.currentPost = [newV[0]]
        // alert(Array.isArray(this.currentPost))
      }
    }
  },
  methods: {
    closePopup () {
      document.getElementById(this.closeButtonId).click()
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
      let currentPost = this.getCurrentPost()
      let defaultComment = this.getLastComment(currentPost)
      let videoContanierClass = currentPost.type === 'video' ? this.getPostVideoPlayerClass(currentPost) : (defaultComment ? this.getCommentVideoPlayerClass(defaultComment) : false)
      if (videoContanierClass) {
        let modal = document.getElementById(this.modalId)
        let container = modal.getElementsByClassName(videoContanierClass)
        alert(container.length)
        let player = container.getElementsByTagName('video')[0]
        if (player) {
          player.play()
        }
      }
    },
    prev () {
      if (this.currentPost > 0) {
        this.currentPost--
      } else {
        this.showNotification('Sorry, there is no previous post, please go to next one.', 'info')
      }
    },
    triggerPopup () {
      /*eslint-disable*/
      this.triggered = true
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval(()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
          }
        }, 100)
      } else {
        d.click()
      }
    }
  }
}
</script>
