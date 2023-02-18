<template>
    <SideBar></SideBar>

    <div class="p-4 sm:ml-64 ">
        <div class="flex flex-row">
            <div class="flex mb-4 w-80 ">
                <select v-model="selected" @change="refreshServiceView" class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option disabled value="">Select an Service Catagory</option>
                    <option v-for="(option, index) in options" :key="index" :value="option.bind_id">{{ option.serviceName }}</option>
                </select>
            </div>

            <button type="button" @click="handlerDialog" 
                class="text-white w-50 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                <svg fill="none" class="w-5 h-5 mr-2 -ml-1" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
                Add Service Detail
            </button>
        </div>

        <div class="flex m-6 text-black">
            {{ selected }}
        </div>
        

        <div class="flex">
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
        
       
    </div>
</template>


<script>
import DataSubService from '../dataRoutes/DataSubService'
import DataService from '../dataRoutes/DataService';

import SideBar from './SideBar.vue'
import { reactive, ref } from "vue";

export default {
    components:{
        SideBar
    },
    data() {
        return {
            subServiceList: "",
            selected: null,
            options: ""
        }
    },
    
    async created() {
        console.log(this.$store.getters.isLoggedIn);
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push('/login');
        }
    },

    mounted() {
        this.getDefaultSelected();
        this.refreshServiceView();
    },
    methods: {
        getDefaultSelected() {
            DataService.get()
                .then(response => {
                    this.options = response.data;
                    console.log(this.options);
                    this.selected = this.options[0].bind_id;
                    console.log("default bind id is " + this.selected);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        refreshServiceView() {
            DataSubService.get(this.selected)
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
            DataSubService.delete(this.selected, data)
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
            DataSubService.swap(this.selected, data)
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
            DataSubService.swap(this.selected,data)
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
