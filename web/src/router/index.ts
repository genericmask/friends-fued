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
      path: '/answers',
      name: 'answers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Answers.vue')
    },
    {
      path: '/control',
      name: 'control',
      component: () => import('../views/Control.vue')
    }
  ]
})

export default router
