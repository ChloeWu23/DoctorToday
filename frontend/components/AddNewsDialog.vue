<template>
    <el-dialog :model-value="dialogFormVisible" title="Adding News" :show-close="false" :close-on-click-modal="false">
        <el-form>
            <el-form-item label="Title">
                <el-input v-model="news.title" autocomplete="off">{{ news.title }}</el-input>
            </el-form-item>

            <el-form-item label="Content" prop="desc">
                <!-- <el-input v-model="newPeople.description" type="textarea">{{ newPeople.description }}</el-input> -->
            </el-form-item>
            <!-- <QuillEditor class="h-64" id="textEditor" theme="snow" toolbar="essential" contentType="html"
                :content-style="contentStyle" v-model:content="news.content">
            </QuillEditor> -->

        </el-form>


        <template #footer>
            <span class="dialog-footer">
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleClose">Cancel</button>
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="addNews">Confirm</button>
            </span>
        </template>
    </el-dialog>
</template>
 

<script>
import { reactive, ref } from "vue";
import DataService from '@/dataRoutes/DataNews';
// import { QuillEditor } from "@vueup/vue-quill";

export default {
    // components: { QuillEditor },
    data() {
        return {
            news: {
                title: "",
                content: "",
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
        addNews() {
            var data = {
                title: this.news.title,
                content: this.news.content,
            };

            console.log(data)

            if (data.title == undefined || data.title == '') {
                alert('please input title')
                return;
            }

            if (data.content == undefined || data.content == '') {
                alert('please input the content')
                return;
            }

            DataService.create(data)
                .then(res => {
                    this.submitted = true;
                    this.$emit('update:modelValue', false)
                    this.$emit("refresh-callback");
                })
                .catch(err => {
                    console.log(err);
                });

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