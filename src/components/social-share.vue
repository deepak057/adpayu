<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog(:class="customClass")
      .modal-content
        .modal-header
          h4.modal-title
            | Share
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          <template v-if="!loader">
          p
            // <router-link :to="shareObject.url">
              |  {{shareObject.title}}
            </router-link>
            a(:href="shareObject.url" target="_blank")
              .w-s-pre(v-if="originalObject.type === 'text'" v-html = "shareObject.title")
              span(v-if="originalObject.type !== 'text'")
                |  {{shareObject.title}}
            i.fa.fa-copy.pointer.m-l-10(title="Copy the link" @click="copyURLToClipboard()")
            input(:type="URLCopied ? 'hidden' : 'text' " :class="{'hidden-from-view': !URLCopied}" type="text" :id="copyTextElementId" :value="shareObject.url")
            // i.mdi.mdi-pencil.m-l-10.pointer(title="Edit sharing title")
          hr
          h5.text-muted.m-b-0.all-caps
            | Share this on:
          social-sharing.social-share-wrap(v-if="shareObject.title && shareObject.url" :url='shareObject.url' :title='shareObject.title', :description='shareObject.title' :quote='shareObject.title' twitter-user='svanq', inline-template='' @open="trackSharing")
            .row
              // network.round.pointer.m-l-10.m-t-10.facebook-border(title="Share on Facebook" network='facebook')
                i.fa.fa-facebook.facebook-color
              network.round.pointer.m-l-10.m-t-10.linkedin-border(title="Share on LinkedIn" network='linkedin')
               i.fa.fa-linkedin.linkedin-color
              network.round.pointer.m-l-10.m-t-10.pinterest-border(title="Share on Pinterest" network='pinterest')
                i.fa.fa-pinterest.pinterest-color
              network.round.pointer.m-l-10.m-t-10.reddit-border(title="Share on Reddit" pinterestnetwork='reddit')
                i.fa.fa-reddit.reddit-color
              network.round.pointer.m-l-10.m-t-10.skype-border(title="Share on Skype" network='skype')
                i.fa.fa-skype.skype-color
              network.round.pointer.m-l-10.m-t-10.sms-border(title="SMS" network='sms')
                i.fa.fa-commenting-o.sms-color
              network.round.pointer.m-l-10.m-t-10.twitter-border(title="Share on Twitter" network='twitter')
                i.fa.fa-twitter.twitter-color
              network.round.pointer.m-l-10.m-t-10.watsapp-border(network='whatsapp')
                i.fa.fa-whatsapp.watsapp-color
          </template>
          .text-center.m-t-20(v-if="loader")
            <preloader />
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
</template>
<script>
import mixin from '../globals/mixin'
import Preloader from './preloader'
import auth from '@/auth/helpers'
import Service from './service'

export default {
  name: 'SocialShare',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  props: {
    customClass: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-social-share',
      triggered: false,
      shareObject: {
        url: false,
        title: false
      },
      loader: true,
      URLCopied: false,
      originalObject: false
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
        return this.id + '-social-sharing'
      }
    },
    copyTextElementId: {
      get () {
        return this.id + '-social-share-copy-text-field'
      }
    },
    modalId: {
      get () {
        return this.id + '-social-sharing-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-social-sharing-modal-buton-close'
      }
    }
  },
  mounted () {
  },
  methods: {
    trackSharing (network, url) {
      let data = {
        network: network,
        shareObj: this.shareObject,
        commentId: this.isComment(this.originalObject) ? this.originalObject.id : '',
        postId: !this.isComment(this.originalObject) ? this.originalObject.id : ''
      }
      this.$options.service.trackSocialSharing(data)
        .then((d) => {
        })
        .catch((pErr) => {
          this.showNotification('Something went wrong, please try sharing again.', 'error')
        })
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
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
    prepareShareObject (post, comment = false) {
      let getURL = (url) => {
        // return 'https://' + this.getDomainName() + '/' + url
        return url
      }
      if (post && comment) {
        this.shareObject.title = comment.User.first + '\'s response on ' + this.getPostTitle(post)
        this.shareObject.url = getURL(this.getCommentLink(comment.id, true))
      } else {
        this.shareObject.title = this.getPostTitle(post)
        this.shareObject.url = getURL(this.getPostLink(post.id, true))
      }
    },
    fetchDetails (shareObject) {
      this.loader = true
      this.originalObject = shareObject
      if (this.loader) {
        if (this.isComment(shareObject)) {
          auth.getComment(shareObject.id)
            .then((d) => {
              this.loader = false
              this.prepareShareObject(d.post, d.comment)
            })
            .catch((pErr) => {
              alert(pErr)
              this.showNotification('Something went wrong, please try again later', 'error')
            })
        } else {
          this.loader = false
          this.prepareShareObject(shareObject)
        }
      }
    },
    isComment (shareObject) {
      return 'videoPath' in shareObject
    },
    triggerPopup (shareObject) {
      /*eslint-disable*/
      this.triggered = true
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval (()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
            this.fetchDetails(shareObject)
          }
        }, 100)
      } else {
        d.click()
        this.fetchDetails(shareObject)
      }
      /* eslint-enable */
    }
  }
}
</script>
<style>
.social-share-wrap .round{font-size:20px;display:flex;justify-content:center;align-items:center;width:40px;height:40px;background:#fff}
</style>
