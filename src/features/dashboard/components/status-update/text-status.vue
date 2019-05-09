<template lang="pug">
form
  .form-group
    textarea#message-text.form-control(v-if="!textEditor" placeholder="Share your mind*" v-model.trim="status")
    <vue-editor v-if="textEditor" v-model.trim="status" useCustomImageHandler @imageAdded="handleImageAdded" placeholder="Share your mind*" class="custom-text-editor-status-update"></vue-editor>
    span.m-t-5.f-s-11.cursor-hand.text-muted.m-l-5(@click="toggleEditor()")
      span(v-if="textEditor") < Hide Formatting Options
      span(v-if="!textEditor")
        i.fa.fa-font.m-r-5.p-r-t--1
        | Formatting Options >
</template>

<script>
import { VueEditor } from 'vue2-editor'
import mixin from '@/globals/mixin'

export default {
  name: 'TextStatus',
  components: {
    VueEditor
  },
  mixins: [mixin],
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      textEditor: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [
          {
            list: 'ordered'
          },
          {
            list: 'bullet'
          }
        ],
        ['image', 'code-block']
      ]
    }
  },
  watch: {
    status (val_) {
      this.$emit('textStatusEntered', val_)
    }
  },
  methods: {
    toggleEditor () {
      this.textEditor = !this.textEditor
    }
  }
}
</script>
