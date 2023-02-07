<template>
    <div @click="showMenu = !showMenu" class="justify-end block md:hidden">
        <navButton></navButton>
    </div>
    <div class="w-full block md:flex md:items-center md:w-auto" :class="showMenu ? 'flex' : 'hidden'">
        <ul class="md:flex md:items-center">
            <div class="text-sm md:text-md lg:flex-grow" v-for="tab in navTabs" :key="tab.name">
                <li class="md:mx-4 md:my-0 my-6 text-white relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 
                before:bg-white before:block before:hover:scale-x-100 before:scale-x-0
                before:transition before:ease-in-out before:duration-300">
                    <span v-if="tab.name === 'review'"><a @click="openRedirection()">{{ tab.label }}</a></span>
                    <span v-else>
                        <RouterLink :to="tab.path" class="text-white">{{ tab.label }}</RouterLink>
                    </span>
                </li>
            </div>
        </ul>
    </div>

</template>

<script>
import navButton from './NavButton.vue'

export default {
    components: {
        navButton
    },
    setup() {
        return {
            navTabs: [
                {
                    path: "/",
                    name: "home",
                    label: "Home"
                },
                {
                    path: "/services",
                    name: "services",
                    label: "Services & Prices"
                },
                {
                    path: "/travelGuides",
                    name: "travelGuides",
                    label: "Travel Guides"
                },
                {
                    path: "/bookingAppointment",
                    name: "bookingAppointment",
                    label: "Appointments"
                },
                {
                    path: "/trustpilot",
                    name: "review",
                    label: "Reviews"
                },
                {
                    path: "/people",
                    name: "people",
                    label: "People"
                },

                {
                    path: "/FAQs",
                    name: "FAQs",
                    label: "FAQs"
                },
                {
                    path: "#",
                    name: "about",
                    label: "About Us"
                },

            ]
        }
    },
    data() {
        return {
            showMenu: false
        }
    },
    methods: {
        openRedirection() {
            window.open('https://uk.trustpilot.com/review/doctortoday.co.uk?utm_medium=trustbox&utm_source=MicroReviewCount')
        }
    }

}
</script>
