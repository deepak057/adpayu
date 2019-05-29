<template lang="pug">
.profiletimeline(:class="{'m-0': emptyFeed()}")
  .nothing-to-show(v-if="emptyFeed()")
    .jumbotron.white-back.text-center
      h1.display-3 Nothing Here!
      p.lead
        | There are no feed here
      hr.my-4
      p
        | You will see stuff here soon. You may browse more tags or topics
        <router-link to="/tags">
          |  here
        </router-link>
        | .
      .row.content-center
        <search-field :searchType="'content'" :placeholder="'Or search video, questions, users, tags...'"></search-field>
  .sl-item.feed-block(v-for="(f, k) in feedArr" :class="{'ribbon-wrapper ad-post': f['AdOption']}" v-show="f['show']" v-observe-visibility="{throttle: 1000, intersection: { threshold: 0.5}, callback: (isVisible, entry) => postVisibilityChanged(isVisible, entry, f) }")
    .ribbon.ribbon-bookmark.ribbon-warning.f-w-400.cursor-hand(:class="{'bg-999': !preview && adConsumed(f, 'impression')}" v-if="f['AdOption']" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getText(f, 'impression')") Sponsored + $ {{f['AdOption'].cpi}}
       i.mdi.mdi-information.m-l-5.cursor-hand
    .sl-left
      <router-link @click.native = "closeAllModals()" :to="userProfileLink(f.User.id)">
        img.img-circle(:src='getMedia(f.User.pic)', alt='user')
      </router-link>
    .sl-right
      div
        span.post-description-text-wrap
          span.m-r-5(v-if="manipulatePostDescriptionText(f)")
            | {{getRecentActivityText(f)}}
          <router-link @click.native = "closeAllModals()" :to="userProfileLink(f.User.id)">
            | {{userName(f.User)}}
          </router-link>
          |  {{getPostDescriptionText(f)}}
          span.sl-date
            <timeago v-if="!manipulatePostDescriptionText(f)" :datetime="f['createdAt']" :auto-update="60" class="m-l-5" :title="f['createdAt'] | date"></timeago>
            <timeago v-if="manipulatePostDescriptionText(f)" :datetime="f['updatedAt']" :auto-update="60" class="m-l-5" :title="f['updatedAt'] | date"></timeago>
            i.mdi.mdi-earth.m-l-5(title="Public, everyone can see it" v-if="f['public'] && !f['AdOption']")
            i.mdi.mdi-lock.m-l-5(title="Only friends can see it" v-if="!f['public'] && !f['AdOption']")
            i.mdi.mdi-earth-off.m-l-5(title="Sponsored, visible to target audience" v-if="f['AdOption']")
        .m-t-10.m-b-1rem.w-s-pre.custom-status-update-wrap(v-if="f['content']" v-html="f['content']")
        div.m-t-10(v-if="f['Question']")
          h3.font-bold
            a.font-dark(href="javascript:void(0)" v-if="preview")
              | {{f['Question'].question | capitalize}}
            <router-link @click.native = "closeAllModals()" :to="getPostLink(f.id)" class="font-dark" v-if="!preview">
              | {{f['Question'].question | capitalize}}
            </router-link>
            i.mdi.mdi-clock.m-l-5.f-s-12.post-recent-activity-icon.cursor-hand(v-if="manipulatePostDescriptionText(f)" data-container="body" title="Recent Activity" data-toggle="popover" data-placement="right" :data-content='recentActivityText("question")')
          p.text-muted {{f['Question'].description}}
        div.m-t-10(v-if="f['Video']")
          h3.font-bold
            a.font-dark(href="javascript:void(0)" v-if="preview")
              | {{f['Video'].title | capitalize}}
            <router-link @click.native = "closeAllModals()" :to="getPostLink(f.id)" class="font-dark" v-if="!preview">
              | {{f['Video'].title | capitalize}}
            </router-link>
            i.mdi.mdi-clock.m-l-5.f-s-12.post-recent-activity-icon.cursor-hand(v-if="manipulatePostDescriptionText(f)" data-container="body" title="Recent Activity" data-toggle="popover" data-placement="right" :data-content='recentActivityText("video")')
          p.text-muted {{f['Video'].description}}
        .row.m-0.feed-video-wrap(v-if="!isEmptyObject(f['Video'])")
          .col-lg-6.col-md-8.video-container.p-b-0
            <feed-video-player :feed = "f" @ready="onPlayerReady" @ended="onPlayerEnded"/>
          .col-lg-6.col-md-4.col-sm-12.p-0(v-if="enableAdOption(f, 'view')")
            span.hidden-sm-down.m-l-10
            span.badge.badge-warning.ml-auto.f-w-400.pr-t--2.f-s-12.cursor-hand(:class="{'bg-999': !preview && adConsumed(f, 'view')}" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getText(f, 'view')") + $ {{f['AdOption'].cpv}}
              i.mdi.mdi-information.m-l-4.cursor-hand
        .row(v-if="f['Images'].length")
          <image-grid :images="f['Images']"></image-grid>
        .m-t-15.m-b-20(v-if="f['AdOption'] && f['AdOption'].clickTarget")
          a.m-r-5(:href="getLink(f['AdOption'].adLink)" target="_blank" @click="adLinkclicked(f)") {{f['AdOption'].adLinkLabel}}
          span.badge.badge-warning.ml-auto.f-w-400.pr-t--2.f-s-12.cursor-hand(v-if="enableAdOption(f, 'click')" :class="{'bg-999': !preview && adConsumed(f, 'click')}" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getText(f, 'click')") + $ {{f['AdOption'].cpc}}
            i.mdi.mdi-information.m-l-4
        .feed-tags.m-b-15(v-if="f['Tags'] && f['Tags'].length && (!userFeed || !f['Question'])")
          <router-link @click.native = "closeAllModals()" class="m-r-5 label-default" v-for="tag in f['Tags']" :key="tag.name" :to="getTagLink(tag.name)" :title="getTagTooltip(tag.name)">
            | &#x23;{{tag.name}}
          </router-link>
        .like-comm(:class="{'m-t-15': !userFeed}" v-if="!preview && (!f['Question'] || !userFeed || !f['CommentsCount'])")
          a.link.m-r-10(href='javascript:void(0)' @click="toggleComments(f)") {{f['CommentsCount'] > 0? f['CommentsCount']: ''}} {{f['type']=='question' ? 'Answer': 'Comment'}}{{f['CommentsCount'] > 1 ? "s": ''}}
          <like :likes= "f['Likes']" :postId="f['id']"></like>
          .btn-group(v-if="f.UserId===currentUser.id")
            button.btn.btn-xs.btn-secondary.dropdown-toggle.no-border-shadow(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='true' title="More Options")
             i.fa.fa-list
            .dropdown-menu
              a.dropdown-item(href='javascript:void(0)' v-if="isAd(f)" @click="showAdStats(f)")
                i.mdi.mdi-chart-areaspline.m-r-5
                | See Ad Stats
              a.dropdown-item(href='javascript:void(0)' @click="editPost(f)")
                i.mdi.mdi-grease-pencil.m-r-5
                | Edit
              a.dropdown-item(href='javascript:void(0)' @click="deletePost(f, k)")
                i.mdi.mdi-delete.m-r-5
                | Delete
    <comments :userFeed="userFeed" @CommentsCountUpdated = "updateCommentsCount" :commentType="f['type']" :postId="f['id']" v-if="f['showComments']" :class="{'question-on-user-feed': userFeed && f['Question'], 'question-has-answers': userFeed && f['Question'] && f['CommentsCount']}" @closeModal="leavePage"></comments>
    hr
  <ad-stats ref="adStatsComponent"/>
  <edit-post ref="editPostComponent" @PostUpdated="updatePost"/>
</template>
<script>
import mixin from '../../globals/mixin.js'
import AdMixin from './ad-mixin.js'
import myVideo from 'vue-video'
import Comments from './comments'
import AdStats from './ad-stats'
import ImageGrid from './image-grid'
import Like from './like'
import SearchField from '../search-field'
import auth from '@/auth/helpers'
import Service from './service'
import FeedVideoPlayer from './feed-video-player'
import EditPost from './edit'

export default {
  name: 'Feed',
  service: new Service(),
  components: {
    myVideo,
    Comments,
    Like,
    ImageGrid,
    SearchField,
    FeedVideoPlayer,
    AdStats,
    EditPost
  },
  mixins: [mixin, AdMixin],
  props: {
    feed: {
      type: Array,
      required: true
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
    }
  },
  data () {
    return {
      feedArr: [],
      initialized: false,
      currentUser: auth.getUser()
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
    showAdStats (postObj) {
      this.$refs.adStatsComponent.triggerPopup(postObj.id)
    },
    disableEnableCommentsByDefault (feed) {
      for (let i in feed) {
        if (this.userFeed && feed[i].Question && feed[i].CommentsCount) {
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
      let obj = {}
      this.initialized = true
      /*
      * Traverse the array from the bottom
      * so that new duplicate record is
      * not added to the feed array
      */
      for (let i = (feed.length - 1); i >= 0; i--) {
        obj[feed[i]['id']] = feed[i]
      }
      feed = []
      for (let key in obj) {
        feed.push(obj[key])
      }
      return this.sortTheTopPosts(this.sortByDate(feed.reverse()))
    },
    toggleComments (feedItem) {
      // return !feedItem['showComments']
      feedItem['showComments'] = !feedItem['showComments']
    },
    sortByDate (feed) {
      /*
      * Sort posts by updatedAt timestamp if
      * user has enabled RecentActivities filter
      */
      if (this.currentUser.recentActivitiesEnabled) {
        feed.sort(function (a, b) {
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        })
      }
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
    getRecentActivityText (f) {
      if (f.type === 'text') {
        return 'Recent activity on the status update of '
      } else {
        return 'Recent activity on the ' + f.type + ' that'
      }
    },
    getPostDescriptionText (f) {
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
      return this.currentUser.recentActivitiesEnabled && this.userFeed && this.recentActivity(f)
    },
    editPost (f) {
      this.$refs.editPostComponent.trigger(f)
    },
    deletePost (f, n) {
      if (confirm('Are you sure you want to delete this post?')) {
        this.feed.splice(n, 1)
        this.$options.service.deletePost(f.id)
          .then((data) => {})
          .catch((pErr) => {
            // restore the post
            this.feed.splice(n, 0, f)
            this.showNotification('Something went wrong while trying to delete your post', 'error')
          })
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
    adLinkclicked (postObj) {
      if (this.triggerAdActions()) {
        this.triggerAdConsumption(postObj, 'click')
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
          this.feed[i].CommentsCount = data.count
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
