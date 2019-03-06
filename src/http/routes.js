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
