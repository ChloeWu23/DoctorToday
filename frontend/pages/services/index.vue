<template>
    <div class="h-full xl:max-w-screen-xl place-self-center md:p-4 mx-auto">
        <div class="w-full"></div>
        <div class="min-w-fit max-w-screen-sm md:max-w-screen-lg">
            <p class="m-4">At Doctor Today we offer a wide range of medical services, the most frequently requested of which
                fall into the following categories.</p>
            <p class="m-4">Please <span class="text-[#143B71] font-semibold">click a category name</span> to skip directly
                to detailed service and pricing information</p>
        </div>
        <div
            class="justify-self-center grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x grid-auto-flow: column">
            <div v-for="service in fullServices" :key="service.serviceName.replace(/\s+/g, '-').toLowerCase()" class="mx-4">
                <div class="hover:bg-[#143B71] delay-100 text-[#143B71] hover:text-white bg-contain bg-no-repeat bg-right-bottom bg-[#143B71]/10 p-4 shadow-md h-full border-t-4 border-[#143B71]"
                    :style="imgUrl(service.image)">
                    <NuxtLink :to="'services/' + service.serviceName.replace(/\s+/g, '-').toLowerCase()">
                        <p class="font-bold">
                            {{ service.serviceName }}
                        </p>
                        <p class="w-full border border-[#143B71]/50 my-2"></p>
                        <div class="divide-y divide-dashed text-sm xl:text-base py-2">
                            <div v-if="service.description_1">{{ service.description_1 }}</div>
                            <div v-if="service.description_2">{{ service.description_2 }}</div>
                            <div v-if="service.description_3">{{ service.description_3 }}</div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    data() {
        return {
            fullServices: '',
        }
    },
    async setup() {
        const { data: fullServices, pending, error, refresh } = await useAsyncData(
            () => $fetch("https://doctor-today-back.herokuapp.com/service")
        )
        return { fullServices };
    },
    methods: {
        imgUrl(imageUrl) {
            try {
                return { 'background-image': 'url(' + imageUrl + ')' }
            } catch (error) {
                return { 'background-image': 'url(assets/services/gp-consultations.png)' }
            }
        }
    }
}
</script>