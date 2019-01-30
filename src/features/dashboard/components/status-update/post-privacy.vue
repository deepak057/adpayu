<template lang="pug">
span.m-r-20
  | Is this public?
  i.mdi.mdi-information-outline.cursor-hand.m-l-2.text-muted(data-container="body" title="Content Privacy" data-toggle="popover" data-placement="right" data-content='Choose wether this post will be public or be visible only to your friends.')
  <toggle-button v-model="privacy" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
</template>
<script>
export default {
  name: 'PostPrivacy',
  props: {
    postPublic: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      privacy: this.postPublic
    }
  },
  watch: {
    privacy (newV) {
      this.$emit('PrivacyUpdated', newV)
    }
  },
  methods: {
    setDefaultPrivacy (privacy) {
      this.postPublic = Boolean(privacy)
    }
  }
}
</script>
