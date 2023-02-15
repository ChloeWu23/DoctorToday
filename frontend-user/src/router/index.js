import { createRouter, createWebHashHistory } from 'vue-router'
import Header from '../views/Header.vue'
import Home from '../components/Home.vue'
import Appointment from '../views/Appointment.vue'
import NewPatientRegister from '../views/NewPatientRegister.vue'
import ServiceOverview from '../views/ServiceOverview.vue'
import TravelGuides from '../views/TravelGuides.vue'
import BookingAppointment from '../views/BookingAppointment.vue'
import FAQs from "../views/FAQs.vue"
import People from '../views/People.vue'
import FindUs from '../views/FindUs.vue'
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
      path: "bookingAppointment",
      name: "BookingAppointment",
      component: BookingAppointment
    },
    {
      path: "FAQs",
      name: "FAQs",
      component: FAQs
    },
    {
      path: "people",
      name: "People",
      component: People
    },
    {
      path: "findUs",
      name: "Find Us",
      component: FindUs
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
      path:"/login",
      name: "login",
      component: () => import("../components/Login")
    }
      // },
      // {
      //   path: ':catchAll(.*)*',
      //   name: "PageNotFound",
      //   component: PageNotFound,
      // }
    ]
  },
  {
    path: "/showServices",
    name: "showServices",
    component: () => import("../components/ShowServices")
  },
  {
    path: "/peopleAdmin",
    name: "peopleAdmin",
    component: () => import("../components/PeopleAdmin")
  },
  {
    path: "/subServiceAdmin",
    name: "subServiceAdmin",
    component: () => import("../components/SubServiceAdmin")
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
