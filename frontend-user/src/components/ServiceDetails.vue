<template>
    <div>TODO: Send get request to backend to obtain subservices, prices and descriptions under this service: {{
        service
    }}</div>
    <div class="w-full h-full shadow-md accordion accordion-flush" id="accordion">
        <ul class="w-full text-sm accordion-item border-sky-700 hover:bg-gray-100" v-for="item in ServiceDetails">
            <div class="accordion-header">
                <button class="accordion-button flex items-center text-left w-full focus:outline-none p-2" type="button"
                    data-bs-toggle="collapse" :data-bs-target="'#collapse' + item.sub_service_id" aria-expanded="true"
                    aria-controls="'#collapse' + item.id">
                    <div class="grid grid-cols-5 w-full">
                        <div class="col-span-3 p-2 text-sky-700">{{ item.sub_service_name }}</div>
                        <span></span>
                        <p class="p-2 text-sky-700">£{{ item.price }}</p>
                    </div>
                </button>
            </div>
            <div class="accordion-collapse collapse transition-none" :id="'collapse' + item.sub_service_id"
                aria-labelledby="'#collapse' + item.id" data-bs-parent="#accordion">
                <div class="accordion-body p-4" style="transition: color 0s">{{ item.description }}</div>
            </div>
        </ul>
    </div>
</template>

<script>
import services from '../assets/config.json'
import DataService from '../dataRoutes/DataSubService';
import 'tw-elements';

export default {
    data() {
        return {
            service: this.$route.params.serviceName,
            ServiceDetails: services.ServiceDetails //to be replaced with a dataroute call
        }
    },
    mounted() {
        DataService.get(0)
            .then(response => {
                console.log(response.data);
                this.ServiceDetails = response.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
}

</script>

<style>
/* .accordion-button.collapsed::after {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z' fill='currentColor' /%3E%3Cpath d='M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z' fill='currentColor' /%3E%3Cpath d='M18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z' fill='currentColor' /%3E%3C/svg%3E");
} */
</style>
