import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/views/Welcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameBoard.vue')
    },
    {
      path: '/control',
      name: 'control',
      component: () => import('../views/Control.vue')
    }
  ]
})

export default router
