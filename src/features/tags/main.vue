<template lang="pug">
.container-fluid
  // ==============================================================
  // Bread crumb and right sidebar toggle
  // ==============================================================
  .row.page-titles
    .col-md-4.col-12.align-self-center
      h3.text-themecolor.m-b-0.m-t-0 Tags
      ol.breadcrumb
        li.breadcrumb-item
          <router-link to="/">
            | Home
          </router-link>
        li.breadcrumb-item.active Tags
    .col-md-8.col-12.align-self-center.text-right
      h3.m-b-0.font-light $3249
      h5.text-muted.m-b-0 Total Revenue
  // ==============================================================
  // End Bread crumb and right sidebar toggle
  // ==============================================================
  // ==============================================================
  // Start Page Content
  // ==============================================================
  // Row
  .row
    .col-12
      .card
        .card-body.min-h-400
          div.m-t-20.text-center(v-show="pageLoader")
            <preloader></preloader>
          .row(v-show="!pageLoader")
            // Column
            .col-lg-3.col-md-6(v-for="tag in tags")
              .card
                .card-body
                  .row
                    .col-4
                      <router-link :to="getTagLink(tag.name)" tag="div" :class="['pointer round round-lg align-self-center', getRandomClass()]" @click.native="scrollToTop()">
                          i.mdi(:class="tag.icon")
                      </router-link>
                    .col-8.p-0
                      .m-l-10.align-self-center
                        h4.m-b-0.font-light
                          <router-link @click.native="scrollToTop()" :to="getTagLink(tag.name)" class="c-inherit">
                            | {{tag.name}}
                          </router-link>
                        h5.m-t-5.text-muted.m-b-0 Follow
            // Column
</template>
<script>
// import auth from '@/auth/helpers'
import Preloader from './../../components/preloader'
import mixin from '../../globals/mixin.js'
import Service from './service'

export default {
  name: 'Tags',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      tags: []
    }
  },
  mounted () {
    this.scrollToTop()
    this.$options.service.getTags()
      .then((data) => {
        this.pageLoader = false
        this.tags = data.tags
      })
      .catch((tagsErr) => {
        alert('Something went wrong file getting tags')
      })
  },
  methods: {
    getRandomClass () {
      let arr = ['info', 'primary', 'success', 'danger', 'warning']
      return 'round-' + arr[Math.floor(Math.random() * arr.length)]
      // return 'round-info'
    }
  }
}
</script>
