<template lang="pug">
.col-lg-3.col-md-6
  .card
    .card-body
      .row
        .col-4
          <router-link :to="getTagLink(tag.name)" tag="div" :class="['pointer round round-lg align-self-center', getRandomClass()]" @click.native="scrollToTop()">
              i.mdi(:class="tag.icon")
          </router-link>
        .col-8.p-0
          .m-l-10.align-self-center
            h4.m-b-0.font-light
              <router-link @click.native="scrollToTop()" :to="getTagLink(tag.name)" class="c-inherit">
                | {{tag.name}}
              </router-link>
            h5.m-t-5.text-muted.m-b-0
              <follow-button :tag="tag"></follow-button>
</template>
<script>
import mixin from '../../globals/mixin.js'
import FollowButton from './follow-button'
export default {
  name: 'Tag',
  components: {
    FollowButton
  },
  mixins: [mixin],
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  methods: {
    getRandomClass () {
      // let arr = ['info', 'primary', 'success', 'danger', 'warning']
      // return 'round-' + arr[Math.floor(Math.random() * arr.length)]
      return 'round-info'
    }
  }
}
</script>
