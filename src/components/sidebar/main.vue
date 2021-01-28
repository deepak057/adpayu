<template lang="pug">
aside.left-sidebar.bg-special-2(style='overflow: visible;')
    // Sidebar scroll
    .scroll-sidebar(style='overflow: hidden;')
      <revenue />
      // Preloader
      .sidebar-preloader(v-show="preloader")
        <preloader></preloader>
      // Sidebar navigation
      nav.sidebar-nav.bg-special-2(v-if="!preloader")
        ul#sidebarnav
          li
            a.p-0.nullify-a-style(hide-menu="false" href="javascript:void(0)")
              span.small(:class="{'hide-this-NM': !isMobile()}")
                | Filter feed by tags
              <multiselect v-model="selectedTag" :options="menuItems" :searchable="!isMobile()" :close-on-select="true" :show-labels="true" track-by="name" @select="tagSelected" label="name" tagPlaceholder="" :showLabels="false" placeholder="All Tags">
                <template slot="placeholder" slot-scope="props">
                  <i class="mdi mdi-tag-multiple m-l-10 text-muted"></i>
                  <span class="m-l-5" :class="{'hide-this-NM': !isMobile()}">All Tags</span>
                </template>
                <template slot="singleLabel" slot-scope="props">
                  <i :class="'mdi ' +  props.option.icon"></i>
                  <span class="m-l-5" :class="{'hide-this-NM': !isMobile()}">{{ (props.option.name === 'all' ? 'All Tags' : props.option.name) | capitalize}}</span>
                </template>
                <template slot="option" slot-scope="props">
                  <i :class="'mdi ' +  props.option.icon"></i>
                  <span class="m-l-5">{{ (props.option.name === 'all' ? 'All Tags' : props.option.name) | capitalize}}</span>
                </template>
                <template slot="noResult">
                  <span>No Results</span>
                </template>
              </multiselect>
          li(add-topics-wrap)
            <router-link tag="a" to="/tags" class="waves-effect waves-dark" title="Browse and add more topics in your feed">
              i.mdi.mdi-tag-plus
              span.hide-menu
                |  Follow Tags
            </router-link>
          li(add-topics-wrap)
            <router-link tag="a" :to="postAnswerPageLink()" class="waves-effect waves-dark" title="Add video or text answers to unanswered questions">
              i.mdi.mdi-comment-plus-outline
              span.hide-menu
                |  Add Answer
            </router-link>
</template>

<script>
import auth from '@/auth/helpers'
import mixin from '@/globals/mixin.js'
import Service from './service'
import Preloader from '../preloader'
import Multiselect from 'vue-multiselect'
import { router } from '@/http'
import Revenue from './revenue'

export default {
  name: 'AppSidebar',
  service: new Service(),
  components: {
    Preloader,
    Multiselect,
    Revenue
  },
  mixins: [mixin],
  props: {
    cat: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      preloader: true,
      defaultItem: {
        name: 'all',
        icon: 'mdi-tag-multiple',
        default: true
      },
      user: auth.getUser(),
      menuItems: [],
      selectedTag: false
    }
  },
  computed: {
    /* isActive: {
      get () {
        return this.$store.state.common.sidebar.visible
      },
      set (val) {
        this.$store.dispatch('common/updateSidebar', { visible: val })
      }
    } */
  },
  watch: {
    '$store.state.auth.userTags' (tags) {
      this.menuItems = tags
    },
    '$store.state.auth.user' (user) {
      this.user = user
    }
  },
  mounted () {
    this.$options.service.getTags()
      .then((data) => {
        // add the default menu item
        data.tags.unshift(this.defaultItem)
        this.menuItems = data.tags
        auth.updateUserTags(data.tags)
        this.preloader = false
      })
      .catch((Tagserror) => {
        // alert('Soemthing went wrong while getting your tags')
      })
  },
  methods: {
    logout () {
      auth.logout()
    },
    tagSelected (selectedOption, id) {
      router.push(this.getTagLink(selectedOption.name))
      if (this.isMobile()) {
        let elem = document.getElementsByClassName('nav-toggler')[0]
        if (elem) {
          elem.click()
        }
      }
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="stylus">
</style>
