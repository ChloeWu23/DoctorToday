<template>
    <div class="max-w-xl m-2 md:m-8 h-full shadow-md accordion" id="accordionSideBar">
        <ul class="text-sm accordion-item border-sky-700 hover:bg-gray-100" v-for="item in servicesDetails">
            <div class="accordion-header">
                <button class="accordion-button items-center w-full text-left transition focus:outline-none p-2"
                    type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + item.id" aria-expanded="true"
                    aria-controls="'#collapse' + item.id">
                    <div class="grid grid-cols-5">
                        <div class="col-span-3 text-sky-700">{{ item.name }}</div>
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
