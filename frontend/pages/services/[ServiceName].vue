<template>
    <div class="h-full md:w-[48rem] lg:w-[60rem] shadow-md mx-auto lg:max-screen-lg" v-if="serviceDetails">
        <SembleButton v-if=sembleFormCode :sembleForm=sembleFormCode />
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
                    <p v-html="item.description"></p>
                </div>
            </details>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    setup() {
        const route = useRoute()
        console.log(route.params.ServiceName)
        try {
            let serviceId = ref()
            let sembleFormCode = ref()
            let serviceDetails = ref([])
            const { data: fullServices } = useFetch(
                "https://doctor-today-back.herokuapp.com/service")
                .then((res) => {
                    // console.log(res.data.value)
                    for (let i = 0; i < res.data.value.length; i++) {
                        if (res.data.value[i].serviceName.replace(/\s+/g, '-').toLowerCase() === route.params.ServiceName) {
                            console.log(res.data.value[i].bind_id)
                            serviceId.value = res.data.value[i].bind_id
                            sembleFormCode.value = res.data.value[i].appointment_iframe
                            break;
                        }
                    }
                    return serviceId
                }).then((id) => {
                    // console.log(id)
                    $fetch("https://doctor-today-back.herokuapp.com/service/" + id.value)
                        .then((res) => {
                            res.forEach((item) => {
                                console.log(item)
                                serviceDetails.value.push(item)
                            })
                        })
                })
            return { sembleFormCode, serviceId, serviceDetails }
        } catch (err) {
            console.log(err)
            console.log(route.params.ServiceName)
        }
    }

}
</script>
