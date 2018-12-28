<template lang="pug">
span.m-r-20
  | Is this public?
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
