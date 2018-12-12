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
        li.breadcrumb-item.active Post
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
import Service from './service'
import Preloader from './../../components/preloader'
import Feed from './../../components/feed/feed'

export default {
  name: 'Pages',
  service: new Service(),
  components: {
    Preloader,
    Feed
  },
  data () {
    return {
      id: this.$route.params.id,
      feed: [],
      pageLoading: true
    }
  },
  mounted () {
    this.$options.service.getPost(this.id)
      .then((data) => {
        this.pageLoading = false
        data.showComments = true
        this.feed.push(data)
      })
      .catch((postErr) => {
        this.pageLoading = false
        alert('Something went wrong while getting the data, please try again later.')
      })
  }
}
</script>
