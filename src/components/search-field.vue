<template lang="pug">
form.input-form(@submit.prevent="searchTags()")
  .input-group
    input.form-control(type='text' :placeholder='getPlaceholderText()' v-model="searchKeyword")
    span.input-group-btn
      button.btn.btn-info(type='submit' title="Go!")
        i.ti-search
</template>
<script>
import { router } from '@/http'

export default {
  name: 'SearchField',
  props: {
    searchType: {
      type: String,
      default () {
        return 'content'
      }
    },
    searchKeyword: {
      type: String,
      default () {
        return ''
      }
    },
    placeholder: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {
    searchTags () {
      router.push({
        name: 'search',
        params: {
          type: this.searchType
        },
        query: {
          k: this.searchKeyword
        }
      })
    },
    getPlaceholderText () {
      return this.placeholder || 'Search ' + this.searchType + '...'
    }
  }
}
</script>
