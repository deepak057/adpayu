<template lang="pug">
.card
  ul.nav.nav-tabs.profile-tab(role='tablist')
    li.nav-item
      a.nav-link.active(data-toggle='tab', href='#up-home-tab', role='tab' id="default-tab-up") Timeline
    li.nav-item(v-if='isOwnProfile')
      a.nav-link(data-toggle='tab', href='#up-friends-tab', role='tab') Friends
    li.nav-item(v-if='isOwnProfile')
      a.nav-link(data-toggle='tab', href='#up-settings-tab', role='tab') Settings
  // Tab panes
  .tab-content
    #up-home-tab.tab-pane.active(role='tabpanel')
      <timeline :profileUser='profileUser'></timeline>
    // second tab
    #up-friends-tab.tab-pane(role='tabpanel' v-if="isOwnProfile")
      <friend-list :currentUser="currentUser"></friend-list>
    #up-settings-tab.tab-pane(role='tabpanel' v-if="isOwnProfile")
      <settings :currentUser="currentUser"></settings>
</template>
<script>
import Timeline from './timeline'
import FriendList from './friend-list'
import Settings from './settings'

export default {
  name: 'ProfileTabs',
  components: {
    Timeline,
    FriendList,
    Settings
  },
  props: {
    profileUser: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
    isOwnProfile: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  watch: {
    profileUser () {
      document.getElementById('default-tab-up').click()
    }
  }
}
</script>
