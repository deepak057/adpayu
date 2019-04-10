import store from '@/store'
import dashboard from '@/features/dashboard/main.vue'
import landing from '@/features/landing/main.vue'
import * as constants from '@/constants'

function routerIsLoggedIn () {
  return store.state.auth.isLoggedIn
}

/*
* function to return the Page title for
* public pages. It just ads the Site name
* as prefix to the given page title
*/
function getPageTitle (title) {
  return constants.SITE_NAME + ' - ' + title
}

/**
 * Every route becomes a chunk, loaded only when used.
 * Reduces size of initial App load.
 */
const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/features/login/main.vue'),
    title: getPageTitle('Login'),
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'signup',
    path: '/signup',
    component: () => import(/* webpackChunkName: "login" */ '@/features/register/main.vue'),
    title: getPageTitle('Sign Up'),
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'passwordReset',
    path: '/passwordReset',
    component: () => import(/* webpackChunkName: "login" */ '@/features/password_reset/request.vue'),
    title: getPageTitle('Change Account Password'),
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'changePassword',
    path: '/changePassword',
    component: () => import(/* webpackChunkName: "login" */ '@/features/password_reset/reset.vue'),
    title: getPageTitle('Reset Account Password'),
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'home',
    path: '/',
    get component () {
      return routerIsLoggedIn() ? dashboard : landing
    },
    title: routerIsLoggedIn() ? 'Dashboard' : constants.SITE_NAME + ' - ' + constants.SITE_SLOGAN,
    layout: routerIsLoggedIn() ? 'DefaultLayout' : 'PublicLayout',
    isPublic: true
  },
  {
    name: 'tag',
    path: '/tag',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'),
    title: 'Dashboard',
    children: [{
      path: ':cat'
    }],
    layout: 'DefaultLayout',
    isPublic: false,
    props: true
  },
  {
    name: 'tags',
    path: '/tags',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/tags/main.vue'),
    title: 'Browse Tags',
    layout: 'DefaultLayout',
    isPublic: false,
    props: true
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'),
    title: 'Dashboard',
    layout: 'DefaultLayout',
    isPublic: false
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/profile/main.vue'),
    children: [{
      path: ':uid'
    }],
    title: 'Profile',
    layout: 'DefaultLayout',
    isPublic: false,
    props: true
  },
  {
    name: 'p',
    path: '/p/:id',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/pages/post.vue'),
    title: 'Post',
    layout: 'DefaultLayout',
    isPublic: false,
    props: true
  },
  {
    name: 'terms',
    path: '/pages/terms',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/landing/terms.vue'),
    title: getPageTitle('Terms and Conditions'),
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'privacy',
    path: '/pages/privacy',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/landing/privacy.vue'),
    title: getPageTitle('Privacy Policy'),
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'c',
    path: '/c/:id',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/pages/comment.vue'),
    title: 'Comment',
    layout: 'DefaultLayout',
    isPublic: false,
    props: true
  },
  {
    name: 'notifications',
    path: '/notifications',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/notifications/main.vue'),
    title: 'Notifications',
    layout: 'DefaultLayout',
    isPublic: false,
    props: true
  },
  {
    name: 'search',
    path: '/search/:type',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/search/main.vue'),
    title: 'Search',
    layout: 'DefaultLayout',
    isPublic: false,
    props: true
  },
  {
    name: 'order',
    path: '/order/:action',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/order/main.vue'),
    title: 'Order',
    layout: 'DefaultLayout',
    isPublic: false,
    props: true
  }
]

export default routes
