<template>
    <div class="w-full h-full shadow-md accordion accordion-flush" id="accordionSideBar">
        <ul class="w-full text-sm accordion-item border-sky-700 hover:bg-gray-100" v-for="item in servicesDetails">
            <div class="accordion-header">
                <button class="accordion-button flex items-center text-left w-full transition focus:outline-none p-2"
                    type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + item.id" aria-expanded="true"
                    aria-controls="'#collapse' + item.id">
                    <div class="grid grid-cols-5 w-full">
                        <div class="col-span-3 p-2 text-sky-700">{{ item.name }}</div>
                        <span></span>
                        <p class="p-2 text-sky-700 ">£{{ item.price }}</p>
                    </div>
                </button>
            </div>
            <div class="accordion-collapse collapse" :id="'collapse' + item.id" aria-labelledby="'#collapse' + item.id"
                data-bs-parent="#accordionSideBar">
                <div class="accordion-body">{{ item.description }}</div>
            </div>
        </ul>
    </div>
</template>

<script>
import services from '../assets/config.json'
import 'tw-elements';

export default {
    data() {
        return {
            servicesDetails: services.servicesDetails
        }
    }
}

</script>

<style>
/* .accordion-button.collapsed::after {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z' fill='currentColor' /%3E%3Cpath d='M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z' fill='currentColor' /%3E%3Cpath d='M18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z' fill='currentColor' /%3E%3C/svg%3E");
} */
</style>
