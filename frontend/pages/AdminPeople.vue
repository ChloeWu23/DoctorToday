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
            Add People
        </button>

        <div v-if="dialogFormVisible">True</div>
        <div v-else>False</div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Profile
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Independent
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Website
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="people in peopleList" :key="people.staff_id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ people.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ people.title }}
                        </td>
                        <td class="px-6 py-4">
                            {{ people.profile }}
                        </td>

                        <td>
                            <div v-html="people.description" class="px-6 py-4">
                            </div>
                        </td>

                        <td class="px-6 py-4">
                            {{ people.is_independent }}
                            <!-- TODO: display as svg icon  -->
                        </td>

                        <td class="px-6 py-4">
                            {{ people.website }}
                            <!-- TODO: display the link -->
                        </td>

                        <td class="flex items-center px-6 py-4 space-x-3">
                            <button @click="emitEditDialog(people)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline w-6 hover:bg-gray-200 rounded">
                                <img src="../assets/admin_portal/icon-edit.svg" alt="Icon" class="mr-2" />
                            </button>
                            
                            <button @click="swapPeopleUp(people.staff_id)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline w-6 hover:bg-gray-200 rounded">
                                <img src="../assets/admin_portal/icon-up-arrow.svg" alt="Icon" class="mr-2" />
                            </button>

                            <button @click="deletePeople(people.staff_id)"
                                class="font-medium text-red-600 dark:text-red-500 hover:underline w-7 hover:bg-gray-200 rounded">
                                <img src="../assets/admin_portal/icon-delete.svg" alt="Icon" class="mr-2" />
                            </button>                        
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <AddPeopleDialog 
            v-model="dialogFormVisible" 
            v-if="dialogFormVisible" 
            :isEdit = "isEdit"
            :data_staff_id = "EditItem.staff_id"
            :data_name = "EditItem.name"
            :data_title = "EditItem.title"
            :data_profile = "EditItem.profile"
            :data_description = "EditItem.description"
            :data_image = "EditItem.image"
            :data_website = "EditItem.website"
            :data_is_independent = "EditItem.is_independent"
        ></AddPeopleDialog>
    </div>
</template>


<script>

import DataPeople from '../dataRoutes/DataPeople'
import { reactive, ref } from "vue";

definePageMeta({
  layout: "adminPortal",
});

export default {
    data() {
        return {
            peopleList: "",
            dialogFormVisible: false,
            peopleDescription: "",

            isEdit: false,

            EditItem : {
                staff_id: "",
                name: "",
                title: "",
                profile: "",
                description: "",
                image: "",
                website: "",
                is_independent: "",
            }
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

        const handlerDialog = () => {
            dialogFormVisible.value = true;
        };

        return {
            dialogFormVisible,
            handlerDialog,
        };
    },

    mounted() {
        DataPeople.get()
            .then(res => {
                this.peopleList = res.data;
                console.log("print out this.peopleList")
                console.log(this.peopleList)
            })
            .catch(err => {
                console.log("Error: cannot retrieve people data");
            })
    },
    methods: {
        refreshServiceView() {
            DataPeople.get()
                .then(response => {
                    console.log(response.data);
                    this.peopleList = response.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deletePeople(staff_id) {
            //console.log("here" + serviceId)
            var data = {
                staff_id: staff_id
            };
            //console.log("in vue: " + data.service_cat_id)
            DataPeople.delete(data)
                .then(res => {
                    console.log(res.data);
                    this.refreshServiceView();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        swapPeopleUp(staff_id) {
            // check is not the first row
            if (staff_id === 0) {
                console.log("Invalid: you want to swap up the first row")
                return;
            }

            var data = {
                id_1: staff_id,
                id_2: staff_id - 1
            };
            DataPeople.swap(data)
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

            this.EditItem = {
                staff_id: "",
                name: "",
                title: "",
                profile: "",
                description: "",
                image: "",
                website: "",
                is_independent: "",
            };

            this.dialogFormVisible = true;
        },
        emitEditDialog(people) {
            this.isEdit = true;

            this.EditItem = people;

            this.dialogFormVisible = true;
        },
    }

}
</script>