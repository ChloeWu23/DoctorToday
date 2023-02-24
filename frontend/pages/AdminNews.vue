<template>
    <SideBar></SideBar>
    <div class="p-4 sm:ml-64 ">
        <button type="button" @click="handlerDialog"
            class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

            <svg fill="none" class="w-5 h-5 mr-2 -ml-1" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
            </svg>
            Add News
        </button>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Content
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="news in newsList" :key="news.title"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ news.title }}
                        </th>
                        <td>
                            <div v-html="news.content" class="px-6 py-4">
                            </div>
                        </td>

                        <td class="flex items-center px-6 py-4 space-x-3">
                            <!-- <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> -->
                            <button @click="deleteNews(news.news_id)"
                                class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                            <button @click="swapNewsDown(news.news_id)"
                                class="font-medium text-green-600 dark:text-green-500 hover:underline">Down</button>
                            <button @click="swapNewsUp(news.news_id)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Up</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <AddNewsDialog v-model="dialogFormVisible" v-if="dialogFormVisible" @refresh-callback="refreshServiceView" />
        <AddNewsDialog />
    </div>
</template>


<script>
import DataNews from '../dataRoutes/DataNews'
import AddNewsDialog from './AddNewsDialog.vue'
import { reactive, ref } from "vue";

export default {
    components: {
        AddNewsDialog,
        SideBar
    },

    data() {
        return {
            newsList: "",
            dialogFormVisible: false,
        }
    },

    async created() {
        console.log(this.$store.getters.isLoggedIn);
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push('/login');
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
        DataNews.get()
            .then(res => {
                this.newsList = res.data;
            })
            .catch(err => {
                console.log("Error: cannot retrieve people data");
            })
    },
    methods: {
        refreshServiceView() {
            DataNews.get()
                .then(response => {
                    console.log(response.data);
                    this.newsList = response.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteNews(news_id) {
            //console.log("here" + serviceId)
            var data = {
                news_id: news_id
            };
            //console.log("in vue: " + data.service_cat_id)
            DataNews.delete(data)
                .then(res => {
                    console.log(res.data);
                    this.refreshServiceView();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        swapNewsDown(news_id) {
            var data = {
                id_1: news_id,
                id_2: news_id + 1
            };
            DataNews.swap(data)
                .then(res => {
                    console.log(res.data);
                    this.refreshServiceView();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        swapNewsUp(news_id) {
            var data = {
                id_1: news_id,
                id_2: news_id - 1
            };
            DataNews.swap(data)
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