<template lang="pug">
.main.vh-95
  section.module
    .container
      .row
        .col-12.public-page-content-wrap
          .text-center
            <preloader v-if="loader"/>
</template>
<script>
import mixin from '../../../globals/mixin'
import Preloader from '../../../components/preloader'
import auth from '@/auth/helpers'

export default {
  name: 'PublicContent',
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      loader: true
    }
  },
  computed: {
    isPost () {
      return this.$route.name === 'publicPost'
    },
    contentId () {
      return this.$route.params.id || false
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      try {
        this.loader = true
        if (this.isPost) {
          auth.getPost(this.contentId)
            .then((d) => {
              this.loader = false
            })
        } else {
          auth.getComment(this.contentId)
            .then((d) => {
              this.loader = false
            })
        }
      } catch (e) {
        this.showNotification('Something went wrong, please try again later', 'error')
      }
    }
  }
}
</script>
