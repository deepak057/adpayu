<template lang="pug">
.profiletimeline.p-l-10.p-r-10(:class="{'m-0': emptyFeed()}")
  .nothing-to-show(v-if="emptyFeed()")
    .jumbotron.white-back.text-center
      h1.display-3 Nothing Here!
      p.lead
        | There is no feed here
      hr.my-4
      p
        | You will see stuff here soon. You may browse more tags or topics
        <router-link to="/tags">
          |  here
        </router-link>
        | .
      .row.content-center
        <search-field :searchType="'content'" :placeholder="'Or search video, questions, users, tags...'"></search-field>
  .sl-item.feed-block(v-for="(f, k) in feedArr" :key="f.id" :class="[{'p-10': userFeed, 'ad-preview': preview, 'ribbon-wrapper ad-post': f['AdOption']}, customClasses]" v-observe-visibility="{throttle: 1000, intersection: { threshold: 0.5}, callback: (isVisible, entry) => postVisibilityChanged(isVisible, entry, f) }")
    .ribbon.ribbon-bookmark.ribbon-warning.f-w-400.cursor-hand(:class="{'bg-999 ad-consumed': !preview && adConsumed(f, 'impression')}" v-if="f['AdOption']" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" data-html="true" :data-content="getText(f, 'impression')") Sponsored +
       span.m-l-5(v-html="showAmount(f['AdOption'].cpi, false, true, false, false)")
       span.ad-amount-added-animation-wrap(v-if="!preview && adConsumed(f, 'impression')")
        span.amount.text-warning.bold.amount-container( :class ="{'fadeOutDiagon': f['impression']}" v-html="'+' + showAmount(f['AdOption'].cpi, false, true, false, false)")
       i.mdi.mdi-information.m-l-5.cursor-hand
    .sl-left
      <router-link @click.native = "closeAllModals()" :to="userProfileLink(getPostUser(f).id)" class="hidden-xs-down">
        img.img-circle(:src='getMedia(getPostUser(f).pic)', alt='user')
      </router-link>
    .sl-right
      div
        span.post-description-text-wrap
          <router-link v-if="isQuestion(f) || !manipulatePostDescriptionText(f)" @click.native = "closeAllModals()" class="hide-on-mobile" :to="userProfileLink(getPostUser(f).id)">
            | {{userName(getPostUser(f))}}
          </router-link>
          <router-link @click.native = "closeAllModals()" :to="userProfileLink(getPostUser(f).id)" class="show-on-mobile">
            img.img-circle.m-r-5(:src='getMedia(getPostUser(f).pic)', alt='user' style="max-width: 25px")
          </router-link>
          <router-link v-if="isQuestion(f) || !manipulatePostDescriptionText(f)" @click.native = "closeAllModals()" class="show-on-mobile" :to="userProfileLink(getPostUser(f).id)">
            | {{userName(getPostUser(f))}}
          </router-link>
          span(v-if="manipulatePostDescriptionText(f)")
            | {{getRecentActivityText(f)}}
          <router-link v-if="!isQuestion(f) && manipulatePostDescriptionText(f)" @click.native = "closeAllModals()" class="" :to="userProfileLink(getPostUser(f).id)">
            | {{userName(getPostUser(f))}}
          </router-link>
          |  {{getPostDescriptionText(f)}}
          span.sl-date
            <timeago v-if="!manipulatePostDescriptionText(f)" :datetime="f['createdAt']" :auto-update="60" class="m-l-5 hide-on-mobile" :title="f['createdAt'] | date"></timeago>
            <timeago v-if="manipulatePostDescriptionText(f) && !isQuestion(f)" :datetime="f['updatedAt']" :auto-update="60" class="m-l-5 hide-on-mobile" :title="f['updatedAt'] | date"></timeago>
            i.mdi.mdi-earth.m-l-5(title="Public, everyone can see it" v-if="f['public'] && !f['AdOption']")
            i.mdi.mdi-lock.m-l-5(title="Only friends can see it" v-if="!f['public'] && !f['AdOption']")
            i.mdi.mdi-earth-off.m-l-5(title="Sponsored, visible to target audience" v-if="f['AdOption']")
        .m-t-10.m-b-1rem.w-s-pre.custom-status-update-wrap(v-if="f['content']" v-html="f['content']")
        div.m-t-10(v-if="f['Question']")
          h3.font-bold
            a.font-dark(href="javascript:void(0)" v-if="preview")
              | {{f['Question'].question | capitalize}}
            <router-link @click.native = "closeAllModals()" :to="getPostLink(f.id)" class="font-dark" v-if="!preview">
              i.mdi.mdi-video.m-r-2(v-if="isVideoComment(f)")
              | {{f['Question'].question | capitalize}}
            </router-link>
            //i.mdi.mdi-clock.m-l-5.f-s-12.post-recent-activity-icon.cursor-hand(v-if="manipulatePostDescriptionText(f)" data-container="body" title="Recent Activity" data-toggle="popover" data-placement="right" :data-content='recentActivityText("question")')
          p.text-muted.post-description(:class="{'d-flex': !f['enableFullDescription']}" v-if="f['Question'].description")
            span(:class="{'post-description-excerpt': !f['enableFullDescription']}" )
              | {{f['Question'].description}}
            span(v-if="f['enableFullDescription']") ...
            span.underline.pointer(@click="showFullDescription(f)" v-if="f['Question'].description.length > descriptionExcerptCharsCount")
              | {{(!f['enableFullDescription'] ? ' show' : ' hide')}} description
        div.m-t-10(v-if="f['Video']")
          h3.font-bold
            a.font-dark(href="javascript:void(0)" v-if="preview")
              | {{f['Video'].title | capitalize}}
            <router-link @click.native = "closeAllModals()" :to="getPostLink(f.id)" class="font-dark" v-if="!preview">
              | {{f['Video'].title | capitalize}}
            </router-link>
            //i.mdi.mdi-clock.m-l-5.f-s-12.post-recent-activity-icon.cursor-hand(v-if="manipulatePostDescriptionText(f)" data-container="body" title="Recent Activity" data-toggle="popover" data-placement="right" :data-content='recentActivityText("video")')
          p.text-muted.post-description(:class="{'d-flex': !f['enableFullDescription']}" v-if="f['Video'].description")
            span(:class="{'post-description-excerpt': !f['enableFullDescription']}" )
              | {{f['Video'].description}}
            span(v-if="f['enableFullDescription']") ...
            span.underline.pointer(@click="showFullDescription(f)" v-if="f['Video'].description.length > descriptionExcerptCharsCount")
              | {{(!f['enableFullDescription'] ? ' show' : ' hide')}} description
          //p.text-muted {{f['Video'].description}}
        .row.m-0.feed-video-wrap(v-if="!isEmptyObject(f['Video'])")
          .col-md-8.video-container.p-b-0(:class="'col-lg-'+config.colWidth")
            <feed-video-player @FeedVideoPlayed = "feedVideoPlayed" @PostVideoPlayed = "postVideoPlayed" :triggerPopupView = "triggerPopupView" :autoReplay = "autoReplay" :feed = "f" @ready="onPlayerReady" @ended="onPlayerEnded"/>
          .col-md-4.col-sm-12.p-0(:class="'col-lg-'+(12-config.colWidth)" v-if="enableAdOption(f, 'view')")
            span.hidden-sm-down.m-l-10
            span.badge.badge-warning.ml-auto.f-w-400.pr-t--2.f-s-12.cursor-hand.m-m-t-7(:class="{'bg-999': !preview && adConsumed(f, 'view')}" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" data-html="true" :data-content="getText(f, 'view')")
              span(v-html="'+ ' + showAmount(f['AdOption'].cpv, false, true, false, false)")
              span.ad-amount-added-animation-wrap(v-if="!preview && adConsumed(f, 'view')")
                span.amount.text-warning.bold.amount-container( :class ="{'fadeOutDiagon': f['view']}" v-html="'+' + showAmount(f['AdOption'].cpv, false, true, false, false)")
              i.mdi.mdi-information.m-l-4.cursor-hand
        .row.m-l-0(v-if="f['Images'].length")
          <image-grid :images="f['Images']"></image-grid>
        .m-t-15.m-b-20(v-if="f['AdOption'] && f['AdOption'].clickTarget")
          a.m-r-5.post-ad-link(:href="getLink(f['AdOption'].adLink)" target="_blank" @click="adLinkclicked(f, $event)") {{f['AdOption'].adLinkLabel}}
          span.badge.badge-warning.ml-auto.f-w-400.pr-t--2.f-s-12.cursor-hand(v-if="enableAdOption(f, 'click')" :class="{'bg-999': !preview && adConsumed(f, 'click')}" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" data-html="true" :data-content="getText(f, 'click')" )
            span(v-html=" '+ ' + showAmount(f['AdOption'].cpc, false, true, false, false)")
            span.ad-amount-added-animation-wrap(v-if="!preview && adConsumed(f, 'click')")
              span.amount.text-warning.bold.amount-container( :class ="{'fadeOutDiagon': f['click']}" v-html="'+' + showAmount(f['AdOption'].cpc, false, true, false, false)")
            i.mdi.mdi-information.m-l-4
        .feed-tags.m-b-15(v-if="f['Tags'] && f['Tags'].length && (!manipulativePage())")
          <router-link @click.native = "closeAllModals()" class="m-r-5 label-default" v-for="tag in f['Tags']" :key="tag.name" :to="getTagLink(tag.name)" :title="getTagTooltip(tag.name)">
            | &#x23;{{tag.name}}
          </router-link>
        .like-comm.f-s-16(:class="{'m-t-15': !userFeed}" v-if="!preview && (!f['Question'] || !manipulativePage() || !f['CommentsCount'] || !f['defaultComment'])")
          a.link.m-r-10.f-s-16(v-if="isQuestion(f)" href='javascript:void(0)' @click="toggleComments(f)") {{f['CommentsCount'] > 0? f['CommentsCount']: ''}} {{f['type']=='question' ? 'Answer': 'Comment'}}{{f['CommentsCount'] > 1 ? "s": ''}}
          <like :likesCount="parseInt(f['LikesCount'])" :hasLiked="!!f['HasLiked']" :postId="f['id']"></like>
          span.pointer.reactions-count-wrap.pointer.f-s-17(v-if="!isQuestion(f)" title="Comments or Reactions" @click="toggleComments(f)")
            i.mdi.mdi-comment-outline.m-r-5
            span.m-r-5
              | {{ (f['ReactionsCount'] ? f['ReactionsCount']: '') }}
          .btn-group
            button.btn.btn-xs.btn-secondary.dropdown-toggle.no-border-shadow.bg-none.f-s-16(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='true' title="More Options")
             i.fa.fa-list
            .dropdown-menu
              <template v-if="f.UserId===currentUser.id || isAdmin()">
              a.dropdown-item(href='javascript:void(0)' v-if="isAd(f)" @click="showAdStats(f)")
                i.mdi.mdi-chart-areaspline.m-r-5
                | See Ad Stats
              a.dropdown-item(href='javascript:void(0)' @click="editPost(f)")
                i.mdi.mdi-grease-pencil.m-r-5
                | Edit
              a.dropdown-item(href='javascript:void(0)' @click="deletePost(f, k)")
                i.mdi.mdi-delete.m-r-5
                | Delete
              </template>
              a.dropdown-item(href='javascript:void(0)' @click="triggerSharing(f)")
                i.mdi.mdi-share.m-r-5
                | Share
          .pull-right.text-muted.show-on-mobile
            <timeago v-if="!manipulatePostDescriptionText(f)" :datetime="f['createdAt']" :auto-update="60" :title="f['createdAt'] | date"></timeago>
            <timeago v-if="manipulatePostDescriptionText(f)" :datetime="f['updatedAt']" :auto-update="60" :title="f['updatedAt'] | date"></timeago>
    <comments :triggerPopupView = "triggerPopupView" @CommentVideoPlayed = "CommentVideoPlayed" :defaultComments = getDefaultComments(f) :autoReplay="autoReplay" :userFeed="userFeed" :postObj="f" :profileUserId ="profileUserId" :feedPage="feedPage" @CommentsCountUpdated = "updateCommentsCount" :commentType="f['type']" :postId="f['id']" v-if="f['showComments']" :class="{'question-on-user-feed': manipulativePage() && f['Question'], 'question-has-answers': manipulativePage() && f['Question'] && f['CommentsCount']}" @closeModal="leavePage"></comments>
    hr(v-if="!userFeed")
  <ad-stats ref="adStatsComponent"/>
  <social-share ref="socialShareComp" />
  <edit-post ref="editPostComponent" @PostUpdated="updatePost"/>
  <reaction ref="reactionComponent" @ReactionCountUpdated="updateReactionsCount"/>
</template>
<script>
import mixin from '../../globals/mixin.js'
import AdMixin from './ad-mixin.js'
import Comments from './comments'
import AdStats from './ad-stats'
import ImageGrid from './image-grid'
import Like from './like'
import SearchField from '../search-field'
import auth from '@/auth/helpers'
import Service from './service'
import FeedVideoPlayer from './feed-video-player'
import EditPost from './edit'
import SocialShare from '../../components/social-share'
import Reaction from './reaction'

export default {
  name: 'Feed',
  service: new Service(),
  components: {
    Comments,
    Like,
    ImageGrid,
    SearchField,
    FeedVideoPlayer,
    AdStats,
    EditPost,
    SocialShare,
    Reaction
  },
  mixins: [mixin, AdMixin],
  props: {
    config: {
      type: Object,
      default () {
        return {
          colWidth: 6
        }
      }
    },
    feed: {
      type: Array,
      required: true
    },
    autoReplay: {
      type: Boolean,
      default () {
        return false
      }
    },
    triggerPopupView: {
      type: Boolean,
      default () {
        return false
      }
    },
    useDefaultComment: {
      type: Boolean,
      default () {
        return false
      }
    },
    preview: {
      type: Boolean,
      default () {
        return false
      }
    },
    userFeed: {
      type: Boolean,
      default () {
        return false
      }
    },
    feedPage: {
      type: String,
      default () {
        return 'userFeed'
      }
    },
    profileUserId: {
      type: String,
      default () {
        return ''
      }
    },
    customClasses: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      feedArr: [],
      initialized: false,
      currentUser: auth.getUser(),
      descriptionExcerptCharsCount: 28
      /* postVisibilityConfig: {
        throttle: 1000,
        intersection: {
          threshold: 0.5
        }
      } */
    }
  },
  watch: {
    feed (feed) {
      this.feedArr = this.filterDuplicatePosts(feed)
    }
  },
  mounted () {
    if (this.feed.length) {
      this.feedArr = this.filterDuplicatePosts(this.feed)
    } else {
      this.initialized = true
    }
  },
  methods: {
    updateReactionsCount (obj) {
      let getFeedItem = (fId) => {
        for (let i in this.feed) {
          if (this.feed[i].id === fId) {
            return this.feed[i]
          }
        }
      }
      let f = getFeedItem(obj.obj.id)
      let c = f.ReactionsCount ? parseInt(f.ReactionsCount) : 0
      if (obj.action === 'add') {
        f.ReactionsCount = c ? ++c : 1
      } else {
        if (c > 0) {
          f.ReactionsCount = --c
        }
      }
    },
    adConsumedCallback (post, action) {
      for (let i in this.feed) {
        if (this.feed[i].id === post.id && this.feed[i].AdOptionId) {
          this.$set(this.feed[i], action, true)
          this.$emit('adConsumed', {
            postObj: post,
            action: action
          })
          break
        }
      }
    },
    feedVideoPlayed (f) {
      this.$emit('FeedVideoPlayed', f)
    },
    triggerSharing (f) {
      this.$refs.socialShareComp.triggerPopup(f)
    },
    CommentVideoPlayed (obj) {
      this.$emit('VideoPlayed', obj)
    },
    postVideoPlayed (f) {
      this.$emit('VideoPlayed', {
        postId: f.id
      })
    },
    showFullDescription (f) {
      if (typeof f.enableFullDescription === 'undefined') {
        this.$set(f, 'enableFullDescription', false)
      }
      f.enableFullDescription = !f.enableFullDescription
    },
    isQuestion (f) {
      return f.type === 'question'
    },
    getDefaultComments (f) {
      return this.useDefaultComment && this.isQuestion(f) ? [this.getLastComment(f)] : []
    },
    getPostUser (f) {
      if (this.isQuestion(f) && this.manipulatePostDescriptionText(f)) {
        let comment = this.getLastComment(f)
        if (comment) {
          return comment.User
        }
      }
      return f.User
    },
    descriptionExcerpt (text) {
      return text.substring(0, this.descriptionExcerptCharsCount) + '...'
    },
    showAdStats (postObj) {
      this.$refs.adStatsComponent.triggerPopup(postObj.id)
    },
    disableEnableCommentsByDefault (feed) {
      for (let i in feed) {
        if (this.feedPage === 'profile' && feed[i] && !feed[i].defaultComment) {
          feed[i].showComments = false
        }
        if (this.manipulativePage() && feed[i] && feed[i].defaultComment && feed[i].Question && feed[i].CommentsCount) {
          feed[i].showComments = true
        }
      }
      return feed
    },
    /*
    * Due to an unresolved issue
    * on the server side sequalize pagination query,
    * sometimes server sends duplicate records in
    * subsequent pagination pages.
    * For the time being, we are just filtering the
    * duplicate posts and keeping the duplicate posts
    * from being displayed by removing the duplicate
    * post object from Feed array
    */
    filterDuplicatePosts (feed) {
      // first, enable or disable comments in post by default
      feed = this.disableEnableCommentsByDefault(feed)
      let duplicates = []
      this.initialized = true
      /*
      * Traverse the array from the bottom
      * so that new duplicate record is
      * not added to the feed array
      */
      for (let i = (feed.length - 1); i >= 0; i--) {
        if (feed[i] && duplicates.indexOf(feed[i].id) === -1) {
          duplicates.push(feed[i].id)
        } else {
          feed.splice(i, 1)
        }
      }
      return this.sortTheTopPosts(this.feed)
    },
    toggleComments (feedItem) {
      // return !feedItem['showComments']
      if (this.isQuestion(feedItem)) {
        feedItem['showComments'] = !feedItem['showComments']
      } else {
        this.$refs.reactionComponent.trigger(feedItem, 'post')
      }
    },
    sortByDate (feed) {
      /*
      * Sort posts by updatedAt timestamp if
      * user has enabled RecentActivities filter
      */
      /* if (this.currentUser.recentActivitiesEnabled) {
        feed.sort(function (a, b) {
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        })
      } */
      return feed
    },
    recentActivity (f) {
      return !this.preview && f['updatedAt'] !== f['createdAt']
    },
    sortTheTopPosts (feed) {
      let top = []
      let final = []
      for (let i in feed) {
        if ('PushToTop' in feed[i]) {
          top.push(feed[i])
        } else {
          final.push(feed[i])
        }
      }
      if (top.length) {
        for (let i in top) {
          final.unshift(top[i])
        }
      }
      return final
    },
    isVideoComment (f) {
      let c = this.getLastComment(f)
      return c ? c.videoPath : false
    },
    getRecentActivityText (f) {
      if (f.type === 'text') {
        return ' Recent activity on the status update of '
      } else if (this.isQuestion(f)) {
        let action = this.isVideoComment(f) ? 'left' : 'wrote'
        return ' ' + action + ' an answer on '
      } else {
        return ' Recent activity on the ' + f.type + ' that '
      }
    },
    getPostDescriptionText (f) {
      if (this.isQuestion(f) && this.manipulatePostDescriptionText(f)) {
        return ''
      }
      switch (f.type) {
        case 'text':
          return ''
        case 'question':
          return 'asked ' + (this.manipulatePostDescriptionText(f) ? '' : 'a question')
        case 'video':
          return 'uploaded ' + (this.manipulatePostDescriptionText(f) ? '' : 'a video')
        default:
          return ''
      }
    },
    manipulatePostDescriptionText (f) {
      return this.currentUser.recentActivitiesEnabled && this.manipulativePage() && this.recentActivity(f) && f.defaultComment
    },
    manipulativePage () {
      return this.userFeed || (this.feedPage && this.feedPage === 'profile')
    },
    editPost (f) {
      this.$refs.editPostComponent.trigger(f)
    },
    deletePost (f, n) {
      if (confirm('Are you sure you want to delete this post?')) {
        this.deletePostFromFeedArray(f)
        this.$options.service.deletePost(f.id)
          .then((data) => {})
          .catch((pErr) => {
            // restore the post
            this.feed.splice(n, 0, f)
            this.showNotification('Something went wrong while trying to delete your post', 'error')
          })
      }
    },
    deletePostFromFeedArray (f) {
      for (let i in this.feed) {
        if (this.feed[i].id === f.id) {
          this.feed.splice(i, 1)
        }
      }
    },
    getTagTooltip (text) {
      return 'Tagged with ' + text
    },
    postVisibilityChanged (isVisible, entry, postObj) {
      if (isVisible && this.triggerAdActions()) {
        this.triggerAdConsumption(postObj, 'impression')
      }
    },
    adLinkclicked (postObj, event) {
      if (confirm('This link will open in a different browser tab, so please come back to this ' + this.siteName + ' tab afterwards.')) {
        if (this.triggerAdActions()) {
          this.triggerAdConsumption(postObj, 'click')
        }
      } else {
        event.preventDefault()
      }
    },
    updateUserTotal (amountToAdd) {
      let totalRevenue = auth.getLocalRevenue()
      amountToAdd = parseFloat(amountToAdd)
      totalRevenue = totalRevenue ? (parseFloat(totalRevenue) + amountToAdd) : amountToAdd
      auth.saveLocalRevenue(totalRevenue)
    },
    /*
    * this method ensures that Ad video
    * can not be forwarded manually by user
    */
    onPlayerReady (obj) {
      let player = obj.event
      let postObj = obj.postObj
      let that = this
      if (this.triggerAdActions && this.isAd(postObj) && this.enableAdOption(postObj, 'view') && !this.adConsumed(postObj, 'view')) {
        // Set initial time to 0
        let currentTime = 0

        player.on('seeking', function (e) {
          if (currentTime < player.currentTime()) {
            player.currentTime(currentTime)
          }
        })

        player.on('seeked', function (e) {
          if (currentTime < player.currentTime()) {
            player.currentTime(currentTime)
            that.showNotification('Ad video can not be forwarded manually.', 'error')
          }
        })

        let int = setInterval(function () {
          try {
            if (!player.paused()) {
              currentTime = player.currentTime()
            }
          } catch (e) {
            clearInterval(int)
          }
        }, 1000)
      }
    },
    onPlayerEnded (obj) {
      let postObj = obj.postObj
      if (this.triggerAdActions()) {
        this.triggerAdConsumption(postObj, 'view')
      }
    },
    updateCommentsCount (data) {
      for (let i in this.feed) {
        if (this.feed[i].id === data.postId) {
          this.$set(this.feed[i], 'CommentsCount', data.count)
          // this.feed[i].CommentsCount = data.count
        }
      }
    },
    emptyFeed () {
      return this.initialized && !this.feedArr.length
    },
    updatePost (postObj) {
      for (let i in this.feed) {
        if (this.feed[i].id === postObj.id) {
          this.feed[i] = postObj
          // Object.assign({}, this.feed[i], postObj)
          this.$set(this.feed, i, postObj)
        }
      }
    },
    recentActivityText (pType) {
      return 'This icon indicates that there has been a new activity on this ' + pType + '. Someone has recently uploaded a new video response ' + (pType === 'question' ? 'or written an answer' : '') + ' on this ' + pType + '. You can disable posts with recent activity using the filter on the top of your dashboard page.'
    }
    /* getPostVisibilityConfig (postObj) {
      let config = this.postVisibilityConfig
      config.callback = (isVisible, entry) => this.postVisibilityChanged(isVisible, entry, postObj)
      return config
    } */
  }
}
</script>
