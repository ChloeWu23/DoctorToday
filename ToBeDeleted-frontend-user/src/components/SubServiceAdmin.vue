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

            <button type="button" @click="subServiceVisible = true" 
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
            {{ subServiceVisible }}
            {{ subServiceList.length }}
        </div>
        

        <div class="flex">
            <div class="shadow-md sm:rounded-lg w-full">
                <table class="table-auto w-full bg-blue-200 text-sm text-left text-gray-700 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
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
                    <tbody class="h-6 bg-black">
                        <!-- <tr v-for="subService in subServiceList"
                            class="border-b hover:bg-gray-50 h-10">
                            <td class="px-6 py-4" v-html="subService.description"></td>
                        </tr> -->
                        
                        <tr v-for="subService in subServiceList"
                            class="bg-white h-6 border-b hover:bg-gray-50">
                            
                            <!-- <th scope="row" class="px-6 py-4  font-medium text-gray-900 whitespace-nowrap">
                                {{ subService.sub_service_name }}
                            </th> -->
                            <td class="px-6 py-4 font-bold">
                                {{ subService.sub_service_name }}
                            </td>

                            <td>
                                <div v-html="subService.description_truncate" class="px-6 py-4">
                                </div>
                            </td>
                            
                            <td class="px-6 py-4">
                                {{ subService.price }}
                            </td>
                            
                            <td class="flex items-center px-6 py-4 space-x-3">
                                <button @click="deleteSubService(subService.cat_id, subService.sub_service_id)"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline w-7 hover:bg-gray-200 rounded">
                                    <img src="@/assets/icon-delete.svg" alt="Icon" class="mr-2" />
                                </button>
                                <!-- <button @click="swapSubServiceDown(subService.cat_id, subService.sub_service_id)"
                                    class="font-medium text-green-600 dark:text-green-500 hover:underline">Down</button> -->
                                <button @click="swapSubServiceUp(subService.cat_id, subService.sub_service_id)"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline w-6 hover:bg-gray-200 rounded">
                                    <img src="@/assets/icon-up-arrow.svg" alt="Icon" class="mr-2" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <SubServiceDialog v-model="subServiceVisible" v-if="subServiceVisible" :bind_id = "selected" @update:modelValue="refreshServiceView"></SubServiceDialog>
        
        </div>
        
       
    </div>
</template>


<script>
import DataSubService from '../dataRoutes/DataSubService'
import DataService from '../dataRoutes/DataService';

import SubServiceDialog from './SubServiceDialog.vue'; 
import SideBar from './SideBar.vue';
import { reactive, ref } from "vue";


export default {
    components:{
        SideBar,
        SubServiceDialog
    },
    data() {
        return {
            subServiceList: "",
            selected: null,
            options: "",
            subServiceVisible: false
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
        truncatedHtml(data) {
            const maxLength = 300;
            const html = data.description;
            // const html = this.description; // replace with the name of your variable containing the HTML
            if (html.length > maxLength) {
                data.description_truncate = html.slice(0, maxLength) + '...';
                return data;
            } else {
                return data;
            }
        },

        refreshServiceView() {
            console.log("refresh the data");
            DataSubService.get(this.selected)
                .then(response => {
                    console.log(response.data);
                    this.subServiceList = response.data;
                    this.subServiceList.map(data => this.truncatedHtml(data))
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
            // check is not the last row
            if (sub_service_id + 1 === this.subServiceList.length) {
                console.log("Invalid: you want to swap down the last row")
                return;
            }

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
            // check is not the first row
            if (sub_service_id === 0) {
                console.log("Invalid: you want to swap up the first row")
                return;
            }

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

<style>
.tbody-with-max-height {
  max-height: 30px;
  overflow-y: hidden;
  /* set a maximum height for the table body */
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>