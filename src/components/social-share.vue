<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Share
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          social-sharing(url='https://svanq.com/c/1602', title='The Progressive JavaScript Framework', description='Intuitive, Fast and Composable MVVM for building interactive interfaces.', quote='Vue is a progressive framework for building user interfaces.', hashtags='vuejs,javascript,framework', twitter-user='vuejs', inline-template='')
            div
              network(network='email')
                i.fa.fa-envelope
                |  Email
              network(network='facebook')
                i.fa.fa-facebook
                |  Facebook
              network(network='googleplus')
                i.fa.fa-google-plus
                |  Google +
              network(network='line')
                i.fa.fa-line
                |  Line
              network(network='linkedin')
               i.fa.fa-linkedin
               |  LinkedIn
              network(network='odnoklassniki')
               i.fa.fa-odnoklassniki
               |  Odnoklassniki
              network(network='pinterest')
                i.fa.fa-pinterest
                |  Pinterest
              network(network='reddit')
                i.fa.fa-reddit
                |  Reddit
              network(network='skype')
                i.fa.fa-skype
                |  Skype
              network(network='sms')
                i.fa.fa-commenting-o
                |  SMS
              network(network='telegram')
                i.fa.fa-telegram
                |  Telegram
              network(network='twitter')
                i.fa.fa-twitter
                |  Twitter
              network(network='vk')
                i.fa.fa-vk
                |  VKontakte
              network(network='weibo')
                i.fa.fa-weibo
                |  Weibo
              network(network='whatsapp')
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
      id: this.getUniqueId() + '-social-share'
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
      document.getElementById(this.triggerButtonId).click()
    }
  }
}
</script>
