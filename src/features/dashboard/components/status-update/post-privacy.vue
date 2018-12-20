<template lang="pug">
span.m-r-20
  | Is this public?
  <toggle-button :value="true" v-model="public" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
</template>
<script>
export default {
  name: 'PostPrivacy',
  props: {
    public: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {
    public (newV) {
      this.$emit('PrivacyUpdated', newV)
    }
  }
}
</script>
