<template lang="pug">
form(onsubmit="return false")
  .form-group.has-success
    <label>Question*</label>
    input.form-control(placeholder="Enter your question" v-model.trim="question.question")
  .form-group
    label
      | Description
    textarea.form-control(placeholder="Enter Description (optional)" rows="4" v-model.trim="question.description")
</template>
<script>
export default {
  name: 'Question',
  props: {
    question: {
      type: Object,
      default () {
        return {
          question: '',
          description: ''
        }
      }
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
