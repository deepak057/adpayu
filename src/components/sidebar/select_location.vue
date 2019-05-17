<template lang="pug">
// User profile
.user-profile.custom(style='background: url(static/images/map-back.png) no-repeat;')
// User profile image
	div(:id="mapId")
	.profile-img
  //img(:src='getMedia(user.pic)', alt='user')
  		i.mdi.mdi-map-marker.sidebar-map-icon.text-danger.cursor-hand
// User profile text
	.profile-text
  		a.dropdown-toggle.u-dropdown(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='true')
    		i.mdi.mdi-map-marker.m-r-2
    		| Your Location
  	.dropdown-menu.animated.flipInY
    // <router-link class="dropdown-item" :to="userProfileLink()">
      i.ti-user
      |  My Profile
    </router-link>
    // a.dropdown-item(href="#")
      // i.ti-wallet
      // |  My Balance
    // a.dropdown-item(href='#')
      // i.ti-email
      // |  Inbox
    // .dropdown-divider
    // a.dropdown-item(href='#')
      // i.ti-settings
      // |  Account Setting
    // .dropdown-divider
    	a.dropdown-item(href='javascript:void(0)')
      		i.fa.fa-map-marker
      		|  Update Location
// End User profile text
</template>
<script>
export default {
  name: 'SelectLocation'
}
</script>
