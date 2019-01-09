<template lang="pug">
.card
  ul.nav.nav-tabs.profile-tab(role='tablist')
    li.nav-item
      a.nav-link.active(data-toggle='tab', href='#up-home-tab', role='tab') Timeline
    li.nav-item(v-show='isOwnProfile')
      a.nav-link(data-toggle='tab', href='#up-friends-tab', role='tab') Friends
    li.nav-item(v-show='isOwnProfile')
      a.nav-link(data-toggle='tab', href='#up-settings-tab', role='tab') Settings
  // Tab panes
  .tab-content
    #up-home-tab.tab-pane.active(role='tabpanel')
      <timeline :profileUser='profileUser'></timeline>
    // second tab
    #up-friends-tab.tab-pane(role='tabpanel')
      <friend-list></friend-list>
    #up-settings-tab.tab-pane(role='tabpanel')
      .card-body
        form.form-horizontal.form-material
          .form-group
            label.col-md-12 Full Name
            .col-md-12
              input.form-control.form-control-line(placeholder='Johnathan Doe', type='text')
          .form-group
            label.col-md-12(for='example-email') Email
            .col-md-12
              input#example-email.form-control.form-control-line(placeholder='johnathan@admin.com', name='example-email', type='email')
          .form-group
            label.col-md-12 Password
            .col-md-12
              input.form-control.form-control-line(value='password', type='password')
          .form-group
            label.col-md-12 Phone No
            .col-md-12
              input.form-control.form-control-line(placeholder='123 456 7890', type='text')
          .form-group
            label.col-md-12 Message
            .col-md-12
              textarea.form-control.form-control-line(rows='5')
          .form-group
            label.col-sm-12 Select Country
            .col-sm-12
              select.form-control.form-control-line
                option London
                option India
                option Usa
                option Canada
                option Thailand
          .form-group
            .col-sm-12
              button.btn.btn-success Update Profile

</template>
<script>
import Timeline from './timeline'
import FriendList from './friend-list'

export default {
  name: 'ProfileTabs',
  components: {
    Timeline,
    FriendList
  },
  props: {
    profileUser: {
      type: Object,
      required: true
    },
    isOwnProfile: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>
