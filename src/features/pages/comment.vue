<template lang="pug">
.container-fluid
  <page-title heading="Response" :subHeading="breadcrumbSubHead | capitalize"/>
  // ==============================================================
  // Start Page Content
  // ==============================================================
  // Row
  .row
    .col-12.p-0
      .card
        .card-body.comment-response-container.hide-hr(v-if="!showError()" :class="{'p-ab-5': isMobile(), 'min-h-400': pageLoading}")
          .m-t-20.text-center(v-if="pageLoading")
            <preloader></preloader>
          <template v-if="!pageLoading">
          h3.response-head-title
            i.mdi.mdi-reply.m-r-5
            <router-link tag="span" :to="userProfileLink(commentUser.id)" class="cursor-hand">
              | {{commentUser.first | capitalize}}
            </router-link>
            |  's response on
            <router-link :to="getPostLink(post.id)">
              |  {{getPostTitle(post)}}
            </router-link>
          <single-comment :comment="comment" :videoWrapCol="6" @deleteComment="deleteComment" :commentType="commentType"/>
          </template>
        <template v-if="showError()">
        <page-404 :errDes="commentNotFoundError"/>
        </template>
</template>
<script>
import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Page404 from './../../components/404'
import mixin from '../../globals/mixin.js'
import PageTitle from './../../components/page-title'
import SingleComment from '../../components/feed/single-comment'
import commentMixin from '../../components/feed/comment-mixin'
import { router } from '@/http'

export default {
  name: 'Pages',
  metaInfo () {
    return {
      title: 'Comment'
    }
  },
  components: {
    Preloader,
    PageTitle,
    SingleComment,
    Page404
  },
  mixins: [mixin, commentMixin],
  data () {
    return {
      id: this.$route.params.id || false,
      pageLoading: true,
      comment: {},
      post: {},
      commentUser: {},
      breadcrumbSubHead: 'Response',
      commentNotFoundError: 'Sorry, this video answer doesn\'t exist or has been deleted.'
    }
  },
  computed: {
    commentType: {
      get () {
        if ('QuestionId' in this.post && this.post.QuestionId) {
          return 'question'
        } else {
          return 'comment'
        }
      }
    }
  },
  mounted () {
    try {
      this.scrollToTop()
      auth.getComment(this.id)
        .then((data) => {
          this.pageLoading = false
          this.comment = data.comment
          this.post = data.post
          this.commentUser = this.comment.User
          this.setDocumentTitle('Response on ' + this.getPostTitle(this.post))
          this.breadcrumbSubHead = this.getCommentType()
        })
        .catch((cErr) => {
          this.pageLoading = false
          this.showNotification(this.commentNotFoundError, 'error')
          throw new Error('Soemthing went wrong')
        })
    } catch (e) {
      this.showNotification('Something went wrong while getting the comment.', 'error')
    }
  },
  methods: {
    redirectToPost () {
      router.push(this.getPostLink(this.post.id))
    },
    showError () {
      return this.isEmptyObject(this.comment) && !this.pageLoading
    },
    deleteComment () {
      if (confirm('Are you sure you want to delete it?')) {
        this.showNotification('Deleting...', 'warn')
        auth.deleteComment(this.comment.id)
          .then((d) => {
            if (d.success) {
              this.showNotification('Deleted successfully.', 'success')
              this.redirectToPost()
            } else {
              this.showNotification(d.error, 'error')
            }
          })
          .catch((cErr) => {
            this.showNotification('Soemthing went wrong while trying to delete your comment.', 'error')
          })
      }
    }
  }
}
</script>
