<template lang="pug">
form
  .form-group
    textarea#message-text.form-control(placeholder="Share your mind*" v-model.trim="status")
</template>

<script>
export default {
  name: 'TextStatus',
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  watch: {
    status (val_) {
      this.$emit('textStatusEntered', val_)
    }
  }
}
</script>
