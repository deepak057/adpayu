<template lang="pug">
.container-fluid
  <page-title heading="Post" :subHeading="breadcrumbSubHead | capitalize"/>
  .row.single-post-page
    .col-12.feed-container-col
      .card
        .card-body.p-0(:class="{'min-h-400': pageLoading}")
          div.m-t-20.text-center(v-show="pageLoading")
            <preloader></preloader>
          <feed :feed="feed" class="hide-hr" v-if="feed.length && !pageLoading" :customClasses="'p-t-10'"></feed>
          <template v-if="!feed.length && !pageLoading">
          <page-404 :errDes="commentNotFoundError"/>
          </template>
</template>
<script>
import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Feed from './../../components/feed/feed'
import mixin from '../../globals/mixin.js'
import Page404 from './../../components/404'
import PageTitle from './../../components/page-title'

export default {
  name: 'Pages',
  metaInfo () {
    return {
      title: 'Post'
    }
  },
  components: {
    Preloader,
    Feed,
    PageTitle,
    Page404
  },
  mixins: [mixin],
  data () {
    return {
      id: this.$route.params.id,
      feed: [],
      pageLoading: true,
      postType: 'Post',
      breadcrumbSubHead: 'Post'
    }
  },
  watch: {
    '$route.params.id' (newV) {
      this.id = newV
      this.loadPost()
    }
  },
  mounted () {
    this.loadPost()
  },
  methods: {
    showError () {
      return this.isEmptyObject(this.comment) && !this.pageLoading
    },
    loadPost () {
      this.scrollToTop()
      this.pageLoading = true
      auth.getPost(this.id)
        .then((data) => {
          this.pageLoading = false
          data.showComments = true
          this.postType = this.getPostTypeLabel(data.type)
          this.setDocumentTitle(this.getPageTitle(data))
          this.breadcrumbSubHead = this.postType
          this.feed = [data]
        })
        .catch((postErr) => {
          this.pageLoading = false
          this.showNotification('The page/post is not found or not available', 'error')
        })
    },
    getPageTitle (post) {
      if (post.type === 'question' || post.type === 'video') {
        if (post.Video) {
          return post.Video.title
        } else {
          return post.Question.question
        }
      } else {
        return this.getPostTypeLabel(post.type)
      }
    }
  }
}
</script>
