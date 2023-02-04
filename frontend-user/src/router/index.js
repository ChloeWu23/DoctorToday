import { createRouter, createWebHashHistory } from 'vue-router'
import Header from '../views/Header.vue'
import Home from '../components/Home.vue'
import Appointment from '../views/Appointment.vue'
import NewPatientRegister from '../views/NewPatientRegister.vue'
import ServiceOverview from '../views/ServiceOverview.vue'
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
      component: ServiceOverview
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
    },
    {
      path: 'newPatientRegister',
      name: 'NewPatientRegister',
      component: NewPatientRegister
    },
    {
      path: "services/:serviceName",
      component: () => import("../components/ServiceDetails")
    },
    {
      path: "/test",
      alias: "/test",
      name: "test",
      component: () => import("../components/Test")
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../components/Admin")
    },
    {
      path: "/showServices",
      name: "showServices",
      component: () => import("../components/ShowServices")
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
