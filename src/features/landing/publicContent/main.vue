<template lang="pug">
.main.public-content-wrap
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
              h4(v-if="isMobile() && content.title")
                <router-link :to = "content.url">
                  | {{content.title}}
                </router-link>
              h3.m-t-0.m-b-15(v-if="!isMobile() && content.title")
                <router-link :to = "content.url">
                  | {{content.title}}
                </router-link>
              .m-t-10.m-b-10.w-s-pre(v-if="content.content" v-html="content.content")
              p.text-muted(v-html="content.description" v-if = "content.description")
          .row(v-if="content.video")
            .col-10.col-md-10.col-sm-12
               <video-player class="vjs-3-4" @play="onPlay" :options="videoPlayerOptions(content.video)" :playsinline="true" data-setup="{fluid: true}"/>
               .small.text-muted(v-html="content.commentDescription" v-if="content.commentDescription")
          .row.multi-columns-row(v-if="content.images.length")
            .col-sm-6.col-md-4.col-lg-4(v-for="image in content.images")
              .gallery-item
                .gallery-image
                  a.gallery(:href='getMedia(image.path)')
                    img(:src='getMedia(image.path)')
                    .gallery-caption
                      .gallery-icon
                        span.icon-magnifying-glass
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
                |  Comment
                span(v-if = "content.commentsCount && content.commentsCount > 1")
                  | s
              </router-link>
        .col-md-4.col-sm-12.pc-user-info-container.text-center(:class="{'m-t-100': !isMobile(), 'm-t-20': isMobile()}")
          h4
            span.all-caps
              | Created by
            .m-t-10
          <router-link :to="userProfileLink(content.user.id)">
            img.rounded(:src = "getUserProfileImage(content.user.pic, false)")
          </router-link>
          h4
            <router-link :to="userProfileLink(content.user.id)" class="m-t-10">
              |  {{userName(content.user)}}
            </router-link>
          p
            | {{content.user.tagline}}
      .row
        .col-md-12.m-t-50.m-b-40
          h5(v-if="!isLoggedIn()")
            <router-link :to = "content.url">
              | Log In
            </router-link>
            |  Or
            <router-link to="/signup">
              |  Sign Up
            </router-link>
            |  To See More
          h5(v-if="isLoggedIn()")
            | Go to your
            <router-link to="/dashboard">
              |  Dashboard
            </router-link>
            |  to see more
      </template>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import mixin from '../../../globals/mixin'
import Preloader from '../../../components/preloader'
import auth from '@/auth/helpers'
import { router } from '@/http'

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
        content: false,
        video: false,
        likesCount: false,
        commentsCount: false,
        comment: false,
        commentDescription: false,
        url: false,
        user: false,
        images: []
      }
    }
  },
  metaInfo () {
    return {
      title: this.getPageTitle(this.content.title || (this.isPost ? 'Post' : 'Response'))
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
    if (!this.isLoggedIn()) {
      this.fetchData()
    } else {
      this.redirectToRealPage()
    }
  },
  methods: {
    onPlay () {
      auth.markEntityAsViewed(this.contentId, (this.isPost ? 'post' : 'comment'), auth.getGuestId())
    },
    redirectToRealPage () {
      let url = this.isPost ? this.getPostLink(this.contentId) : this.getCommentLink(this.contentId)
      router.push(url)
    },
    redirectWithError () {
      this.showNotification('This page might be available after log in', 'error')
      this.redirectToRealPage()
    },
    fetchData () {
      try {
        this.loader = true
        if (this.isPost) {
          auth.getPost(this.contentId, false, true)
            .then((d) => {
              this.loader = false
              this.prepareContentObject(d)
            })
            .catch((sErr) => {
              this.redirectWithError()
            })
        } else {
          auth.getComment(this.contentId, true)
            .then((d) => {
              this.loader = false
              this.prepareContentObject(d.post, d.comment)
            })
            .catch((sErr) => {
              this.redirectWithError()
            })
        }
      } catch (e) {
        this.showNotification('Something went wrong, please try again later', 'error')
      }
    },
    prepareContentObject (post, comment = false) {
      let getPostDescription = () => {
        return post.Video && post.Video.description ? post.Video.description : (post.Question && post.Question.description ? post.Question.description : false)
      }
      if (this.isPost) {
        this.content.url = this.getPostLink(post.id)
        this.content.title = post.type !== 'text' ? this.getPostTitle(post) : false
        this.content.video = post.Video || false
        this.content.description = getPostDescription()
        this.content.likesCount = post.LikesCount
        this.content.commentsCount = post.CommentsCount
        this.content.user = post.User
        this.content.content = post.content || false
        this.content.images = post.Images && post.Images.length ? post.Images : []
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
