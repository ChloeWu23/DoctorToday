<template>
    <el-dialog :model-value="dialogFormVisible" title="Adding People" :show-close="false"
        :close-on-click-modal="false">
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
                <el-input v-model="newPeople.description" type="textarea">{{ newPeople.description }}</el-input>
            </el-form-item>

        </el-form>
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

export default {
    data() {
        return {
            newPeople: {
                name: "",
                title: "",
                profile: "",
                description: ""
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

            if(data.name == undefined || data.name == ''){
                console.log('please input name')
                alert('please input name')
                return;
            }

            if(data.title == undefined || data.title == ''){
                console.log('please input the title')
                alert('please input the title')
                return;
            }

            DataService.create(data)
                .then(res => {
                    this.submitted = true;
                    this.$emit('update:modelValue', false)
                    this.$emit('refresh-callback')
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