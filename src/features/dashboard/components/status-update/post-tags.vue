<template lang="pug">
  div.m-b-20
    <vue-tags-input v-model="tag" placeholder="Add tags" :autocomplete-items="filteredItems" :tags="tags" @tags-changed="newTags => tags = newTags"/>
</template>
<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: 'PostTags',
  components: {
    VueTagsInput
  },
  data () {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [{
        text: 'Spain'
      }, {
        text: 'France'
      }, {
        text: 'USA'
      }, {
        text: 'Germany'
      }, {
        text: 'China'
      }]
    }
  },
  computed: {
    filteredItems () {
      return this.autocompleteItems.filter(i => new RegExp(this.tag, 'i').test(i.text))
    }
  }
}
</script>
