<template lang="pug">
  div.m-b-20
    <vue-tags-input v-model="tag" placeholder="Add tags" :autocomplete-items="autocompleteItems" :tags="tags" @tags-changed="tagsUpdated"/>
</template>
<script>
import VueTagsInput from '@johmun/vue-tags-input'
import Service from './service'

export default {
  name: 'PostTags',
  service: new Service(),
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
      autocompleteItems: []
    }
  },
  watch: {
    tag (newValue) {
      let that = this
      this.$options.service.tagsAutoSuggestions(newValue)
        .then((data) => {
          that.autocompleteItems = data.tags.map(a => {
            return { text: a.name, id: a.id }
          })
        })
        .catch((tagErr) => {
          alert(tagErr)
        })
    }
  },
  methods: {
    tagsUpdated (newTags) {
      this.$emit('tagsUpdated', newTags)
    },
    filteredItems () {
      return this.autocompleteItems.filter(i => new RegExp(this.tag, 'i').test(i.name))
    }
  }
}
</script>
