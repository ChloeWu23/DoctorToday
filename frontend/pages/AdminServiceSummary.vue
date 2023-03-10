<template>
    <SideBar></SideBar>

    <div class="p-4 sm:ml-64 ">
        <button type="button" @click="emitAddDialog"
            class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

            <svg fill="none" class="w-5 h-5 mr-2 -ml-1" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
            </svg>
            Add Service
        </button>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Service Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description1
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description2
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description3
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="serviceInfo in servicesInfo"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ serviceInfo.serviceName }}
                        </th>
                        <td class="px-6 py-4">
                            {{ serviceInfo.description_1 }}
                        </td>
                        <td class="px-6 py-4">
                            {{ serviceInfo.description_2 }}
                        </td>
                        <td class="px-6 py-4">
                            {{ serviceInfo.description_3 }}
                        </td>
                        <td class="flex items-center px-6 py-4 space-x-3">
                            <button @click="emitEditDialogue(serviceInfo)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline w-6 hover:bg-gray-200 rounded">
                                <img src="../assets/admin_portal/icon-edit.svg" alt="Icon" class="mr-2" />
                            </button>

                            <button @click="swapServicesUp(serviceInfo.service_cat_id)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline w-6 hover:bg-gray-200 rounded">
                                <img src="../assets/admin_portal/icon-up-arrow.svg" alt="Icon" class="mr-2" />
                            </button>

                            <button @click="deleteService(serviceInfo.service_cat_id, serviceInfo.image)"
                                class="font-medium text-red-600 dark:text-red-500 hover:underline w-7 hover:bg-gray-200 rounded">
                                <img src="../assets/admin_portal/icon-delete.svg" alt="Icon" class="mr-2" />
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <Dialog v-model="dialogFormVisible" v-if="dialogFormVisible" :isEdit="isEdit"
            :data_service_cat_id="data_service_cat_id" :data_serviceName="data_serviceName"
            :data_description_1="data_description_1" :data_description_2="data_description_2"
            :data_description_3="data_description_3" :data_image="data_image" :data_iframe="data_iframe"></Dialog>

    </div>
</template>


<script>
import DataService from '../dataRoutes/DataService';
import { reactive, ref } from "vue";

definePageMeta({
    layout: "adminPortal",
});

export default {
    data() {
        return {
            servicesInfo: "",
            dialogFormVisible: false,
            service_cat_id: 0,

            isEdit: false,

            data_service_cat_id: "",
            data_serviceName: "",
            data_description_1: "",
            data_description_2: "",
            data_description_3: "",
            data_image: "",
            data_iframe: ""
        }
    },

    async created() {
        if (process.client) {
            const userID = localStorage.getItem('userID');
            if (userID) {
                console.log("pass admin authentication")
            }
        } else {
            // This code runs on the server-side
            console.log("Not pass the admin authentication! ");
            this.$router.push('/AdminLogin');
        }
    },

    watch: {
        dialogFormVisible(newValue, oldValue) {
            this.refreshServiceView();
        }
    },

    setup() {
        const dialogFormVisible = ref(false);



        return {
            dialogFormVisible,
        };
    },

    mounted() {
        this.refreshServiceView();
    },
    methods: {
        refreshServiceView() {
            DataService.get()
                .then(response => {
                    console.log(response.data);
                    this.servicesInfo = response.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteService(serviceId, image) {
            const objectKey = image.substring(image.indexOf('service/'));
            console.log('in frontend' + objectKey)
            var data = {
                service_cat_id: serviceId,
                objectKey: objectKey
            };
            DataService.delete(data)
                .then(res => {
                    console.log(res.data);
                    this.refreshServiceView();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        swapServicesUp(serviceId) {
            // check is not the first row
            if (serviceId === 0) {
                console.log("Invalid: you want to swap up the first row")
                return;
            }

            var data = {
                id_1: serviceId,
                id_2: serviceId - 1
            };
            DataService.swap(data)
                .then(res => {
                    console.log(res.data);
                    this.refreshServiceView();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        emitAddDialog() {
            this.isEdit = false;

            this.data_service_cat_id = "",
                this.data_serviceName = "";
            this.data_description_1 = "";
            this.data_description_2 = "";
            this.data_description_3 = "";
            this.data_image = "";
            this.data_iframe = "";

            this.dialogFormVisible = true;
        },

        emitEditDialogue(serviceInfo) {
            this.isEdit = true;

            this.data_service_cat_id = serviceInfo.service_cat_id;
            this.data_serviceName = serviceInfo.serviceName;
            this.data_description_1 = serviceInfo.description_1;
            this.data_description_2 = serviceInfo.description_2;
            this.data_description_3 = serviceInfo.description_3;
            this.data_image = serviceInfo.image;
            this.data_iframe = serviceInfo.appointment_iframe;

            this.dialogFormVisible = true;
        },

    }

}
</script>
