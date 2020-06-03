<template lang="pug">
div(v-if="triggered")
  .reaction-wrap(:class="{'block': shown, 'none': !shown}")
    .reaction-modal-header
      .text-center
        h5
          | Reactions
        .reaction-close(@click="close()")
          i.fa.fa-chevron-down.pointer
    .reaction-modal-body
      .hv-align(v-if="loading")
        <preloader class="loader-medium" />
      .chat-box(v-if="!loading")
        // chat Row
        ul.chat-list
          li(v-for="reaction in reactions")
            .chat-img
              <router-link :to="userProfileLink(reaction.User.id)">
                img(:src='getUserProfileImage(reaction.User.pic, "blue")', alt='user')
              </router-link>
            .chat-content
              h5
                <router-link class="pointer" tag="span" :to="userProfileLink(reaction.User.id)">
                  | {{userName(reaction.User)}}
                </router-link>
              .box
                | {{reaction.text}}
                .small.text-muted.m-t-10
                  <timeago :datetime="reaction.createdAt" :auto-update="60" :title="reaction.createdAt | date"></timeago>
            // .chat-time
              <timeago :datetime="reaction.createdAt" :auto-update="60" :title="reaction.createdAt | date"></timeago>
    .reaction-modal-footer
      .row.m-0
        .col-10.p-0
          textarea.form-control.b-0(v-model.trim = "reaction" placeholder='Type your message here')
        .col-2.text-right.p-0
          button.btn.btn-default.btn-circle.post-reaction-btn(@click="saveReaction()"  type='button')
            i.fa.fa-paper-plane-o
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import Service from './service'

export default {
  name: 'Reaction',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      id: this.getUniqueId() + '-reaction-wrap',
      triggered: false,
      shown: false,
      loading: true,
      page: 1,
      reactions: [],
      reaction: ''
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    close () {
      this.shown = false
    },
    trigger () {
      this.triggered = true
      this.shown = true
      this.loadReactions()
    },
    saveReaction () {
      if (this.reaction) {
        this.$options.service.saveReaction(this.comment.id, this.reaction)
          .then((d) => {
            this.reaction = ''
            this.reactions.unshift(d.reaction)
          })
          .catch((rErr) => {
            this.showNotification('Something went wrong, please try later', 'error')
          })
      }
    },
    loadReactions () {
      this.$options.service.loadReactions(this.comment.id, this.page)
        .then((d) => {
          this.loading = false
          if (d.reactions.length) {
            this.reactions = this.reactions.concat(d.reactions)
          }
        })
        .catch((rErr) => {
          this.showNotification('Something went wrong, please try again', 'error')
        })
    }
  }
}
</script>
