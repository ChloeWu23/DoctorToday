<template>
    <div class="w-full"></div>
    <div class="m-10 min-w-fit max-w-sm md:max-w-lg">
        <p class="m-2">At Doctor Today we offer a wide range of medical services, the most frequently requested of which
            fall into the following categories.</p>
        <p class="m-2">Please <span class="text-[#143B71] font-semibold">click a category name</span> to skip directly
            to detailed service and pricing information</p>
    </div>
    <div class="m-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3 divide-x grid-auto-flow: column">
        <div v-for="service in fullServices" :key="service.serviceName.replace(/\s+/g, '-').toLowerCase()">
            <div class="hover:bg-[#143B71] delay-100 text-[#143B71] hover:text-white bg-contain bg-no-repeat bg-right-bottom bg-[#143B71]/10 p-4 shadow-md h-full border-t-4 border-[#143B71]"
                :style="imgUrl(service.image)">
                <NuxtLink :to="'services/' + service.serviceName.replace(/\s+/g, '-').toLowerCase()">
                    <p class="font-bold">
                        {{ service.serviceName }}
                    </p>
                    <p class="w-full border border-[#143B71]/50 my-2"></p>
                    <div class="divide-y divide-dashed text-sm xl:text-base py-2">
                        <div>{{ service.description_1 }}</div>
                        <div>{{ service.description_2 }}</div>
                        <div>{{ service.description_3 }}</div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from '../dataRoutes/DataService';

export default {
    data() {
        return {
            fullServices: '',
        }
    },
    mounted() {
        DataService.get()
            .then(response => {
                console.log(response.data);
                this.fullServices = response.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        imgUrl(name) {
            try {
                return { 'background-image': 'url(' + name + ')' }
            } catch (error) {
                return { 'background-image': 'url(assets/services/gp-consultations.png)' }
            }
        }
    }
}
</script>