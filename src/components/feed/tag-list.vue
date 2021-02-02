<template lang="pug">
.feed-tags.m-b-15(v-if="post['Tags'] && post['Tags'].length && showTags")
  <router-link @click.native = "closeAllModals()" class="m-r-5 label-default" v-for="(tag, k) in post['Tags']" :key="tag.name" :to="getTagLink(tag.name)" :title="getTagTooltip(tag.name)" v-if = "showTag(k)" >
    | &#x23;{{tag.name}}
  </router-link>
  span.cursor-hand(title="See all tags" v-if="showMoreTagsButtonEnabled()" @click="showAllTags()")
    | ...more
</template>
<script>
import mixin from '../../globals/mixin.js'
export default {
  name: 'TagList',
  mixins: [mixin],
  props: {
    post: {
      type: Object,
      required: true
    },
    showTags: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      defaultTagsCount: this.isMobile() ? 3 : 5,
      allShown: false
    }
  },
  methods: {
    showAllTags () {
      this.allShown = true
    },
    showMoreTagsButtonEnabled () {
      return !this.allShown && (this.post['Tags'].length > this.defaultTagsCount)
    },
    getTagTooltip (text) {
      return 'Tagged with ' + text
    },
    showTag (index) {
      if (!this.allShown) {
        return (index + 1) <= this.defaultTagsCount
      } else {
        return true
      }
    }
  }
}
</script>
