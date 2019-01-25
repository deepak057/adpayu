<template lang="pug">
li.nav-item.search-box
  form(@submit.prevent="onSubmit")
    input.nav-search-field.form-control(placeholder="Search..." type='text' v-model="k")
  // a.nav-link.text-muted.waves-effect.waves-dark(href='javascript:void(0)' :id="closeButtonId")
    // i.ti-search
  // form.app-search(@submit.prevent="onSubmit")
    // input.form-control(placeholder='Search & enter', type='text' v-model="k")
    // a.srh-btn
      // i.ti-close
</template>
<script>
import { router } from '@/http'

export default {
  name: 'SearchBar',
  data () {
    return {
      k: '',
      closeButtonId: 'app-search-close-btn'
    }
  },
  methods: {
    onSubmit () {
      // this.closeSearchBar()
      router.push({
        name: 'search',
        params: {
          type: 'content'
        },
        query: {
          k: this.k
        }
      })
      this.k = ''
    },
    closeSearchBar () {
      document.getElementById(this.closeButtonId).click()
    }
  }
}
</script>
