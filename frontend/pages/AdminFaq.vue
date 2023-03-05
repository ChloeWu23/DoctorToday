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
            Add FAQ
        </button>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Question
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Answer
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="faq in faqList" :key="faq.faq_id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                        <td class="flex items-center px-10 py-4 space-x-3">
                            {{ faq.question }}
                        </td>

                        <td>
                            <div v-html="faq.answer" class="px-6 py-4">
                            </div>
                        </td>

                        <td class="flex items-center px-6 py-4 space-x-3">

                            <button @click="emitEditDialog(faq)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline w-6 hover:bg-gray-200 rounded">
                                <img src="../assets/admin_portal/icon-edit.svg" alt="Icon" class="mr-2" />
                            </button>
                            
                            <button @click="swapFAQUp(faq.faq_id)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline w-6 hover:bg-gray-200 rounded">
                                <img src="../assets/admin_portal/icon-up-arrow.svg" alt="Icon" class="mr-2" />
                            </button>

                            <button @click="deleteFAQ(faq.faq_id)"
                                class="font-medium text-red-600 dark:text-red-500 hover:underline w-7 hover:bg-gray-200 rounded">
                                <img src="../assets/admin_portal/icon-delete.svg" alt="Icon" class="mr-2" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <AddFaqDialog 
            v-model="dialogFormVisible" 
            v-if="dialogFormVisible" 
            :isEdit = "isEdit"
            :data_faq_id = "data_faq_id"
            :data_question = "data_question"
            :data_answer = "data_answer"
        ></AddFaqDialog >
    </div>
</template>


<script>
import DataFAQ from '../dataRoutes/DataFAQ'
import { reactive, ref } from "vue";

definePageMeta({
  layout: "adminPortal",
});

export default {
    data() {
        return {
            faqList: "",
            dialogFormVisible: false,

            isEdit: false,

            data_faq_id: "",
            data_question: "",
            data_answer: ""
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
        DataFAQ.get()
            .then(res => {
                this.faqList = res.data;
            })
            .catch(err => {
                console.log("Error: cannot retrieve people data");
            })
    },
    methods: {
        refreshServiceView() {
            DataFAQ.get()
                .then(response => {
                    console.log(response.data);
                    this.faqList = response.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteFAQ(faq_id) {
            //console.log("here" + serviceId)
            var data = {
                faq_id: faq_id
            };
            //console.log("in vue: " + data.service_cat_id)
            DataFAQ.delete(data)
                .then(res => {
                    console.log(res.data);
                    this.refreshServiceView();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        swapFAQUp(faq_id) {
            var data = {
                id_1: faq_id,
                id_2: faq_id - 1
            };
            DataFAQ.swap(data)
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

            this.data_faq_id = "";
            this.data_question = "";
            this.data_answer = "";

            this.dialogFormVisible = true;
        }, 
        emitEditDialog(faq) {
            this.isEdit = true;

            this.data_faq_id = faq.faq_id;
            this.data_question = faq.question;
            this.data_answer = faq.answer;

            this.dialogFormVisible = true;
        }
    }

}
</script>