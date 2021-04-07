<template lang="pug">
.error-box
  .error-body.text-center
    h1 404
    h3.text-uppercase Page Not Found !
    p.text-muted.m-t-30.m-b-30 {{errDes}}
    <router-link to="/" class="btn btn-info m-b-40" exact>
      | Back To Home
    </router-link>
</template>
<script>
export default {
  name: 'Page404',
  props: {
    errDes: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>
