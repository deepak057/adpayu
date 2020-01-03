<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Share
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          p
            a(href="#")
              |  Rick's response on show us how flexible you are?
            i.mdi.mdi-content-copy.pointer.m-l-10(title="Copy the link")
            i.mdi.mdi-pencil.m-l-10.pointer(title="Edit sharing title")
          hr
          h5.text-muted.m-b-0.all-caps
            | Share this post on:
          social-sharing.social-share-wrap(url='https://svanq.com/c/1602', title='The Progressive JavaScript Framework', description='Intuitive, Fast and Composable MVVM for building interactive interfaces.', quote='Vue is a progressive framework for building user interfaces.', hashtags='vuejs,javascript,framework', twitter-user='vuejs', inline-template='')
            .row
              network.round.pointer.m-l-10.m-t-10.facebook-border(title="Share on Facebook" network='facebook')
                i.fa.fa-facebook.facebook-color
              network.round.pointer.m-l-10.m-t-10.google-plus-border(title="Share on Google +" network='googleplus')
                i.fa.fa-google-plus.google-plus-color
              network.round.pointer.m-l-10.m-t-10.linkedin-border(title="Share on LinkedIn" network='linkedin')
               i.fa.fa-linkedin.linkedin-color
              network.round.pointer.m-l-10.m-t-10.pinterest-border(title="Share on Pinterest" network='pinterest')
                i.fa.fa-pinterest.pinterest-color
              network.round.pointer.m-l-10.m-t-10.reddit-border(title="Share on Reddit" pinterestnetwork='reddit')
                i.fa.fa-reddit.reddit-color
              network.round.pointer.m-l-10.m-t-10.skype-border(title="Share on Skype" network='skype')
                i.fa.fa-skype.skype-color
              network.round.pointer.m-l-10.m-t-10(title="SMS" network='sms')
                i.fa.fa-commenting-o
              network.round.pointer.m-l-10.m-t-10.twitter-border(title="Share on Twitter" network='twitter')
                i.fa.fa-twitter.twitter-color
              network.round.pointer.m-l-10.m-t-10.watsapp-border(network='whatsapp')
                i.fa.fa-whatsapp.watsapp-color
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
</template>
<script>
import mixin from '../globals/mixin'
import Preloader from './preloader'
// import auth from '@/auth/helpers'

export default {
  name: 'SocialShare',
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-social-share',
      triggered: false
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
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    triggerPopup () {
      /*eslint-disable*/
      this.triggered = true
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval (()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
          }
        }, 100)
      } else {
        d.click()
      }
      /* eslint-enable */
    }
  }
}
</script>
