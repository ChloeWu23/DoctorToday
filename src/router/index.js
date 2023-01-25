import { createRouter, createWebHashHistory } from 'vue-router'
import Header from '../views/Header.vue'
import Home from '../components/Home.vue'
import Appointment from '../views/Appointment.vue'
import Services from '../views/Services.vue'
import TravelGuides from '../views/TravelGuides.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes = [
  { // landing page
    path: '/',
    component: Header,
    children: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: 'services',
      name: 'Services & Prices',
      component: Services
    },
    {
      path: 'travelGuides',
      name: 'TravelGuides',
      component: TravelGuides
    },
    {
      path: 'appointment',
      name: 'Appointment',
      component: Appointment
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

