<template lang="pug">
.container-fluid
  <page-title heading="Post" :subHeading="breadcrumbSubHead | capitalize"/>
  .row.single-post-page
    .col-12.feed-container-col
      .card
        .card-body.p-0(:class="{'min-h-400': pageLoading}")
          div.m-t-20.text-center(v-show="pageLoading")
            <preloader></preloader>
          <feed :feed="feed" class="hide-hr" v-show="!pageLoading" :customClasses="'p-t-10'"></feed>
</template>
<script>
import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Feed from './../../components/feed/feed'
import mixin from '../../globals/mixin.js'
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
    PageTitle
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
          this.showNotification('Something went wrong while getting the data, please try again later.', 'error')
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
