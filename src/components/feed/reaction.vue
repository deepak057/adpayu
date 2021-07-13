<template lang="pug">
.reaction-popup.f-s-16(v-if="triggered" :id="id")
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
          li(v-for="reaction in reactions" :key="reaction.id")
            .chat-img
              <router-link @click.native="closeReactionsPopup()" :to="userProfileLink(reaction.User.id)">
                img(:src='getUserProfileImage(reaction.User.pic, "blue")', alt='user')
              </router-link>
            .chat-content
              h5
                <router-link @click.native="closeReactionsPopup()" class="pointer" tag="span" :to="userProfileLink(reaction.User.id)">
                  | {{userName(reaction.User, true, true)}}
                </router-link>
              .box
                | {{reaction.text}}
                span.pointer.m-l-10.p-r-t-1(@click = "deleteReaction(reaction.id)" title="Delete this" v-if="isOwner(reaction.UserId)")
                  i.ti-trash
                .small.text-muted.m-t-10
                  <timeago :datetime="reaction.createdAt" :auto-update="60" :title="reaction.createdAt | date"></timeago>
            // .chat-time
              <timeago :datetime="reaction.createdAt" :auto-update="60" :title="reaction.createdAt | date"></timeago>
      .m-t-10.m-b-10.text-center(v-if="loadMoreReactions || noMoreReactions")
        <preloader class="loader-medium" v-if="loadMoreReactions"/>
        span.reactions-no-more(v-if="reactions.length && noMoreReactions")
            i.mdi.mdi-emoticon-sad.m-r-5
            | No More Reactions
    .reaction-modal-footer
      .row.m-0
        .col-10.p-0
          textarea.form-control.b-0(@keyup.enter="saveReaction()" v-model.trim = "reaction" placeholder='Type your message here')
        .col-2.text-right.p-0
          <preloader class="loader-medium m-t-10" v-if="posting"/>
          button.btn.btn-default.btn-circle.post-reaction-btn(v-if="!posting" @click="saveReaction()")
            i.fa.fa-paper-plane-o
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import Service from './service'
import auth from '@/auth/helpers'

function ReactionsInitialState (id) {
  return {
    id: id,
    currentUser: auth.getUser(),
    triggered: false,
    shown: false,
    loading: true,
    page: 1,
    reactions: [],
    reaction: '',
    loadMoreReactions: false,
    noMoreReactions: false,
    posting: false
  }
}

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
      default () {
        return {}
      }
    },
    post: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return ReactionsInitialState(this.getUniqueId() + '-reaction-wrap')
  },
  computed: {
    bodyId: {
      get () {
        return this.id + '-body'
      }
    }
  },
  watch: {
    comment (newV) {
      this.closeReactions()
      this.reset()
    }
  },
  mounted () {
  },
  methods: {
    close () {
      this.shown = false
    },
    reset () {
      Object.assign(this.$data, ReactionsInitialState(this.getUniqueId() + '-reaction-wrap'))
    },
    trigger (obj = false, type = false) {
      this.reset()
      if (type && obj) {
        if (type === 'comment') {
          this.comment = obj
        } else {
          this.post = obj
        }
      }
      this.closeReactions()
      this.triggered = true
      this.shown = true
      this.loadReactions()
      this.appendToBody()
    },
    /*
    * append Reactions popup to body
    * to avoid CSS conflicts with Overlay View
    * if reactions are triggerd in Overlay View
    */
    appendToBody () {
      const component = this.$mount()
      document.querySelector('body').appendChild(component.$el)
    },
    closeReactionsPopup () {
      this.triggered = false
      this.closeAllModals()
    },
    saveReaction () {
      if (this.reaction && !this.posting) {
        this.posting = true
        this.$options.service.saveReaction(this.getObjectInfo(), this.reaction)
          .then((d) => {
            this.posting = false
            this.reaction = ''
            this.reactions.unshift(d.reaction)
            this.getCommentBodyElement().scrollTop = 0
            this.$emit('ReactionCountUpdated', {
              action: 'add',
              obj: this.getObjectInfo()
            })
          })
          .catch((rErr) => {
            this.posting = false
            this.showNotification('Something went wrong, please try later', 'error')
          })
      }
    },
    isOwner (rUID) {
      return this.currentUser.id === rUID
    },
    deleteReaction (rId) {
      if (confirm('Delete this reaction?')) {
        for (let i in this.reactions) {
          if (this.reactions[i].id === rId) {
            this.reactions.splice(i, 1)
            this.$options.service.removeReaction(rId)
              .then((d) => {
                this.$emit('ReactionCountUpdated', {
                  action: 'delete',
                  obj: this.getObjectInfo()
                })
              })
              .catch((rErr) => {
                this.showNotification('Something went wrong, please try later', 'error')
              })
          }
        }
      }
    },
    getObjectInfo () {
      return {
        id: !this.isEmptyObject(this.post) ? this.post.id : this.comment.id,
        type: !this.isEmptyObject(this.post) ? 'post' : 'comment'
      }
    },
    loadReactions () {
      if (this.noMoreReactions) {
        return false
      }
      if (this.loading || this.loadMoreReactions) {
        this.$options.service.loadReactions(this.getObjectInfo(), this.page)
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
