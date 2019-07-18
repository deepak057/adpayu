<template lang="pug">
.page-title-collapse-control-wrap
  i.mdi(:class="{'mdi-menu-down': currentUser.pageTitleCollapsed, 'mdi-menu-up': !currentUser.pageTitleCollapsed}" @click="toggleCollapse()")
</template>
<script>
import auth from '@/auth/helpers'

export default {
  name: 'TitleCollapes',
  data () {
    return {
      currentUser: auth.getUser()
    }
  },
  methods: {
    toggleCollapse () {
      this.currentUser.pageTitleCollapsed = !this.currentUser.pageTitleCollapsed
      auth.updateCurrentUser(this.currentUser)
    }
  }
}
</script>
