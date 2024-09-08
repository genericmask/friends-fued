import { createRouter, createWebHistory } from 'vue-router';
import GameBoard from '@/views/GameBoard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameBoard
    },
    {
      path: '/control',
      name: 'control',
      component: () => import('../views/Control.vue')
    }
  ]
})

export default router
