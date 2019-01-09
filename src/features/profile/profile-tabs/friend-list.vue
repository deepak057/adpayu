<template lang="pug">
.card-body
  .message-box.contact-box
    h2.add-ct-btn
      button.btn.btn-circle.btn-lg.btn-success.waves-effect.waves-dark(type='button') +
    .message-widget.contact-widget
      // Message
      a(href='#')
        .user-img
          img.img-circle(src='/static/assets/images/users/1.jpg', alt='user')
          span.profile-status.online.pull-right
        .mail-contnet
          h5 Pavan kumar
          span.mail-desc info@wrappixel.com
      // Message
      a(href='#')
        .user-img
          img.img-circle(src='/static/assets/images/users/2.jpg', alt='user')
          span.profile-status.busy.pull-right
        .mail-contnet
          h5 Sonu Nigam
          span.mail-desc pamela1987@gmail.com
      // Message
      a(href='#')
        .user-img
          span.round A
          span.profile-status.away.pull-right
        .mail-contnet
          h5 Arijit Sinh
          span.mail-desc cruise1298.fiplip@gmail.com
      // Message
      a(href='#')
        .user-img
          img.img-circle(src='/static/assets/images/users/4.jpg', alt='user')
          span.profile-status.offline.pull-right
        .mail-contnet
          h5 Pavan kumar
          span.mail-desc kat@gmail.com

</template>
<script>
export default {
  name: 'FriendList'
}
</script>
