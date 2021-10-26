import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false
    }
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: () => import('../views/CreatePost.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/post/:postId',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    props: true,
    meta: {
      auth: false
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/likes',
    name: 'Likes',
    component: () => import('../views/Likes.vue'),
    meta: {
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = to.meta.auth
  console.log(authRequired)
  const hasAuth = store.getters['auth/isAuthenticated']
  if (!authRequired || (authRequired === hasAuth)) {
    next()
  } else {
    next('/auth')
  }
})

export default router
