<template lang="pug">
// ==============================================================
// Bread crumb and right sidebar toggle
// ==============================================================
.row.page-titles
  .col-md-4.col-12.align-self-center
    h3.text-themecolor.m-b-0.m-t-0 {{head}}
    ol.breadcrumb
      li.breadcrumb-item
       <router-link to="/">
        | Home
        </router-link>
      li.breadcrumb-item.active {{subHead}}
  .col-md-8.col-12.align-self-center.text-right.small-screen-text-left
    <total-revenue/>
// ==============================================================
// End Bread crumb and right sidebar toggle
// ==============================================================
</template>
<script>
import TotalRevenue from './total-revenue'

export default {
  name: 'PageTitle',
  components: {
    TotalRevenue
  },
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
      subHead: ''
    }
  },
  watch: {
    subHeading (newV) {
      this.subHead = newV
    }
  },
  mounted () {
    this.head = this.heading
    this.subHead = this.subHeading || this.head
  }
}
</script>
