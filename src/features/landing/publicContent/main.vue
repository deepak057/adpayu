<template lang="pug">
.main.vh-95
  section.module.p-0
    .container
      .row
        .col-12.public-page-content-wrap
          .text-center
            <preloader v-if="loader"/>
          <template v-if="!loader">
          h4
            a(href="javascript:void(0)")
              | {{content.title}}
            p
              | {{getVideoURL(content.video)}}
          </template>
</template>
<script>
import mixin from '../../../globals/mixin'
import Preloader from '../../../components/preloader'
import auth from '@/auth/helpers'

export default {
  name: 'PublicContent',
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      loader: true,
      content: {
        title: false,
        description: false,
        video: false,
        likesCount: false,
        commentsCount: false,
        comment: false
      }
    }
  },
  computed: {
    isPost () {
      return this.$route.name === 'publicPost'
    },
    contentId () {
      return this.$route.params.id || false
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      try {
        this.loader = true
        if (this.isPost) {
          auth.getPost(this.contentId, false, true)
            .then((d) => {
              this.loader = false
              this.prepareContentObject(d)
            })
        } else {
          auth.getComment(this.contentId, true)
            .then((d) => {
              this.loader = false
              this.prepareContentObject(d.post, d.comment)
            })
        }
      } catch (e) {
        this.showNotification('Something went wrong, please try again later', 'error')
      }
    },
    prepareContentObject (post, comment = false) {
      if (this.isPost) {
        this.content.title = this.getPostTitle(post)
        this.content.video = post.Video || false
        this.content.description = post.Video && post.Video.description ? post.Video.description : false
        this.content.likesCount = post.LikesCount
        this.content.commentsCount = post.CommentsCount
      } else {
        this.content.title = comment.User.first + '\'s response on ' + this.getPostTitle(post)
        this.content.video = comment.videoPath ? comment : false
        this.content.description = comment.comment || false
        this.content.likesCount = comment.LikesCount
      }
    }
  }
}
</script>
