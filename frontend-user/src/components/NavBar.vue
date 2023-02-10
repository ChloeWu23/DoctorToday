<template>
    <div class="z-100">
        <div @click="showMenu = !showMenu" class="justify-end block md:hidden">
            <navButton></navButton>
        </div>
        <div class="w-full block md:flex md:items-center md:w-auto" :class="showMenu ? 'flex' : 'hidden'">
            <ul class="md:flex md:items-center">
                <div class="text-sm md:text-base lg:flex-grow" v-for="tab in navTabs" :key="tab.name">
                    <li class="md:mx-4 md:my-0 my-6 text-white relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 
                before:bg-white before:block before:hover:scale-x-100 before:scale-x-0
                before:transition before:ease-in-out before:duration-300">
                        <span v-if="tab.name === 'review'"><a @click="openRedirection()">{{ tab.label }}</a></span>
                        <span v-else-if="tab.name === 'about'">
                            <div class="relative group">
                                <button
                                    class="text-white md:text-blue-dark flex items-center group-hover:border-grey-light">
                                    <span class="mr-2">{{ tab.label }}</span>
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </button>
                                <div
                                    class="text-sky-700 absolute border z-2 border-t-0 rounded-b-md bg-slate-50 p-2 invisible group-hover:visible min-w-content">
                                    <RouterLink :to="tab.children[0].path" class="p-2 block hover:bg-grey-lighter">{{
                                        tab.children[0].label
                                    }}</RouterLink>
                                    <RouterLink :to="tab.children[1].path" class="p-2 block hover:bg-grey-lighter">{{
                                        tab.children[1].label
                                    }}</RouterLink>
                                </div>
                            </div>
                        </span>
                        <span v-else>
                            <RouterLink :to="tab.path" class="text-white">{{ tab.label }}</RouterLink>
                        </span>
                    </li>
                </div>
            </ul>
        </div>
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
                    label: "Home",
                    children: []
                },
                {
                    path: "/services",
                    name: "services",
                    label: "Services & Prices",
                    children: []
                },
                {
                    path: "/travelGuides",
                    name: "travelGuides",
                    label: "Travel Guides",
                    children: []
                },
                {
                    path: "/bookingAppointment",
                    name: "bookingAppointment",
                    label: "Appointments",
                    children: []
                },
                {
                    path: "/trustpilot",
                    name: "review",
                    label: "Reviews",
                    children: []
                },
                {
                    path: "/FAQs",
                    name: "FAQs",
                    label: "FAQs",
                    children: []
                },
                {
                    path: "#",
                    name: "about",
                    label: "About Us",
                    children: [
                        {
                            path: "/findUs",
                            name: "findUs",
                            label: "Find Us",
                            children: []
                        },
                        {
                            path: "/people",
                            name: "people",
                            label: "People",
                            children: []
                        }
                    ]
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

<style>
#aboutUs:checked~#aboutUsMenu {
    opacity: 1;
}
</style>
