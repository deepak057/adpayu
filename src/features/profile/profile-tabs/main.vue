<template lang="pug">
.card
  ul.nav.nav-tabs.profile-tab(role='tablist')
    li.nav-item
      a.nav-link(data-toggle='tab', href='#up-home-tab', role='tab' id="default-tab-up" :class="{'active': this.defaultTab === 'timeline'}") Timeline
    li.nav-item(v-if='isOwnProfile')
      a.nav-link(data-toggle='tab', href='#up-friends-tab', role='tab' :class="{'active': this.defaultTab === 'friends'}") Friends
    li.nav-item(v-if='isOwnProfile')
      a.nav-link(data-toggle='tab', href='#up-settings-tab', role='tab' :class="{'active': this.defaultTab === 'settings'}") Settings
  // Tab panes
  .tab-content
    #up-home-tab.tab-pane(role='tabpanel' :class="{'active': this.defaultTab === 'timeline'}")
      <timeline :profileUser='profileUser'></timeline>
    #up-friends-tab.tab-pane(role='tabpanel' v-if="isOwnProfile" :class="{'active': this.defaultTab === 'friends'}")
      <friend-list :currentUser="currentUser"></friend-list>
    #up-settings-tab.tab-pane(role='tabpanel' v-if="isOwnProfile" :class="{'active': this.defaultTab === 'settings'}")
      <settings :currentUser="currentUser"></settings>
</template>
<script>
import Timeline from './timeline'
import FriendList from './friend-list'
import Settings from './settings'
import mixin from '../../../globals/mixin.js'

export default {
  name: 'ProfileTabs',
  components: {
    Timeline,
    FriendList,
    Settings
  },
  mixins: [mixin],
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
  data () {
    return {
      defaultTab: 'timeline'
    }
  },
  watch: {
    profileUser (newV) {
      if (newV.id !== this.currentUser.id) {
        document.getElementById('default-tab-up').click()
      }
    },
    '$route.query.tab' () {
      this.setDefaultTab()
    }
  },
  mounted () {
    this.setDefaultTab()
  },
  methods: {
    setDefaultTab () {
      this.defaultTab = this.$route.query.tab || this.defaultTab
    }
  }
}
</script>
