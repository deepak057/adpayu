<template lang="pug">
.profiletimeline
  .nothing-to-show(v-if="!feed.length")
    .jumbotron.white-back.text-center
      h1.display-3 Nothing Here!
      p.lead
        | There are no feed under this tag
      hr.my-4
      p
        | You will see stuff here soon. For now, switch to a different Tag.
  .sl-item.feed-block(v-for="f in feed" :class="f['AdOption']? 'ribbon-wrapper': '' " v-show="f['show']")
    .ribbon.ribbon-bookmark.ribbon-warning.f-w-400.cursor-hand(v-if="f['AdOption']" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getCPVText(f['AdOption'].cpv)") Sponsored + $ {{f['AdOption'].cpv}}
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
        p.m-t-10(v-if="f['content']") {{f['content']}}
        div.m-t-10(v-if="f['Question']")
          h3.font-bold
            <router-link @click.native = "leavePage()" :to="getPostLink(f.id)" class="font-dark">
              | {{f['Question'].question}}
            </router-link>
          p.text-muted {{f['Question'].description}}
        div.m-t-10(v-if="f['Video']")
          h3.font-bold
            <router-link @click.native = "leavePage()" :to="getPostLink(f.id)" class="font-dark">
              | {{f['Video'].title}}
            </router-link>
          p.text-muted {{f['Video'].description}}
        .row.m-0.feed-video-wrap(v-if="f['Video']")
          .col-lg-6.col-md-6.video-container
            <my-video :sources="getVideoSurces(f['Video'].path)"></my-video>
          .col-lg-6.col-md-6
            span.badge.badge-info.ml-auto.f-w-400.pr-t--2.f-s-12.bg-999.cursor-hand(v-if="f['AdOption'] && f['AdOption'].cpc" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getCPVVText(f['AdOption'].cpc)") + $ {{f['AdOption'].cpc}}
              i.mdi.mdi-information.m-l-4.cursor-hand
        .row(v-if="f['Images'].length")
          <image-grid :images="f['Images']"></image-grid>
        p(v-if="f['AdOption'] && f['AdOption'].cpc")
          a.m-r-5(href="#") Get The Product Now
          span.badge.badge-info.ml-auto.f-w-400.pr-t--2.f-s-12.bg-999.cursor-hand(data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getCPCText(f['AdOption'].cpc)") + $ {{f['AdOption'].cpc}}
            i.mdi.mdi-information.m-l-4
        p.feed-tags(v-if="f['Tags']")
          <router-link class="m-r-5 label-default" v-for="tag in f['Tags']" :to="getTagLink(tag.name)" :title="getTagTooltip(tag.name)">
            | &#x23;{{tag.name}}
          </router-link>
        .like-comm
          a.link.m-r-10(href='javascript:void(0)' @click="toggleComments(f)") {{f['Comments'].length > 0? f['Comments'].length: ''}} {{f['type']=='question' ? 'Answer': 'Comment'}}{{f['Comments'].length>1 ? "s": ''}}
          <like :likes= "f['Likes']" :postId="f['id']"></like>
    <comments :comments="f['Comments']" :commentType="f['type']" :postId="f['id']" v-show="f['showComments']" @closeModal="leavePage"></comments>
    hr
</template>
<script>
import mixin from '../../globals/mixin.js'
import myVideo from 'vue-video'
import Comments from './comments'
import ImageGrid from './image-grid'
import Like from './like'

export default {
  name: 'Feed',
  components: {
    myVideo,
    Comments,
    Like,
    ImageGrid
  },
  mixins: [mixin],
  props: {
    feed: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getCPCText (cost) {
      return 'You wil get $' + cost + ' for clicking this link'
    },
    getCPVText (cost) {
      return 'You have got $' + cost + ' for seeing this ad'
    },
    getCPVVText (cost) {
      return 'You will get $' + cost + ' for watching this video'
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
    }
  }
}
</script>
