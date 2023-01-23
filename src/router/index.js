import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Index.vue'

const routes = [
  {
    path: '/index',
    name: 'index',
    component: HomeView
  },
  {
    path: '/appointment',
    name: 'Appointment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Appointment.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
