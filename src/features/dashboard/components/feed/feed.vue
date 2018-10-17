<template lang="pug">
.profiletimeline
  .sl-item(v-for="f in feed" :class="f['AdOption']? 'ribbon-wrapper': '' " v-show="f['show']")
    .ribbon.ribbon-bookmark.ribbon-warning.f-w-400.cursor-hand(v-if="f['AdOption']" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getCPVText(f['AdOption'].cpv)") Sponsored + $ {{f['AdOption'].cpv}}
       i.mdi.mdi-information.m-l-5.cursor-hand
    .sl-left
      img.img-circle(src='static/assets/images/users/1.jpg', alt='user')
    .sl-right
      div
        a.link(href='#') {{f.User.first | capitalize}} {{f.User.last | capitalize}}
        |  {{getPostDescriptionText(f)}}
        span.sl-date  5 minutes ago
        p.m-t-10(v-if="f['content']") {{f['content']}}
        div.m-t-10(v-if="f['Question']")
          h3.font-bold
            | {{f['Question'].question}}
          p.text-muted {{f['Question'].description}}
        .row.m-0.feed-video-wrap(v-if="f['video']!=='0'")
          .col-lg-6.col-md-6.video-container
            <my-video :sources="f['video'].sources" :options="f['video'].options"></my-video>
          .col-lg-6.col-md-6
            span.badge.badge-info.ml-auto.f-w-400.pr-t--2.f-s-12.bg-999.cursor-hand(v-if="f['AdOption'] && f['AdOption'].cpc" data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getCPVVText(f['AdOption'].cpc)") + $ {{f['AdOption'].cpc}}
              i.mdi.mdi-information.m-l-4.cursor-hand
        .row(v-if="f['imgs']")
          .col-lg-3.col-md-6.m-b-20(v-for="img in f['imgs']")
            img.img-responsive.radius(:src="img")
        p(v-if="f['AdOption'] && f['AdOption'].cpc")
          a.m-r-5(href="#") Get The Product Now
          span.badge.badge-info.ml-auto.f-w-400.pr-t--2.f-s-12.bg-999.cursor-hand(data-container="body" title="Ad Revenue" data-toggle="popover" data-placement="right" :data-content="getCPCText(f['AdOption'].cpc)") + $ {{f['AdOption'].cpc}}
            i.mdi.mdi-information.m-l-4
        p.feed-tags(v-if="f['tags']")
          a.m-r-5.label-default(v-for="tag in f['tags']" href="#" :title="getTagTooltip(tag.text)")
            | &#x23;{{tag.text}}
        .like-comm
          a.link.m-r-10(href='javascript:void(0)' @click="toggleComments(f)") {{f['comments']}} {{f['type']=='question' ? 'Answer': 'Comment'}}{{f['comments']? "s": ''}}
          <like :likes="f['likes']"></like>
    <comments :comments="f['comments']" :commentType="f['type']" v-show="f['showComments']"></comments>
    hr
</template>
<script>
import mixin from '../../../../globals/mixin.js'
import myVideo from 'vue-video'
import Comments from './comments'
import Like from './like'

export default {
  name: 'Feed',
  components: {
    myVideo,
    Comments,
    Like
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
        case 'pictures':
          return ''
        default:
          return ''
      }
    },
    getTagTooltip (text) {
      return 'Tagged with ' + text
    }
  }
}
</script>
