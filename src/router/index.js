import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/AuthStore'

const routes = [
  /* AUTHENTICATION */
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/AuthLogin.vue'),
    meta: {
      requiredAuth: false
    }
  },

  /* VISTA PRINCIPAL */
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      requiredAuth: true
    }
  },

  /* CRUD */
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/views/CustomerViews/CustomerTable.vue'),
    meta: {
      requiredAuth: true
    }
  },

  {
    path: '/providers',
    name: 'providers',
    component: () => import('@/views/ProviderViews/ProviderTable.vue'),
    meta: {
      requiredAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore().getToken
  const needAuth = to.meta.requiredAuth

  if (needAuth && !auth) {
    next('Login')
  } else {
    next()
  }
})

export default router