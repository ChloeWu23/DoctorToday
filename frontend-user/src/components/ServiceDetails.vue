<template>
    <div class="md:my-4 w-full h-full shadow-md accordion accordion-flush" id="accordion">
        <ul class="w-full text-sm accordion-item border-sky-700 hover:bg-gray-100" v-for="item in this.ServiceDetails">
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
                <div class="accordion-body p-6" style="transition: color 0s">{{ item.description }}</div>
            </div>
        </ul>
    </div>
</template>

<script>
import DataService from '../dataRoutes/DataService';
import DataSubService from '../dataRoutes/DataSubService';
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import 'tw-elements';

export default {
    data() {
        return {
        }
    },
    setup() {
        const route = useRoute()
        let serviceId = ref()
        let ServiceDetails = ref([])
        DataService.get()
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].serviceName.replace(/\s+/g, '-').toLowerCase() === route.params.serviceName) {
                        serviceId.value = response.data[i].service_cat_id
                        break;
                    }
                }
            }).
            then(() => {
                DataSubService.get(serviceId.value)
                    .then(response => {
                        for (let i = 0; i < response.data.length; i++) {
                            ServiceDetails.value.push(response.data[i])
                        }
                        console.log(ServiceDetails.value)
                    })
            }
            ).catch(err => {
                console.log(err);
            });

        return { ServiceDetails }
    }

}
</script>