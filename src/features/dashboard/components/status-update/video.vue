<template lang="pug">
form(onsubmit="return false")
  .form-group.has-success
    <label>Title*</label>
    input.form-control(placeholder="Enter video title" v-model.trim="title")
  .form-group
    label
      | Description
    textarea.form-control(placeholder="Enter Description (optional)" rows="4" v-model.trim="description")
</template>
<script>
export default {
  name: 'VideoUpload',
  data () {
    return {
      title: '',
      description: ''
    }
  }
}
</script>
