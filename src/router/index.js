import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Equipments from '@/views/Equipments.vue'
//import Rooms from '@/views/Rooms.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rooms/',
    component:  ()=>import('@/views/Rooms.vue')
    // children: [
    //   {
    //     path: '/Reserve',
    //     name: 'Reserve',
    //     component: Reserve,
    //   }
    // ]
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
