<template lang="pug">
.card
  ul.nav.nav-tabs.profile-tab(role='tablist')
    li.nav-item
      a.nav-link.active(data-toggle='tab', href='#home', role='tab') Timeline
    li.nav-item(v-show='isOwnProfile')
      a.nav-link(data-toggle='tab', href='#profile', role='tab') Friends
    li.nav-item(v-show='isOwnProfile')
      a.nav-link(data-toggle='tab', href='#settings', role='tab') Settings
  // Tab panes
  .tab-content
    #home.tab-pane.active(role='tabpanel')
      timeline(:profileuser='user')
    // second tab
    #profile.tab-pane(role='tabpanel')
      .card-body
        .row
          .col-md-3.col-xs-6.b-r
            strong Full Name
            br
            p.text-muted Johnathan Deo
          .col-md-3.col-xs-6.b-r
            strong Mobile
            br
            p.text-muted (123) 456 7890
          .col-md-3.col-xs-6.b-r
            strong Email
            br
            p.text-muted johnathan@admin.com
          .col-md-3.col-xs-6
            strong Location
            br
            p.text-muted London
        hr
        p.m-t-30
          | Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
        p
          | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
        p
          | It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        h4.font-medium.m-t-30 Skill Set
        hr
        h5.m-t-30
          | Wordpress
          span.pull-right 80%
        .progress
          .progress-bar.bg-success(role='progressbar', aria-valuenow='80', aria-valuemin='0', aria-valuemax='100', style='width:80%; height:6px')
            span.sr-only 50% Complete
        h5.m-t-30
          | HTML 5
          span.pull-right 90%
        .progress
          .progress-bar.bg-info(role='progressbar', aria-valuenow='90', aria-valuemin='0', aria-valuemax='100', style='width:90%; height:6px')
            span.sr-only 50% Complete
        h5.m-t-30
          | jQuery
          span.pull-right 50%
        .progress
          .progress-bar.bg-danger(role='progressbar', aria-valuenow='50', aria-valuemin='0', aria-valuemax='100', style='width:50%; height:6px')
            span.sr-only 50% Complete
        h5.m-t-30
          | Photoshop
          span.pull-right 70%
        .progress
          .progress-bar.bg-warning(role='progressbar', aria-valuenow='70', aria-valuemin='0', aria-valuemax='100', style='width:70%; height:6px')
            span.sr-only 50% Complete
    #settings.tab-pane(role='tabpanel')
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
export default {
  name: 'ProfileTabs'
}
</script>
