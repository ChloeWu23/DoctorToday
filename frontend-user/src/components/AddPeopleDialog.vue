<template>
    <el-dialog :model-value="dialogFormVisible" title="Adding People" :show-close="false" :close-on-click-modal="false">
        <el-form>
            <el-form-item label="Name">
                <el-input v-model="newPeople.name" autocomplete="off">{{ newPeople.name }}</el-input>
            </el-form-item>

            <el-form-item label="Title" prop="desc">
                <el-input v-model="newPeople.title" type="textarea">{{ newPeople.title }}</el-input>
            </el-form-item>

            <el-form-item label="Profile" prop="desc">
                <el-input v-model="newPeople.profile" type="textarea">{{ newPeople.profile }}</el-input>
            </el-form-item>

            <el-form-item label="Description" prop="desc">
                <!-- <el-input v-model="newPeople.description" type="textarea">{{ newPeople.description }}</el-input> -->
            </el-form-item>
            <QuillEditor  class="h-64" id="textEditor" theme="snow" toolbar="essential" contentType="html" :content-style="contentStyle" v-model:content="newPeople.description" >
            </QuillEditor>

        </el-form>

        <el-upload action="" list-type="picture" :auto-upload="false" :on-remove="handleRemove" :on-change="upldchange"
            :limit="1" :on-exceed="handleExceed" ref="upload">
            <el-button>Add image</el-button>


        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>


        <template #footer>
            <span class="dialog-footer">
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleClose">Cancel</button>
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="addPeople">Confirm</button>
            </span>
        </template>
    </el-dialog>
</template>
 

<script>
import { reactive, ref } from "vue";
import DataService from '@/dataRoutes/DataPeople';
import { QuillEditor } from "@vueup/vue-quill";

export default {
    components: { QuillEditor },
    data() {
        return {
            newPeople: {
                name: "",
                title: "",
                profile: "",
                description: "",
                dialogImageUrl: '',
                dialogVisible: false,
                baseurl: '',
                imageUrl: '', // image preview url
                files: [], // uploaded files
                url: '', // auto-upload = false, so set to null
            },
            submitted: false
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
    methods: {
        addPeople() {
            var data = {
                name: this.newPeople.name,
                title: this.newPeople.title,
                profile: this.newPeople.profile,
                description: this.newPeople.description
            };

            console.log(data)

            if (data.name == undefined || data.name == '') {
                console.log('please input name')
                alert('please input name')
                return;
            }

            if (data.title == undefined || data.title == '') {
                console.log('please input the title')
                alert('please input the title')
                return;
            }

            if (this.files.length !== 0) {
                let formData = new FormData()
                formData.append('file', this.files)
                formData.append('name', this.newPeople.name)
                formData.append('title', this.newPeople.title)
                formData.append('profile', this.newPeople.profile)
                formData.append('description', this.newPeople.description)

                DataService.create(formData)
                    .then((res) => {
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

            this.imgSaveToUrl(file)
            this.files = file.raw
            console.log(this.files)
        },
        imgSaveToUrl(file) {
            this.imageUrl = URL.createObjectURL(file.raw)
            console.log('Image preview url: ', this.imageUrl)
        },
        handleExceed(files, fileList) {
            this.$message.warning(`You can only upload one image`);
        },
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