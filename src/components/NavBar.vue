<template>
    <div class="flex items-center text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Doctor Today | Private Medical Centre</span>
    </div>
    <div @click="showMenu = !showMenu" class="justify-end block md:hidden">
        <navButton></navButton>
    </div>
    <div class="w-full block md:flex md:items-center md:w-auto" :class="showMenu?'flex':'hidden'">
        <ul class="md:flex md:items-center md:px-0 md:pb-0 pb-4">
            <div class="text-sm lg:flex-grow" v-for="tab in navTabs" :key="tab.name">
                <li class="md:mx-4 md:my-0 my-6 text-white"><a :href="tab.path">{{ tab.label }}</a></li>
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
                    path: "#/services",
                    name: "services",
                    label: "Services & Prices"
                },
                {
                    path: "#/appointment",
                    name: "appointments",
                    label: "Appointments"
                },

                {
                    path: "#/travelGuides",
                    name: "travelGuides",
                    label: "Travel Guides"
                }
            ]
        }
    },
    data() {
        return {
            showMenu: false
        }
    }

}
</script>
