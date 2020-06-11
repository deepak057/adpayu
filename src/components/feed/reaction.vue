<template lang="pug">
div(v-if="triggered" :id="id")
  .reaction-wrap(:class="{'block': shown, 'none': !shown}")
    .reaction-modal-header
      .text-center
        h5
          | Reactions
        .reaction-close(@click="close()")
          i.fa.fa-chevron-down.pointer
    .reaction-modal-body(:id="bodyId")
      .hv-align(v-if="loading")
        <preloader class="loader-medium" />
      .chat-box(v-if="!loading")
        // chat Row
        .text-center.m-t-10(v-if="!reactions.length")
          | No Reactions
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
      .m-t-10.m-b-10.text-center(v-if="loadMoreReactions || noMoreReactions")
        <preloader class="loader-medium" v-if="loadMoreReactions"/>
        span(v-if="reactions.length && noMoreReactions")
            i.mdi.mdi-emoticon-sad.m-r-5
            | No More Reactions
    .reaction-modal-footer
      .row.m-0
        .col-10.p-0
          textarea.form-control.b-0(@keyup.enter="saveReaction()" v-model.trim = "reaction" placeholder='Type your message here')
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
      reaction: '',
      loadMoreReactions: false,
      noMoreReactions: false
    }
  },
  computed: {
    bodyId: {
      get () {
        return this.id + '-body'
      }
    }
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
            this.getCommentBodyElement().scrollTop = 0
          })
          .catch((rErr) => {
            this.showNotification('Something went wrong, please try later', 'error')
          })
      }
    },
    loadReactions () {
      if (this.noMoreReactions) {
        return false
      }
      if (this.loading || this.loadMoreReactions) {
        this.$options.service.loadReactions(this.comment.id, this.page)
          .then((d) => {
            this.loading = false
            this.loadMoreReactions = false
            if (this.page === 1) {
              this.attachScrollEvent()
            }
            if (d.reactions.length) {
              this.reactions = this.reactions.concat(d.reactions)
              this.page++
            } else {
              this.noMoreReactions = true
            }
          })
          .catch((rErr) => {
            this.showNotification('Something went wrong, please try again', 'error')
          })
      }
    },
    attachScrollEvent () {
      let attachEvent = (elem) => {
        elem.onscroll = () => {
          if (elem.scrollTop >= ((elem.scrollHeight - 200) - elem.offsetHeight) && !this.noMoreReactions && !this.loadMoreReactions) {
            this.loadMoreReactions = true
            this.loadReactions()
          }
        }
      }
      let interval = setInterval(() => {
        let elem = this.getCommentBodyElement()
        if (elem) {
          attachEvent(elem)
          clearInterval(interval)
        }
      }, 100)
    },
    getCommentBodyElement () {
      return document.getElementById(this.bodyId)
    }
  }
}
</script>
