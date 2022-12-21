import { createRouter, createWebHistory } from 'vue-router'

import Equipments from '@/views/Equipments.vue'
import Rooms from '@/views/Rooms.vue'

const routes = [
  {
    path: '/',
    name: 'rooms',
    component:  ()=>import('@/views/Rooms.vue')
  },
  {
    path: '/rooms/',
    component:  ()=>import('@/views/Rooms.vue')
  },
  {
    path: '/rooms/:room',
    name: 'room-view',
    component:  ()=>import('@/views/RoomView.vue')
    // children: [
    //   {
    //     path: '/Reserve',
    //     name: 'Reserve',
    //     component: Reserve,
    //   }
    // ]
  },
  {
    path: '/equipments/',
    component:  ()=>import('@/views/Equipments.vue')
  },
  {
    path: '/equipments/:equipment',
    name: 'equipment-view',
    component:  ()=>import('@/views/EquipmentsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
