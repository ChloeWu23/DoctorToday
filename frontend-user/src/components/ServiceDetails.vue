<template>
    <div class="h-full md:w-[48rem] lg:w-[60rem] shadow-md m-4 md:m-8">
        <div class="w-full">
            <details class="open:bg-gray-100 duration-300 w-full" v-for="item in this.ServiceDetails">
                <summary
                    class="px-5 py-3 text-lg cursor-pointer hover:bg-gray-100 border border-2 flex justify-between items-center w-full text-sm md:text-base">
                    <div class="p-2 text-sky-700 w-3/4">
                        <div class="break-words">{{ item.sub_service_name }}</div>
                    </div>
                    <p class="p-2 pr-10 text-sky-700">£{{ item.price }}</p>
                </summary>
                <div class="bg-white p-8 text-sm whitespace-pre-line">
                    {{ item.description }}
                </div>
            </details>
        </div>
    </div>
</template>

<script>
import DataService from '../dataRoutes/DataService';
import DataSubService from '../dataRoutes/DataSubService';
import { useRoute } from 'vue-router'
import { ref } from 'vue'

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

<style>
details>summary {
    list-style: none;
}

details summary::-webkit-details-marker {
    display: none;
}

details summary::after {
    content: '+';
    font-size: 2em;
    color: slategrey
}

details[open] summary::after {
    content: "-";
}
</style>