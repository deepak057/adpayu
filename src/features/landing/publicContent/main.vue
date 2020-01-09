<template lang="pug">
.main.vh-95.public-content-wrap
  section.module(:class="{'p-0': !loader, 'p-40': loader}")
    .container
      .row(v-if="loader")
        .col-12
          .text-center.m-t-100
            <preloader/>
      <template v-if="!loader">
      .row.m-t-20
        .col-md-8.col-sm-12
          .row
            .col-md-12.col-sm-12
              h4(v-if="isMobile()")
                <router-link :to = "content.url">
                  | {{content.title}}
                </router-link>
              h3.m-t-0.m-b-15(v-if="!isMobile()")
                <router-link :to = "content.url">
                  | {{content.title}}
                </router-link>
              p.text-muted(v-html="content.description" v-if = "content.description")
          .row
            .col-10.col-md-10.col-sm-12
               <video-player class="vjs-3-4" :options="videoPlayerOptions(content.video)" :playsinline="true" data-setup="{fluid: true}"/>
               .small.text-muted(v-html="content.commentDescription" v-if="content.commentDescription")
          .row
            .col-md-12.m-t-10
              <router-link :to = "content.url" title="Log in to like it">
                span(v-if = "content.likesCount")
                  | {{content.likesCount}}
                i.fa.fa-heart.m-l-5.text-danger
              </router-link>
              <router-link v-if="isPost" class="m-l-10" :to = "content.url" title="Log in to leave your response">
                span.m-r-5(v-if = "content.commentsCount")
                  | {{content.commentsCount}}
                  | Comment
                  span(v-if = "content.commentsCount && content.commentsCount > 1")
                    | s
              </router-link>
        .col-md-4.col-sm-12
          h4
            | Uploaded by
            .m-t-10
              img.rounded(:src = "getUserProfileImage(content.user.pic)")
            <router-link :to="userProfileLink(content.user.id)">
              |  {{userName(content.user)}}
            </router-link>
      .row
        .col-md-12.m-t-50
          h5
            <router-link :to = "content.url">
              | Log in
            </router-link>
            |  Or
            <router-link to="/signup">
              |  Sign Up
            </router-link>
            |  To See More
      </template>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import mixin from '../../../globals/mixin'
import Preloader from '../../../components/preloader'
import auth from '@/auth/helpers'

export default {
  name: 'PublicContent',
  components: {
    Preloader,
    videoPlayer
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
        comment: false,
        commentDescription: false,
        url: false,
        user: false
      }
    }
  },
  metaInfo () {
    return {
      title: this.getPageTitle(this.content.title)
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
        this.content.url = this.getPostLink(post.id)
        this.content.title = this.getPostTitle(post)
        this.content.video = post.Video || false
        this.content.description = post.Video && post.Video.description ? post.Video.description : false
        this.content.likesCount = post.LikesCount
        this.content.commentsCount = post.CommentsCount
        this.content.user = post.User
      } else {
        this.content.url = this.getCommentLink(comment.id)
        this.content.title = comment.User.first + '\'s response on ' + this.getPostTitle(post)
        this.content.video = comment.videoPath ? comment : false
        this.content.commentDescription = comment.comment || false
        this.content.likesCount = comment.CommentsLikesCount
        this.content.user = comment.User
      }
    }
  }
}
</script>
