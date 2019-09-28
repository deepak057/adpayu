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
import mixin from '../globals/mixin.js'

export default {
  name: 'SearchField',
  mixins: [mixin],
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
    },
    additionalParams: {
      type: Object,
      default () {
        return {}
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
        query: this.getQueryObj()
      })
    },
    getQueryObj () {
      let queryObj = {
        k: this.searchKeyword
      }
      /*
      * Keep the parametres that were passed in the URL
      * and add them to the query object that will be sen
      * to server
      */
      if (!this.isEmptyObject(this.additionalParams)) {
        for (let i in this.additionalParams) {
          if (this.additionalParams.hasOwnProperty(i)) {
            queryObj[i] = this.additionalParams[i]
          }
        }
      }
      return queryObj
    },
    getPlaceholderText () {
      return this.placeholder || 'Search ' + this.searchType + '...'
    }
  }
}
</script>
