import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Equipments from '@/views/Equipments.vue'
import Rooms from '@/views/Rooms.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rooms',
    name: 'rooms.show',
    children: [
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('@/components/Calendar.vue'),
      }
    ]
  },
  {
    path: '/equipments',
    name: 'equipments',
    component: Equipments
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
