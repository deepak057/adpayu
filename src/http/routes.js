/**
 * Every route becomes a chunk, loaded only when used.
 * Reduces size of initial App load.
 */
const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/features/login/main.vue'),
    title: 'Login',
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'signup',
    path: '/signup',
    component: () => import(/* webpackChunkName: "login" */ '@/features/register/main.vue'),
    title: 'Sign Up',
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'),
    title: 'Dashboard',
    layout: 'DefaultLayout',
    isPublic: false
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
    path: '/p',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/pages/main.vue'),
    children: [{
      path: ':id'
    }],
    title: 'Post',
    layout: 'DefaultLayout',
    isPublic: false,
    props: true
  }
]

export default routes
