<template lang="pug">
.d-flex.flex-row.comment-row
  .p-2
    <router-link @click.native = "leavePage()" :to="userProfileLink(comment.User.id)">
      span.round
        img(:src='getMedia(comment.User.pic)', alt='user', width='50')
    </router-link>
  .comment-text.w-100
    h5
      <router-link @click.native = "leavePage()" :to="userProfileLink(comment.User.id)">
        | {{userName(comment.User)}}
      </router-link>
    .m-b-5(v-if="!isQuestion()")
      <template v-if="comment.comment">
      | {{comment.comment}}
      </template>
    <template v-if="getVideo(comment)">
    .row
      .comments.video-container(:class="videoWrapColClass")
        <comment-video-player :videoPath="comment.videoPath"/>
    </template>
    div.m-b-5(v-html="comment.comment" v-if="isQuestion()")
    .comment-footer(:class="{'m-t-10': getVideo(comment)}")
      span.text-muted.pull-right.comment-datetimestamp.m-l-5
        <timeago :datetime="comment.createdAt" :auto-update="60" :title="comment.createdAt | date"></timeago>
      span.action-icons.visible
        //a(href='javascript:void(0)')
          //i.ti-pencil-alt
        a.m-r-10.comment-padding-0(href='javascript:void(0)' @click='deleteComment()' title="Delete this comment" v-if="isOwner(comment.User.id)")
          i.ti-trash
        <like :likes="comment.Likes" :commentId="comment.id"></like>
        .btn-group()
          button.btn.btn-xs.btn-secondary.dropdown-toggle.no-border-shadow(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='true' title="More Options")
           i.fa.fa-list
          .dropdown-menu
            <router-link :href="getCommentLink(comment.id)" class="dropdown-item" title="Go to its own separate page" :to="getCommentLink(comment.id)">
              i.ti-link
              | Comment Page
            </router-link>
</template>
<script>
import Like from './like'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import Service from './service'
import mixin from '../../globals/mixin.js'
import commentMixin from './comment-mixin.js'
import auth from '@/auth/helpers'
import CommentVideoPlayer from './comment-video-player'

export default {
  name: 'SingleComment',
  service: new Service(),
  components: {
    Like,
    CommentVideoPlayer
  },
  mixins: [mixin, commentMixin],
  props: {
    comment: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default () {
        return 0
      }
    },
    videoWrapCol: {
      type: Number,
      default () {
        return 5
      }
    }
  },
  data () {
    return {
      currentUser: auth.getUser()
    }
  },
  computed: {
    videoWrapColClass: {
      get () {
        return 'col-lg-' + this.videoWrapCol + ' col-md-' + this.videoWrapCol
      }
    }
  },
  methods: {
    deleteComment () {
      this.$emit('deleteComment', this.index)
    }
  }
}
</script>
