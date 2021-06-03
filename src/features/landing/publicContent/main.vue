<template lang="pug">
.main.public-content-wrap.font-alt
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
            .col-12.col-md-12.col-sm-12
               <video-player class="vjs-3-4" @play="onPlay($event)" :options="videoPlayerOptions(content.video)" :playsinline="true" data-setup="{fluid: true}"/>
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
          .row.m-t-10
            .col-md-6.col-xs-6
              <router-link :to = "content.url" title="Log in to like it">
                span(v-if="parseInt(content.likesCount)")
                  | {{formatNumber(content.likesCount, false, 10)}}
                i.fa.fa-heart.m-l-5.like-icon
              </router-link>
              a.m-l-5(href="javascript:void(0)" @click="toggleComments()" v-if="canLoadComments()")
                span(v-if = "content.commentsCount")
                  | {{formatNumber(content.commentsCount, false, 10)}}
                |  {{content.commentLabel}}
                span(v-if = "content.commentsCount && content.commentsCount > 1")
                  | s
              <router-link class="m-l-5" v-if="!canLoadComments()" :to = "content.url" title="Log in to leave your response">
                span(v-if = "content.commentsCount")
                  | {{formatNumber(content.commentsCount, false, 10)}}
                <template v-if="isQuestion() && !content.comment">
                |  {{content.commentLabel}}
                span(v-if = "content.commentsCount && content.commentsCount > 1")
                  | s
                </template>
                span(v-if="!isQuestion() || content.comment ")
                  i.fa.fa-comment-o(:class="{'m-l-5': parseInt(content.commentsCount)}")
              </router-link>
              .btn-group.custom
                button.btn.btn-xs.dropdown-toggle.no-border-shadow.bg-none.custom(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='true' title="More Options")
                 i.fa.fa-list
                .dropdown-menu
                  a.dropdown-item.mb-10(href='javascript:void(0)' @click="triggerSocialShare((content.comment || content.post))")
                    i.fa.fa-share-alt.m-r-5.m-l-5
                    | Share
            .col-md-6.col-xs-6.text-right
              <timeago :datetime="content.date" :auto-update="60" :title="content.date | date"></timeago>
          .row.mt-20(v-if="canLoadComments()")
            .col-md-12(v-if="content.commentsLoader")
              <preloader class="preloader-h-15"/>
            <template v-if="!content.commentsLoader && content.comments.length">
            .col-10.col-md-10.col-sm-12.mt-20(v-for="comment in content.comments" v-if="showComment(comment)")
               <router-link :to="getCommentLink(comment.id, true, false)">
                 | {{userName(comment.User)}}
               </router-link>
               <video-player class="vjs-3-4" @play="onPlay($event, comment.id, 'comment')" :options="videoPlayerOptions(comment)" :playsinline="true" data-setup="{fluid: true}"/>
               .small.text-muted(v-html="comment.comment" v-if="comment.comment")
               .row.video-footer
                 .col-md-6.col-xs-6.col-sm-6
                   <router-link class="mt-5" :to = "getCommentLink(comment.id)" title="Log in to like it">
                     span(v-if = "parseInt(comment.CommentsLikesCount)")
                      | {{formatNumber(comment.CommentsLikesCount, false, 10)}}
                     i.fa.fa-heart.like-icon(:class="{'m-l-5': parseInt(comment.CommentsLikesCount)}")
                   </router-link>
                   <router-link class="m-l-5" :to = "getCommentLink(comment.id)" title="Log in to leave your response">
                    span(v-if = "comment.ReactionsCount")
                      | {{formatNumber(comment.ReactionsCount, false, 10)}}
                    i.fa.fa-comment-o(:class="{'m-l-5': parseInt(comment.ReactionsCount)}")
                   </router-link>
                   .btn-group.custom
                      button.btn.btn-xs.dropdown-toggle.no-border-shadow.bg-none.custom(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='true' title="More Options")
                       i.fa.fa-list
                      .dropdown-menu
                        <router-link class="dropdown-item" :to="getCommentLink(comment.id, true, false)">
                          i.fa.fa-eye.m-r-5.m-l-5
                          | View Page
                        </router-link>
                        a.dropdown-item.mb-10(href='javascript:void(0)' @click="triggerSocialShare(comment)")
                          i.fa.fa-share-alt.m-r-5.m-l-5
                          | Share
                 .col-md-6.col-xs-6.col-sm-6.text-right
                   <timeago :datetime="comment.createdAt" :auto-update="60" :title="comment.createdAt | date"></timeago>
            .col-md-12.mt-40(v-if="content.comments.length > 1")
              a(href="javascript:void(0)" @click="toggleComments()")
                | {{(content.showCommentsLabel)}}
            </template>
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
  <social-share ref="socialShareComp" :customClass="'public-social-share-wrap'"/>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import mixin from '../../../globals/mixin'
import Preloader from '../../../components/preloader'
import auth from '@/auth/helpers'
import { router } from '@/http'
import SocialShare from '../../../components/social-share'

function publicContentPagInitialConfig () {
  return {
    post: false,
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
    images: [],
    keywords: '',
    comments: [],
    commentsLoader: false,
    showAllComments: false,
    showCommentsLabel: 'Show all answers',
    date: ''
  }
}

