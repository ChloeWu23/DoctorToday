<template>
    <div class="h-full md:w-[48rem] lg:w-[60rem] shadow-md mx-auto lg:max-screen-lg" v-if="serviceDetails" id="pageContent">
        <SembleButton v-if="isLoaded && sembleFormCode" :sembleForm=sembleFormCode />
        <div class="w-full">
            <details class="open:bg-gray-100 duration-300 w-full" v-for="item in serviceDetails">
                <summary
                    class="px-5 py-3 text-lg cursor-pointer hover:bg-gray-100 border border-2 flex justify-between items-center w-full text-sm md:text-base">
                    <div class="p-2 text-sky-700 w-3/4">
                        <div class="break-words">{{ item.sub_service_name }}</div>
                    </div>
                    <p class="p-2 pr-10 text-sky-700">{{ item.price }}</p>
                </summary>
                <div class="bg-white p-8 text-sm whitespace-pre-line">
                    <p v-if="isLoaded" v-html="item.description" class="overflow-y-auto"></p>
                </div>
            </details>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isLoaded: false
        }
    },
    async setup() {
        const route = useRoute()
        console.log(route.params.ServiceName)

        let serviceId = ref()
        let sembleFormCode = ref()
        // let serviceDetails = ref([])
        const { data: serviceDetails, pending, error, refresh } = await useAsyncData("getServiceDetails", () =>
            $fetch("https://doctor-today-back.herokuapp.com/service")
                .then((res) => {
                    // console.log(res)
                    if (res.length) {
                        const isService = (item) => item.serviceName.replace(/\s+/g, '-').toLowerCase() === route.params.ServiceName
                        const service = res.find(isService)
                        if (service) {
                            serviceId.value = service.bind_id
                            sembleFormCode.value = service.appointment_iframe
                        }
                    }
                    else {
                        console.log("Error with fetching service summary, fallback to gp consultation & iframe code of all appointments")
                        serviceId.value = 0
                        sembleFormCode.value = '<iframe src="https://online-booking.semble.io/?token=59df46c901c3c1673ec018b4eec76f70ce63838c" frameborder="0" scrolling="auto"></iframe>'
                    }
                    return serviceId
                })
                .then((id) => {
                    return $fetch("https://doctor-today-back.herokuapp.com/service/" + id.value)
                })
                .catch(error => {
                    console.log(error)
                })
        )
        return { sembleFormCode, serviceId, serviceDetails };
    },
    mounted(){
        this.isLoaded = true;
    }

}
</script>
