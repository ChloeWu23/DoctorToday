import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Appointment from '../views/Appointment.vue'
import Services from '../views/Services.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes = [
  { // landing page
    path: '/',
    component: Index,
    children: [{
      path: 'home',
      name: 'home',
      component: Home
    },
    {
      path: 'appointment',
      name: 'Appointment',
      component: Appointment
    },
    {
      path: 'services',
      name: 'Services & Prices',
      component: Services
    }
    // },
    // {
    //   path: ':catchAll(.*)*',
    //   name: "PageNotFound",
    //   component: PageNotFound,
    // }
  ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
