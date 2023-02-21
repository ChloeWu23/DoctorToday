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
            Add Service
        </button>

        <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
            :auto-upload="false" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="upldchange"
            ref="upload">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

        <el-button type="primary" @click="uploadImage">UP</el-button>

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
                            <button @click="deleteService(serviceInfo.service_cat_id)"
                                class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                            <button @click="swapServicesDown(serviceInfo.service_cat_id)"
                                class="font-medium text-green-600 dark:text-green-500 hover:underline">Down</button>
                            <button @click="swapServicesUp(serviceInfo.service_cat_id)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Up</button>
                            <button @click="openSubServiceDialog"
                                class="font-medium text-pink-600 dark:text-blue-500 hover:underline">Add
                                sub-service</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <test v-model="dialogFormVisible" v-if="dialogFormVisible" @refresh-callback="refreshServiceView" />
        <test />

        <SubServiceDialog v-model="subServiceVisible" v-if="subServiceVisible" :service_cat_id=this.service_cat_id>
        </SubServiceDialog>

    </div>
</template>


<script>
import DataService from '../dataRoutes/DataService';
import UploadService from '../dataRoutes/DataUpload';
import test from './dialog.vue'
import SubServiceDialog from './SubServiceDialog.vue';
import SideBar from './SideBar.vue'
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";

export default {
    components: {
        test,
        SubServiceDialog,
        SideBar,
        Plus
    },

    data() {
        return {
            servicesInfo: "",
            dialogFormVisible: false,
            subServiceVisible: false,
            service_cat_id: 0,
            dialogImageUrl: '',
            dialogVisible: false,
            baseurl: '',
            imageUrl: '', // 预览图片地址
            files: [], // 复刻文件数据
            url: '' // 因为auto-upload元素，action设置为空
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
        const subServiceVisible = ref(false);

        const handlerDialog = () => {
            dialogFormVisible.value = true;
        };
        const openSubServiceDialog = () => {
            subServiceVisible.value = true;
        };

        return {
            dialogFormVisible,
            subServiceVisible,
            handlerDialog,
            openSubServiceDialog,

        };
    },

    mounted() {
        DataService.get()
            .then(response => {
                console.log(response.data);
                this.servicesInfo = response.data;
            })
            .catch(err => {
                console.log(err);
            });
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
        deleteService(serviceId) {
            var data = {
                service_cat_id: serviceId
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
        swapServicesDown(serviceId) {
            var data = {
                id_1: serviceId,
                id_2: serviceId + 1
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
        swapServicesUp(serviceId) {
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
        addSubService(service_cat_id) {
            this.service_cat_id = service_cat_id
            this.subServiceVisible = true;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },

        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        uploadImage() {
            // 判断是否存在预览图片信息,才执行post请求
            if (this.files.length !== 0) {
                // 赋值给formData
                let formData = new FormData()
                formData.append('file', this.files)
                // var data = {
                //     files: this.files
                // };
                // POST接口请求
                UploadService.upload(formData);
            } else {
                // 没有预览图片文件处理
                this.$message({
                    message: 'Image can not be null!',
                    type: 'error',
                    duration: 1500
                })
            }
            // if (this.files.length !== 0) {
            //     // 赋值给formData
            //     let formData = new FormData()
            //     formData.append('file', this.files)
            //     // POST接口请求
            //     axios.post('/api/upload', formData, {
            //         headers: { 'Content-Type': 'multipart/form-data' }
            //     })
            //         .then((res) => {
            //             console.log('success')
            //             console.log(res)
            //             this.baseurl = res.data.filename
            //         })
            //         .catch((error) => {
            //             console.log('false')
            //             console.log(error)
            //         })
            // } else {
            //     // 没有预览图片文件处理
            //     this.$message({
            //         message: 'Please upload image!',
            //         type: 'error',
            //         duration: 1500
            //     })
            // }
        },
        upldchange(file) {
            // 文件格式大小判断处理
            //   const isJPG = file.raw.type === 'image/jpeg'
            //   const isLt2M = file.raw.size / 1024 / 1024 < 2

            //   if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!')
            //     return
            //   }
            //   if (!isLt2M) {
            //     this.$message.error('上传头像图片大小不能超过 2MB!')
            //     return
            //   }

            // 格式无误后，预览文件处理
            this.imgSaveToUrl(file)
            // 复刻文件信息
            this.files = file.raw
            console.log(this.files)
        },
        imgSaveToUrl(file) {
            // 获取上传图片的本地URL，用于上传前的本地预览，转换后的地址为 blob:http://xxx/7bf54338-74bb-47b9-9a7f-7a7093c716b5
            this.imageUrl = URL.createObjectURL(file.raw)
            console.log('Image preview url: ', this.imageUrl)
        }

    }

}
</script>
