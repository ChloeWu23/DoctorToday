<template>
    <div class="h-full md:w-[48rem] lg:w-[60rem] shadow-md mx-auto lg:max-screen-lg">
        <SembleButton v-if=sembleFormCode :sembleForm=sembleFormCode />
        <div class="w-full">
            <details class="open:bg-gray-100 duration-300 w-full" v-for="item in this.serviceDetails">
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
            sembleFormCode: ''
        }
    },
    async setup() {
        const route = useRoute()
        console.log(route.params.ServiceName)
        try {
            const { data: fullServices, pending, error, refresh } = await useAsyncData(
                () => $fetch("https://doctor-today-back.herokuapp.com/service")
            )
            // console.log(fullServices.value)

            let serviceId = ref()
            let sembleFormCode = ref()
            for (let i = 0; i < fullServices.value.length; i++) {
                if (fullServices.value[i].serviceName.replace(/\s+/g, '-').toLowerCase() === route.params.ServiceName) {
                    serviceId.value = fullServices.value[i].bind_id
                    sembleFormCode.value = fullServices.value[i].appointment_iframe
                    break;
                }
            }

            const { data: serviceDetails } = await useAsyncData(
                () => $fetch("https://doctor-today-back.herokuapp.com/service/" + serviceId.value, {
                    immediate: false,  // prevent the request from firing immediately
                    watch: [serviceId] // watch reactive sources to auto-refresh
                })
            )

            return { serviceDetails, sembleFormCode }
        } catch (err) {
            console.log(err)
            console.log(route.params.ServiceName)
        }
    }

}
</script>
