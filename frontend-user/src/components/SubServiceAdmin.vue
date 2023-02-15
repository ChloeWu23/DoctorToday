<template>
    <SideBar></SideBar>

    <div class="p-4 sm:ml-64 ">

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Short Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Sub-service Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="subService in subServiceList"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ subService.short_name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ subService.sub_service_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ subService.description }}
                        </td>
                        <td class="px-6 py-4">
                            {{ subService.price }}
                        </td>
                        <td class="flex items-center px-6 py-4 space-x-3">
                            <button @click="deleteSubService(subService.cat_id, subService.sub_service_id)"
                                class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                            <button @click="swapSubServiceDown(subService.cat_id, subService.sub_service_id)"
                                class="font-medium text-green-600 dark:text-green-500 hover:underline">Down</button>
                            <button @click="swapSubServiceUp(subService.cat_id, subService.sub_service_id)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Up</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
       
    </div>
</template>


<script>
import DataSubService from '../dataRoutes/DataSubService'
import SideBar from './SideBar.vue'
import { reactive, ref } from "vue";

export default {
    components:{
        SideBar
    },
    data() {
        return {
            subServiceList: "",
        }
    },
    
    async created() {
        console.log(this.$store.getters.isLoggedIn);
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push('/login');
        }
    },

    mounted() {
        DataSubService.get()
        .then(res => {
            this.subServiceList = res.data;
            console.log("print out this.peopleList")
            console.log(this.peopleList)
        })
        .catch(err => {
            console.log("Error: cannot retrieve people data");
        })
    },
    methods: {
        refreshServiceView() {
            DataSubService.get()
                .then(response => {
                    console.log(response.data);
                    this.subServiceList = response.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteSubService(cat_id, sub_service_id) {
            var data = {
                sub_service_id: sub_service_id
            };
            DataSubService.delete(cat_id, data)
                .then(res => {
                    console.log(res.data);
                    this.refreshServiceView();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        swapSubServiceDown(cat_id, sub_service_id) {
            var data = {
                id_1: sub_service_id,
                id_2: sub_service_id + 1
            };
            DataSubService.swap(cat_id, data)
                .then(res => {
                    console.log(res.data);
                    this.refreshServiceView();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        swapSubServiceUp(cat_id, sub_service_id) {
            var data = {
                id_1: sub_service_id,
                id_2: sub_service_id - 1
            };
            DataSubService.swap(cat_id,data)
                .then(res => {
                    console.log(res.data);
                    this.refreshServiceView();
                })
                .catch(err => {
                    console.log(err);
                });
        },
    }

}
</script>
