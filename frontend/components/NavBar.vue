<template>
    <div class="z-100">
        <div @click="showMenu = !showMenu" class="justify-end block md:hidden">
            <navButton></navButton>
        </div>
        <div class="w-full block md:flex md:items-center md:w-auto " :class="showMenu ? 'flex' : 'hidden'">
            <ul class="md:flex md:items-center w-full xl:ml-[120px] lg:mx-10">
                <div class="text-sm md:text-base lg:flex-grow md:mx-2 lg:mx-3 xl:mx-4" v-for="tab in navTabs" :key="tab.name">
                    <li class="md:my-0 my-6 text-black hover:text-blueLight relative">
                        <span v-if="tab.name === 'review'"><a @click="openRedirection()">{{ tab.label }}</a></span>
                        <span v-else-if="tab.name === 'search'">
                            <div class="border-2 border-blueDark bg-gray-200 py-1 px-2 rounded text-gray-500">{{ tab.label }}</div>
                        </span>
                        <span class="span md:hidden" v-else-if="tab.name === 'tel'">
                            <div class="">Tel:020 7433 1444</div>
                            <div class="">enquiries@doctortoday.co.uk</div>
                        </span>
                        <span @click="showMenu = !showMenu" v-else>
                            <!-- todo: @click="showMenu = false" -->
                            <RouterLink :to="tab.path" class=""> 
                                {{ tab.label }}
                            </RouterLink>
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
                    path: "/AboutFaq",
                    name: "FAQs",
                    label: "FAQs",
                    children: []
                },
                {
                    path: "/aboutPeople",
                    name: "people",
                    label: "People",
                    children: []
                },
                {
                    path: "/findUs",
                    name: "findUs",
                    label: "Find Us",
                    children: []
                },
                {
                    path: "/search",
                    name: "search",
                    label: "Search", // TODO
                    children: [] 
                },
                {
                    name: "tel",
                    label: "Tel 020 7433 1444", // TODO
                    children: [] 
                }
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
            window.open('https://uk.trustpilot.com/review/doctortoday.co.uk?utm_medium=trustbox&utm_source=MicroReviewCount');
        }
    }

}
</script>

<style>
#aboutUs:checked~#aboutUsMenu {
    opacity: 1;
}
</style>