export default {
  name: 'PublicContent',
  components: {
    Preloader,
    videoPlayer,
    SocialShare
  },
  mixins: [mixin],
  data () {
    return {
      loader: true,
      content: publicContentPagInitialConfig()
    }
  },
  metaInfo () {
    return {
      title: this.getTitle(),
      meta: [
        {
          name: 'keywords',
          content: this.content.keywords
        },
        {
          property: 'og:title',
          content: this.getTitle()
        },
        {
          property: 'og:image',
          content: this.content.video ? this.getVideoPoster(this.content.video) : '',
          itemprop: 'image'
        },
        {
          property: 'og:site_name',
          content: this.siteName
        },
        {
          property: 'og:url',
          content: window.location.href
        },
        {
          property: 'og:description',
          content: (this.content.video ? 'Uploaded' : 'Created') + ' by ' + this.userName(this.content.user)
        },
        {
          property: 'og:video',
          content: this.content.video ? this.getVideoURL(this.content.video) : ''
        },
        {
          property: 'og:type',
          content: this.content.video ? 'video' : 'website'
        }
      ]
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
  watch: {
    '$route.name' () {
      this.content = publicContentPagInitialConfig()
      this.init()
    }
  },
  mounted () {
    this.removeSiteImage()
    this.init()
  },
  methods: {
    /*
    * function to remove the Meta og:image tag so that
    * the og:image tag created by this component is
    * detected by the search engine crwallers
    */
    removeSiteImage () {
      try {
        let elem = document.querySelector("[name='site.image.url']")
        if (elem) {
          elem.remove()
        }
      } catch (e) {
        console.log(e)
      }
    },
    init () {
      this.scrollToTop()
      if (!this.isLoggedIn()) {
        this.fetchData()
      } else {
        this.redirectToRealPage()
      }
    },
    triggerSocialShare (obj) {
      this.$refs.socialShareComp.triggerPopup(obj)
    },
    toggleComments () {
      this.scrollToTop()
      this.content.showAllComments = !this.content.showAllComments
      if (!this.content.showAllComments) {
        this.content.showCommentsLabel = publicContentPagInitialConfig().showCommentsLabel
      } else {
        this.content.showCommentsLabel = 'Show top answer'
      }
    },
    showComment (comment) {
      if (this.content.showAllComments) {
        return true
      } else {
        return comment.setDefault
      }
    },
    getTitle () {
      return this.getPageTitle(this.content.title || (this.isPost ? 'Post' : 'Response'))
    },
    onPlay (e, id = false, type = false) {
      this.pauseAllOtherVideos(e)
      auth.markEntityAsViewed((id || this.contentId), (type || (this.isPost ? 'post' : 'comment')))
    },
    redirectToRealPage () {
      let url = this.isPost ? this.getPostLink(this.contentId) : this.getCommentLink(this.contentId)
      router.push(url)
    },
    redirectWithError () {
      this.showNotification('This page might be available after log in', 'error')
      this.redirectToRealPage()
    },
    fetchComments () {
      if (this.canLoadComments()) {
        this.commentsLoader = true
        auth.loadComments(this.contentId, true)
          .then((d) => {
            this.content.commentsLoader = false
            this.content.comments = d.comments
            this.content.commentsCount = d.comments.length
          })
          .catch((cE) => {
            this.content.commentsLoader = false
            this.showNotification('Something went wrong while fetching the answeres/videos', 'error')
          })
      }
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
    isQuestion () {
      return this.content.post && this.content.post.type === 'question'
    },
    canLoadComments () {
      return !this.loader && this.isQuestion() && !this.content.comment && this.content.commentsCount
    },
    prepareContentObject (post, comment = false) {
      this.content.post = post
      this.content.comment = comment
      let getPostDescription = () => {
        return post.Video && post.Video.description ? post.Video.description : (post.Question && post.Question.description ? post.Question.description : false)
      }
      let getKeyWordsFromTags = () => {
        let keywords = []
        if (post.Tags && post.Tags.length) {
          for (let i in post.Tags) {
            keywords.push(post.Tags[i].name)
          }
        }
        return keywords.join(',')
      }
      this.content.keywords = getKeyWordsFromTags(post.Tags)
      if (this.isPost) {
        this.content.url = this.getPostLink(post.id)
        this.content.title = post.type !== 'text' ? this.getPostTitle(post) : false
        this.content.video = post.Video || false
        this.content.description = getPostDescription()
        this.content.likesCount = post.LikesCount
        this.content.commentLabel = this.isQuestion() ? 'Answer' : 'Comment'
        this.content.commentsCount = this.isQuestion() ? post.CommentsCount : post.ReactionsCount
        this.content.user = post.User
        this.content.content = post.content || false
        this.content.images = post.Images && post.Images.length ? post.Images : []
        this.content.keywords = getKeyWordsFromTags(post.Tags)
        this.content.date = post.updatedAt
      } else {
        this.content.url = this.getPostLink(post.id, true, false)
        this.content.title = comment.User.first + '\'s response on ' + this.getPostTitle(post)
        this.content.video = comment.videoPath ? comment : false
        this.content.commentDescription = comment.comment || false
        this.content.likesCount = comment.CommentsLikesCount
        this.content.commentsCount = comment.ReactionsCount
        this.content.commentLabel = 'Comment'
        this.content.user = comment.User
        this.content.date = comment.updatedAt
      }
      this.fetchComments()
    }
  }
}
</script>
