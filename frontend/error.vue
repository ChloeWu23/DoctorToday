<template>
    <Header></Header>
    <div class="mx-auto w-96 flex flex-col items-center">
        <p class="align-center">Page Not Found, click below to back to homepage</p>
        <div class="grid grid-cols-2 m-8 mb-20 gap-10">
            <button @click="redirectToHome" class="w-40 h-12 bg-sky-700/90 text-white rounded-lg">Home Page</button>
            <button @click="bookAppointment" class="w-40 h-12 bg-sky-700/90 text-white rounded-lg">Book
                Appointment</button>
            <button @click="checkServices" class="w-40 h-12 bg-sky-700/90 text-white rounded-lg">Services & Price</button>
            <button @click="findUs" class="w-40 h-12 bg-sky-700/90 text-white rounded-lg">Find Us</button>
        </div>
    </div>
    <Footer></Footer>
</template>
  
<script setup>

const props = defineProps({
    error: Object
})

const redirectToHome = () => clearError({ redirect: '/' })
const bookAppointment = () => clearError({ redirect: '/bookingAppointment' })
const checkServices = () => clearError({ redirect: '/services' })
const findUs = () => clearError({ redirect: '/about/findus' })
</script>