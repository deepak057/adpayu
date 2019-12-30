<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Share
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          social-sharing.social-share-wrap(url='https://svanq.com/c/1602', title='The Progressive JavaScript Framework', description='Intuitive, Fast and Composable MVVM for building interactive interfaces.', quote='Vue is a progressive framework for building user interfaces.', hashtags='vuejs,javascript,framework', twitter-user='vuejs', inline-template='')
            .row
              network.round.pointer.col-1(network='facebook')
                i.fa.fa-facebook
                |  Facebook
              network.round.pointer.col-1(network='googleplus')
                i.fa.fa-google-plus
                |  Google +
              network.round.pointer.col-1(network='line')
                i.fa.fa-line
                |  Line
              network.round.pointer.col-1(network='linkedin')
               i.fa.fa-linkedin
               |  LinkedIn
              network.round.pointer.col-1(network='odnoklassniki')
               i.fa.fa-odnoklassniki
               |  Odnoklassniki
              network.round.pointer.col-1(network='pinterest')
                i.fa.fa-pinterest
                |  Pinterest
              network.round.pointer.col-1(network='reddit')
                i.fa.fa-reddit
                |  Reddit
              network.round.pointer.col-1(network='skype')
                i.fa.fa-skype
                |  Skype
              network.round.pointer.col-1(network='sms')
                i.fa.fa-commenting-o
                |  SMS
              network.round.pointer.col-1(network='telegram')
                i.fa.fa-telegram
                |  Telegram
              network.round.pointer.col-1(network='twitter')
                i.fa.fa-twitter
                |  Twitter
              network.round.pointer.col-1(network='vk')
                i.fa.fa-vk
                |  VKontakte
              network.round.pointer.col-1(network='weibo')
                i.fa.fa-weibo
                |  Weibo
              network.round.pointer.col-1(network='whatsapp')
                i.fa.fa-whatsapp
                |  Whatsapp
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
