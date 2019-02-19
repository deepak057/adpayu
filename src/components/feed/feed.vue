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
  .sl-item.feed-block(v-for="f in feedArr" :class="{'ribbon-wrapper': f['AdOption']}" v-show="f['show']" v-observe-visibility="{throttle: 1000, intersection: { threshold: 0.5}, callback: (isVisible, entry) => postVisibilityChanged(isVisible, entry, f) }")
    .ribbon.ribbon-bookmark.ribbon-warning.f-w-400.cursor-hand(:class="{'bg-999': adConsumed(f, 'impression')}" v-if="f['AdOption']" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getText(f, 'impression')") Sponsored + $ {{f['AdOption'].cpi}}
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
            <my-video :sources="getVideoSurces(f['Video'].path)"></my-video>
          .col-lg-6.col-md-6
            span.badge.badge-warning.ml-auto.f-w-400.pr-t--2.f-s-12.cursor-hand(:class="{'bg-999': adConsumed(f, 'view')}" v-if="f['AdOption'] && f['AdOption'].viewTarget && enableAdConsumptionOption(f, 'view')" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getText(f, 'view')") + $ {{f['AdOption'].cpv}}
              i.mdi.mdi-information.m-l-4.cursor-hand
        .row(v-if="f['Images'].length")
          <image-grid :images="f['Images']"></image-grid>
        p(v-if="f['AdOption'] && f['AdOption'].clickTarget")
          a.m-r-5(:href="f['AdOption'].adLink" target="_blank" @click="adLinkclicked(f)") {{f['AdOption'].adLinkLabel}}
          span.badge.badge-warning.ml-auto.f-w-400.pr-t--2.f-s-12.cursor-hand(v-if="enableAdConsumptionOption(f, 'click')" :class="{'bg-999': adConsumed(f, 'click')}" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getText(f, 'click')") + $ {{f['AdOption'].cpc}}
            i.mdi.mdi-information.m-l-4
        p.feed-tags(v-if="f['Tags']")
          <router-link class="m-r-5 label-default" v-for="tag in f['Tags']" :key="tag.name" :to="getTagLink(tag.name)" :title="getTagTooltip(tag.name)">
            | &#x23;{{tag.name}}
          </router-link>
        .like-comm(v-show="!preview")
          a.link.m-r-10(href='javascript:void(0)' @click="toggleComments(f)") {{f['Comments'].length > 0? f['Comments'].length: ''}} {{f['type']=='question' ? 'Answer': 'Comment'}}{{f['Comments'].length>1 ? "s": ''}}
          <like :likes= "f['Likes']" :postId="f['id']"></like>
    <comments :comments="f['Comments']" :commentType="f['type']" :postId="f['id']" v-show="f['showComments']" @closeModal="leavePage"></comments>
    hr
</template>
<script>
import mixin from '../../globals/mixin.js'
import AdMixin from './ad-mixin.js'
import myVideo from 'vue-video'
import Comments from './comments'
import ImageGrid from './image-grid'
import Like from './like'
import SearchField from '../search-field'
import auth from '@/auth/helpers'
import Service from './service'

export default {
  name: 'Feed',
  service: new Service(),
  components: {
    myVideo,
    Comments,
    Like,
    ImageGrid,
    SearchField
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
    getTagTooltip (text) {
      return 'Tagged with ' + text
    },
    getVideoSurces (path) {
      let that = this
      return [
        {
          src: that.getMedia(path)
        }
      ]
    },
    postVisibilityChanged (isVisible, entry, postObj) {
      if (!this.preview && isVisible && this.currentUser.id !== parseInt(postObj.UserId) && postObj.AdOption) {
        this.consumeAd(postObj, 'impression')
      }
    }
    /* getPostVisibilityConfig (postObj) {
      let config = this.postVisibilityConfig
      config.callback = (isVisible, entry) => this.postVisibilityChanged(isVisible, entry, postObj)
      return config
    } */
  }
}
</script>
