<template>
    <div class="h-full md:w-[48rem] lg:w-[60rem] shadow-md mx-auto lg:max-screen-lg">
        <SembleButton v-if=sembleFormCode :sembleForm = sembleFormCode />
        <div class="w-full">
            <details class="open:bg-gray-100 duration-300 w-full" v-for="item in this.ServiceDetails">
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
import DataService from '../../dataRoutes/DataService';
import DataSubService from '../../dataRoutes/DataSubService';

export default {
    data() {
        return {
            sembleFormCode:'<iframe src="https://online-booking.semble.io/?token=59df46c901c3c1673ec018b4eec76f70ce63838c" class="h-full w-full border-0" frameborder="0" scrolling="auto"></iframe>'
        }
    },
    setup() {
        const route = useRoute()
        
        DataService.get()
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].serviceName.replace(/\s+/g, '-').toLowerCase() === route.params.ServiceName) {
                        serviceId.value = response.data[i].bind_id
                        console.log(response.data[i].appointment_iframe)
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
