<template lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0 Profile
      ol.breadcrumb
        li.breadcrumb-item
          <router-link to="/">
            | Home
          </router-link>
        li.breadcrumb-item.active {{postType | capitalize}}
    .col-md-8.col-12.align-self-center.text-right
      h3.m-b-0.font-light $3249
      h5.text-muted.m-b-0 Total Revenue
  // ==============================================================
  // End Bread crumb and right sidebar toggle
  // ==============================================================
  // ==============================================================
  // Start Page Content
  // ==============================================================
  // Row
  .row
    .col-12.feed-container-col
      .card
        .card-body.min-h-400
          div.m-t-20.text-center(v-show="pageLoading")
            <preloader></preloader>
          <feed :feed="feed" v-show="!pageLoading"></feed>
</template>
<script>
import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import Feed from './../../components/feed/feed'
import mixin from '../../globals/mixin.js'

export default {
  name: 'Pages',
  components: {
    Preloader,
    Feed
  },
  mixins: [mixin],
  data () {
    return {
      id: this.$route.params.id,
      feed: [],
      pageLoading: true,
      postType: 'Post'
    }
  },
  mounted () {
    auth.getPost(this.id)
      .then((data) => {
        this.pageLoading = false
        data.showComments = true
        this.postType = this.getPostTypeLabel(data.type)
        this.setDocumentTitle(this.getPageTitle(data))
        this.feed.push(data)
      })
      .catch((postErr) => {
        this.pageLoading = false
        alert('Something went wrong while getting the data, please try again later.')
      })
  },
  methods: {
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
