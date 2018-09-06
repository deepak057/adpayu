<template lang="pug">
form
  .form-group.has-success
    <label>Question*</label>
    input.form-control(placeholder="Enter your question" v-model="question.question")
  .form-group
    label
      | Description
    textarea.form-control(placeholder="Enter Description" rows="4" v-model="question.description")
</template>
<script>
export default {
  name: 'Question',
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  watch: {
    question: {
      handler (newObj, oldObj) {
        this.$emit('questionsDetailesUpdated', newObj)
      },
      deep: true
    }
  }
}
</script>
