<template lang="pug">
#main-wrapper
  <app-bar/>
  <app-sidebar :cat="cat"/>
  .page-wrapper
    router-view
    <app-footer/>
</template>

<script>
import AppBar from '@/components/app-bar'
import AppSidebar from '@/components/app-sidebar'
import AppFooter from '@/components/app-footer'

export default {
  name: 'DefaultLayout',
  components: { AppBar, AppSidebar, AppFooter },
  data () {
    return {
      cat: 'all'
    }
  }
}
</script>

<style lang="stylus">
</style>
