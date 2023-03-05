<template>
    <el-dialog :model-value="dialogFormVisible" title="Adding New Service" :show-close="false"
        :close-on-click-modal="false">
        <el-form :model="form">
            <el-form-item label="Service Category Name">
                <el-input v-model="newService.name" autocomplete="off">{{ newService.name }}</el-input>
            </el-form-item>

            <el-form-item label="Description 1" prop="desc">
                <el-input v-model="newService.desc1" type="textarea">{{ newService.desc1 }}</el-input>
            </el-form-item>

            <el-form-item label="Description 2" prop="desc">
                <el-input v-model="newService.desc2" type="textarea">{{ newService.desc2 }}</el-input>
            </el-form-item>

            <el-form-item label="Description 3" prop="desc">
                <el-input v-model="newService.desc3" type="textarea">{{ newService.desc3 }}</el-input>
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleClose">Cancel</button>
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="addService">Confirm</button>
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

        data_serviceName: String,
        data_description_1: String,
        data_description_2: String, 
        data_description_3: String
    },
    data() {
        return {
            newService: {
                name: "",
                desc1: "",
                desc2: "",
                desc3: ""
            },
            submitted: false
        };
    },
    setup(props, { emit }) {
        const dialogFormVisible = ref(false)
        const form = reactive({
            name: '',
            desc1: '',
            desc2: '',
            desc3: '',
        })

        const handleClose = () => {
            emit('update:modelValue', false)
        }
        return {
            handleClose,
            dialogFormVisible,
        };
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
                description_3: this.newService.desc3
            };

            console.log(data)

            if(data.serviceName == undefined || data.serviceName == ''){
                console.log('please input a service name')
                alert('please input a service name')
                return;
            }

            if(data.description_1 == undefined || data.description_1 == ''){
                console.log('please input at least one description')
                alert('please input at least one description')
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


            console.log("after parent emit")
        },
        
        editService() {

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