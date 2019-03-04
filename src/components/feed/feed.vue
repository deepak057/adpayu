<template lang="pug">
.profiletimeline
  .nothing-to-show(v-if="initialized && !feedArr.length")
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
      <router-link @click.native = "leavePage()" :to="userProfileLink(f.User.id)">
        img.img-circle(:src='getMedia(f.User.pic)', alt='user')
      </router-link>
    .sl-right
      div
        <router-link @click.native = "leavePage()" :to="userProfileLink(f.User.id)">
          | {{userName(f.User)}}
        </router-link>
        |  {{getPostDescriptionText(f)}}
        span.sl-date
          <timeago :datetime="f['createdAt']" :auto-update="60" class="m-l-5" :title="f['createdAt'] | date"></timeago>
          i.mdi.mdi-earth.m-l-5(title="Public, everyone can see it" v-if="f['public'] && !f['AdOption']")
          i.mdi.mdi-lock.m-l-5(title="Only friends can see it" v-if="!f['public'] && !f['AdOption']")
          i.mdi.mdi-earth-off.m-l-5(title="Sponsored, visible to target audience" v-if="f['AdOption']")
        p.m-t-10(v-if="f['content']") {{f['content']}}
        div.m-t-10(v-if="f['Question']")
          h3.font-bold
            a.font-dark(href="javascript:void(0)" v-if="preview")
              | {{f['Question'].question}}
            <router-link @click.native = "leavePage()" :to="getPostLink(f.id)" class="font-dark" v-if="!preview">
              | {{f['Question'].question}}
            </router-link>
          p.text-muted {{f['Question'].description}}
        div.m-t-10(v-if="f['Video']")
          h3.font-bold
            a.font-dark(href="javascript:void(0)" v-if="preview")
              | {{f['Video'].title}}
            <router-link @click.native = "leavePage()" :to="getPostLink(f.id)" class="font-dark" v-if="!preview">
              | {{f['Video'].title}}
            </router-link>
          p.text-muted {{f['Video'].description}}
        .row.m-0.feed-video-wrap(v-if="!isEmptyObject(f['Video'])")
          .col-lg-6.col-md-6.video-container
            <video-player class="vjs-3-4" :options="getVideoPlayerOptions(f)" :playsinline="true" @ready="onPlayerReady($event, f) " @ended="onPlayerEnded($event, f) " data-setup="{fluid: true}"/>
            // <my-video :sources="getVideoSurces(f['Video'].path)"></my-video>
          .col-lg-6.col-md-6
            span.badge.badge-warning.ml-auto.f-w-400.pr-t--2.f-s-12.cursor-hand(:class="{'bg-999': !preview && adConsumed(f, 'view')}" v-if="enableAdOption(f, 'view')" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getText(f, 'view')") + $ {{f['AdOption'].cpv}}
              i.mdi.mdi-information.m-l-4.cursor-hand
        .row(v-if="f['Images'].length")
          <image-grid :images="f['Images']"></image-grid>
        p(v-if="f['AdOption'] && f['AdOption'].clickTarget")
          a.m-r-5(:href="getLink(f['AdOption'].adLink)" target="_blank" @click="adLinkclicked(f)") {{f['AdOption'].adLinkLabel}}
          span.badge.badge-warning.ml-auto.f-w-400.pr-t--2.f-s-12.cursor-hand(v-if="enableAdOption(f, 'click')" :class="{'bg-999': !preview && adConsumed(f, 'click')}" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getText(f, 'click')") + $ {{f['AdOption'].cpc}}
            i.mdi.mdi-information.m-l-4
        p.feed-tags(v-if="f['Tags']")
          <router-link class="m-r-5 label-default" v-for="tag in f['Tags']" :key="tag.name" :to="getTagLink(tag.name)" :title="getTagTooltip(tag.name)">
            | &#x23;{{tag.name}}
          </router-link>
        .like-comm(v-show="!preview")
          a.link.m-r-10(href='javascript:void(0)' @click="toggleComments(f)") {{f['Comments'].length > 0? f['Comments'].length: ''}} {{f['type']=='question' ? 'Answer': 'Comment'}}{{f['Comments'].length>1 ? "s": ''}}
          <like :likes= "f['Likes']" :postId="f['id']"></like>
          .btn-group(v-if="f.UserId===currentUser.id")
            button.btn.btn-xs.btn-secondary.dropdown-toggle.no-border-shadow(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='true' title="More Options")
             i.fa.fa-list
            .dropdown-menu
              a.dropdown-item(href='javascript:void(0)' v-if="isAd(f)" @click="showAdStats(f)")
                i.mdi.mdi-chart-areaspline.m-r-5
                | See Ad Stats
              a.dropdown-item(href='javascript:void(0)' @click="deletePost(f, k)")
                i.mdi.mdi-delete.m-r-5
                | Delete
    <comments :comments="f['Comments']" :commentType="f['type']" :postId="f['id']" v-show="f['showComments']" @closeModal="leavePage"></comments>
    hr
  <ad-stats ref="adStatsComponent"/>
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
// require styles
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'Feed',
  service: new Service(),
  components: {
    myVideo,
    Comments,
    Like,
    ImageGrid,
    SearchField,
    videoPlayer,
    AdStats
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
      let obj = {}
      this.initialized = true

      for (let i = 0, len = feed.length; i < len; i++) {
        obj[feed[i]['id']] = feed[i]
      }
      feed = []
      for (let key in obj) {
        feed.push(obj[key])
      }
      return feed.reverse()
    },
    toggleComments (feedItem) {
      feedItem['showComments'] = !feedItem['showComments']
    },
    getPostDescriptionText (f) {
      switch (f.type) {
        case 'text':
          return ''
        case 'question':
          return 'asked a question'
        case 'video':
          return 'uploaded a video'
        default:
          return ''
      }
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
    getVideoPlayerOptions (postObj) {
      return this.videoPlayerOptions(postObj.Video.path)
    },
    enableAdOption (postObj, action) {
      if (postObj.AdOption && this.hasTarget(postObj, action)) {
        if (this.preview) {
          return true
        } else {
          return this.enableAdConsumptionOption(postObj, action)
        }
      } else {
        return false
      }
    },
    hasTarget (postObj, action) {
      if (action === 'click') {
        return postObj.AdOption.clickTarget
      } else if (action === 'view') {
        return postObj.AdOption.viewTarget
      } else {
        return postObj.AdOption.impressionTarget
      }
    },
    triggerAdActions () {
      return !this.preview
    },
    postVisibilityChanged (isVisible, entry, postObj) {
      if (isVisible && this.triggerAdActions()) {
        this.triggerAdConsumption(postObj, 'impression')
      }
    },
    onPlayerEnded (e, postObj) {
      if (this.triggerAdActions()) {
        this.triggerAdConsumption(postObj, 'view')
      }
    },
    adLinkclicked (postObj) {
      if (this.triggerAdActions()) {
        this.triggerAdConsumption(postObj, 'click')
      }
    },
    /*
    * this method ensures that Ad video
    * can not be forwarded manually by user
    */
    onPlayerReady (player, postObj) {
      let that = this
      if (this.isAd(postObj) && this.enableAdOption(postObj, 'view') && !this.adConsumed(postObj, 'view')) {
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
    updateUserTotal (amountToAdd) {
      let totalRevenue = auth.getLocalRevenue()
      amountToAdd = parseFloat(amountToAdd)
      totalRevenue = totalRevenue ? (parseFloat(totalRevenue) + amountToAdd) : amountToAdd
      auth.saveLocalRevenue(totalRevenue)
    }
    /* getPostVisibilityConfig (postObj) {
      let config = this.postVisibilityConfig
      config.callback = (isVisible, entry) => this.postVisibilityChanged(isVisible, entry, postObj)
      return config
    } */
  }
}
</script>
