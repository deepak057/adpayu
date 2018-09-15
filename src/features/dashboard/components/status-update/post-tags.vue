<template lang="pug">
  div.m-b-20
    <vue-tags-input v-model="tag" placeholder="Add tags" :autocomplete-items="filteredItems" :tags="tags" @tags-changed="tagsUpdated"/>
</template>
<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: 'PostTags',
  components: {
    VueTagsInput
  },
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tag: '',
      autocompleteItems: [{
        text: 'Science',
        id: 1
      }, {
        text: 'Fashion',
        id: 2
      }, {
        text: 'Technology',
        id: 3
      }, {
        text: 'Spirtual',
        id: 4
      }, {
        text: 'India',
        id: 5
      }]
    }
  },
  computed: {
    filteredItems () {
      return this.autocompleteItems.filter(i => new RegExp(this.tag, 'i').test(i.text))
    }
  },
  methods: {
    tagsUpdated (newTags) {
      this.$emit('tagsUpdated', newTags)
    }
  }
}
</script>
