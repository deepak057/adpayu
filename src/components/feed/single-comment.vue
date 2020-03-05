<template lang="pug">
.comment-row.row.custom-comment-row.m-t-10.m-l-0.m-r-0
  .col-0.p-0.hidden-xs-down.comment-user-profile-pic-container
    <router-link @click.native = "closeAllModals()" :to="userProfileLink(comment.User.id)">
      span.round
        img(:src='getMedia(comment.User.pic)', alt='user', width='50')
    </router-link>
  .col-12.col-md-10.col-xs-12.comment-text.p-0
    h5.user-name-wrap
      <router-link @click.native = "closeAllModals()" :to="userProfileLink(comment.User.id)">
        | {{userName(comment.User)}}
      </router-link>
    .m-b-5(v-if="!isQuestion()")
      <template v-if="comment.comment">
      | {{comment.comment}}
      </template>
    <template v-if="getVideo(comment)">
    .row.m-0
      //.comments.video-container.col-xs-12.col-sm-8.col-md-8.col-lg-6.p-0(:class="videoWrapColClass")
      .comments.video-container.col-lg-6.col-md-8.p-0.m-t-5(:class="videoWrapColClass")
        <comment-video-player ref="videoCommentComp" :autoReplay = "autoReplay" :comment="comment"/>
    </template>
    div.m-b-5.answer-content-wrap(v-html="comment.comment" v-if="isQuestion() && !isVideoAnswer() && comment.comment")
    <template v-if="isQuestion() && isVideoAnswer() && comment.comment">
    div(:class="{'row p-0 m-0': !commentDescriptionEnabled}")
      .video-comment-content(:class="{'col-lg-6 col-md-8 p-0 d-flex': !commentDescriptionEnabled}")
        div(:class="{'excerpt': !commentDescriptionEnabled, 'm-t-5': commentDescriptionEnabled}" v-html="comment.comment")
        span.underline.pointer.m-t-1.toggle(v-if="comment.comment.length > defaultVideoCommentDescriptionCharLength" @click="toggleVideoCommentDescription()")
          | show {{(!commentDescriptionEnabled ? "more" : "less")}}
    </template>
    .comment-footer(:class="{'m-t-10': getVideo(comment)}")
      span.text-muted.pull-right.comment-datetimestamp.m-l-5
        <timeago :datetime="comment.createdAt" :auto-update="60" :title="comment.createdAt | date"></timeago>
      span.action-icons.visible
        //a(href='javascript:void(0)')
          //i.ti-pencil-alt
        a.m-r-10.comment-padding-0(href='javascript:void(0)' @click='deleteComment()' title="Delete this comment" v-if="isOwner(comment.User.id) || isAdmin()")
          i.ti-trash
        <like :likesCount="comment.CommentsLikesCount" :hasLiked="comment.HasLiked" :commentId="comment.id"></like>
        .btn-group()
          button.btn.btn-xs.btn-secondary.dropdown-toggle.no-border-shadow.bg-none(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='true' title="More Options")
           i.fa.fa-list
          .dropdown-menu
            <router-link @click.native = "closeAllModals()" class="dropdown-item" title="Go to its own separate page" :to="getCommentLink(comment.id)">
              i.ti-link
              | Comment Page
            </router-link>
            <template v-if="isOwner(comment.User.id) || isAdmin()">
            a.dropdown-item(@click="triggerVideoEditing()" v-if="getVideo(comment)" href="javascript:void(0)" title="Edit the video")
              i.fa.fa-video-camera.m-r-5
              | Edit Video
            a.dropdown-item(href="javascript:void(0)" @click="triggerCommentEditing()")
              <template v-if="getVideo(comment)">
              span(v-if="!comment.comment")
                i.mdi.mdi-comment-plus-outline
                |  Add Details
              span(v-if="comment.comment")
                i.ti-pencil-alt
                |  Edit Details
              </template>
              span(v-if="!getVideo(comment)")
                i.ti-pencil-alt
                |  Edit
            </template>
            a.dropdown-item(@click="triggerSharing()" href="javascript:void(0)" title="Share it on other social networks")
              i.ti-share.m-r-5
              | Share
  <social-share ref="socialShareComp" />
  <video-editing @VideoEdited="refreshVideo" ref="videoEditingComponent"/>
  <edit-comment ref="editCommentComponent" @CommentEdited="textCommentUpdated"/>
</template>
<script>
import Like from './like'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import Service from './service'
import mixin from '../../globals/mixin.js'
import commentMixin from './comment-mixin.js'
import auth from '@/auth/helpers'
import CommentVideoPlayer from './comment-video-player'
import SocialShare from '../../components/social-share'
import VideoEditing from '../videoEditing/main'
import EditComment from './edit-comment'

export default {
  name: 'SingleComment',
  service: new Service(),
  components: {
    Like,
    CommentVideoPlayer,
    VideoEditing,
    SocialShare,
    EditComment
  },
  mixins: [mixin, commentMixin],
  props: {
    comment: {
      type: Object,
      required: true
    },
    autoReplay: {
      type: Boolean,
      default () {
        return false
      }
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
    },
    commentType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentUser: auth.getUser(),
      commentDescriptionEnabled: false,
      defaultVideoCommentDescriptionCharLength: 77
    }
  },
  computed: {
    videoWrapColClass: {
      get () {
        return 'cosl-lg-' + this.videoWrapCol
      }
    }
  },
  methods: {
    triggerCommentEditing () {
      this.$refs.editCommentComponent.triggerPopup(this.comment, this.commentType)
    },
    refreshVideo (comment) {
      this.comment = comment
    },
    deleteComment () {
      this.$emit('deleteComment', this.index)
    },
    triggerVideoEditing () {
      this.$refs.videoEditingComponent.triggerPopup(this.comment)
    },
    triggerSharing () {
      this.$refs.socialShareComp.triggerPopup(this.comment)
    },
    videoAnswerHasContent () {
      return this.isQuestion() && this.comment.comment
    },
    isVideoAnswer () {
      return this.comment.videoPath
    },
    toggleVideoCommentDescription () {
      this.commentDescriptionEnabled = !this.commentDescriptionEnabled
    },
    textCommentUpdated (commentText) {
      this.comment.comment = commentText
    }
  }
}
</script>
