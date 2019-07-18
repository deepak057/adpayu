<template lang="pug">
// ==============================================================
// Bread crumb and right sidebar toggle
// ==============================================================
.row.page-titles.bg-special-2(:class="{'collapsed': currentUser.pageTitleCollapsed}")
  .col-md-4.col-12.align-self-center
    h3.text-themecolor.m-b-0.m-t-0 {{head}}
    ol.breadcrumb
      li.breadcrumb-item
       <router-link :to="getTagLink('all')">
        | Home
        </router-link>
      li.breadcrumb-item.active {{subHead}}
  .col-md-8.col-12.align-self-center.text-right.small-screen-text-left
    <total-revenue class="m-r-50"/>
  <title-collapse />
// ==============================================================
// End Bread crumb and right sidebar toggle
// ==============================================================
</template>
<script>
import TotalRevenue from './total-revenue'
import mixin from '../globals/mixin'
import auth from '@/auth/helpers'
import TitleCollapse from './title-collapse'

export default {
  name: 'PageTitle',
  components: {
    TotalRevenue,
    TitleCollapse
  },
  mixins: [mixin],
  props: {
    heading: {
      type: String,
      required: true
    },
    subHeading: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      head: '',
      subHead: '',
      currentUser: auth.getUser()
    }
  },
  watch: {
    subHeading (newV) {
      this.subHead = newV
    },
    '$store.state.auth.user' (user) {
      this.currentUser = user
    }
  },
  mounted () {
    this.head = this.heading
    this.subHead = this.subHeading || this.head
  }
}
</script>
