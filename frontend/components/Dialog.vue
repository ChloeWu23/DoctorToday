<template>
    <el-dialog :model-value="dialogFormVisible" title="Adding New Service" :show-close="false"
        :close-on-click-modal="false">

        <el-form>

            <el-form-item label="Service Category Name">
                <el-input v-model="newService.name" autocomplete="off">
                    {{ newService.name }}
                </el-input>
            </el-form-item>

            <p class="text-sm ml-8">(should not be same as the previous)</p>


            <el-form-item label="Description 1" prop="desc">
                <el-input v-model="newService.desc1" type="textarea">{{ newService.desc1 }}</el-input>
            </el-form-item>

            <el-form-item label="Description 2" prop="desc">
                <el-input v-model="newService.desc2" type="textarea">{{ newService.desc2 }}</el-input>
            </el-form-item>

            <el-form-item label="Description 3" prop="desc">
                <el-input v-model="newService.desc3" type="textarea">{{ newService.desc3 }}</el-input>
            </el-form-item>

            <el-form-item label="iframe (Semble)" prop="desc">
                <el-input v-model="newService.iframe" type="textarea">{{ newService.iframe }}</el-input>
            </el-form-item>

            <!-- <div v-if="isEdit">
                this is edit
            </div>
            
            <div v-else>
                this is Add
            </div> -->

        </el-form>


        <el-upload action="" :file-list="this.imageList" list-type="picture" :auto-upload="false" :on-remove="handleRemove"
            :on-change="upldchange" :limit="1" :on-exceed="handleExceed" ref="upload">
            <el-button>Add image</el-button>
        </el-upload>

        <template #footer>
            <span class="dialog-footer">
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleClose">Cancel</button>
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleDialogue">Confirm</button>
            </span>
        </template>
    </el-dialog>
</template>
 

<script>
import { reactive, ref } from "vue";
import DataService from '@/dataRoutes/DataService';

export default {
    props: {
        isEdit: Boolean,

        data_service_cat_id: {
            type: Number,
            default: null
        },
        data_serviceName: String,
        data_description_1: String,
        data_description_2: String,
        data_description_3: String,
        data_image: String, 
        data_iframe: String
    },
    data() {
        return {
            newService: {
                name: this.data_serviceName,
                desc1: this.data_description_1,
                desc2: this.data_description_2,
                desc3: this.data_description_3,
                iframe: this.data_iframe,
                dialogVisible: false,
                files: [], // uploaded files
                url: '', // auto-upload = false, so set to null
            },
            submitted: false,
            imageList: [],
        };
    },
    setup(props, { emit }) {
        const dialogFormVisible = ref(false)

        const handleClose = () => {
            emit('update:modelValue', false)
        }
        return {
            handleClose,
            dialogFormVisible,
        };
    },
    mounted() {
        if (this.isEdit) {
            this.imageList.push({ name: 'previous-image', url: `${this.data_image}` })
        }
    },
    methods: {
        handleDialogue() {
            if (this.isEdit) {
                this.editService();
            } else {
                this.addService();
            }
        },
        addService() {
            var data = {
                serviceName: this.newService.name,
                description_1: this.newService.desc1,
                description_2: this.newService.desc2,
                description_3: this.newService.desc3,
                appointment_iframe: this.newService.iframe
            };

            console.log(data)

            if (data.serviceName == undefined || data.serviceName == '') {
                console.log('please input a service name')
                alert('please input a service name')
                return;
            }

            if (data.description_1 == undefined || data.description_1 == '') {
                console.log('please input at least one description')
                alert('please input at least one description')
                return;
            }

            if (this.files.length !== 0) {
                let formData = new FormData()
                formData.append('file', this.files)
                formData.append('serviceName', this.newService.name)
                formData.append('description_1', this.newService.desc1)
                formData.append('description_2', this.newService.desc2)
                formData.append('description_3', this.newService.desc3)
                formData.append('appointment_iframe', this.newService.iframe)

                DataService.create(formData)
                    .then((res) => {
                        console.log("add successfully!")
                        console.log(res)
                        this.submitted = true;
                        this.$emit("update:modelValue", false);
                        this.$emit("refresh-callback");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            } else {
                this.$message({
                    message: 'Image can not be null!',
                    type: 'error',
                    duration: 1500
                })
            }

        },
        upldchange(file) {
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
            this.files = file.raw
            console.log(this.files)
        },
        handleExceed(files, fileList) {
            alert('You can only upload one image')
        },

        editService() {
            console.log("in edit")
            var data = {
                service_cat_id: this.data_service_cat_id,
                serviceName: this.newService.name,
                description_1: this.newService.desc1,
                description_2: this.newService.desc2,
                description_3: this.newService.desc3,
                image: this.data_image, 
                appointment_iframe: this.newService.iframe
            };
            console.log("Edit data with service_cat_id=" + this.data_service_cat_id);
            console.log("files.length: ")

            if (this.files !== undefined && this.files.length !== 0) {
                const objectKey = this.data_image.substring(this.data_image.indexOf('service/'));
                console.log('in frontend' + objectKey)
                let formData = new FormData()
                formData.append('file', this.files)
                formData.append('objectKey', objectKey)
                formData.append('service_cat_id', this.data_service_cat_id)
                formData.append('serviceName', this.newService.name)
                formData.append('description_1', this.newService.desc1)
                formData.append('description_2', this.newService.desc2)
                formData.append('description_3', this.newService.desc3)
                formData.append('appointment_iframe', this.newService.iframe)

                console.log("in dialog updateAws")
                DataService.updateAws(formData)
                    .then(res => {
                        console.log("update service successfully")
                        this.submitted = true;
                        this.$emit("update:modelValue", false);
                        this.$emit("refresh-callback");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                DataService.update(data)
                    .then(res => {
                        this.submitted = true;
                        this.$emit("update:modelValue", false);
                        this.$emit("refresh-callback");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }

}
</script>
 
<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>