<template>
    <el-dialog :model-value="subServiceVisible" title="Add sub-service" :show-close="false"
        :close-on-click-modal="false">
        <el-form>
            <el-form-item label="Short name">
                <el-input v-model="newSubService.short_name" autocomplete="off">{{ newSubService.short_name }}</el-input>
            </el-form-item>

            <el-form-item label="Sub-service name" prop="desc">
                <el-input v-model="newSubService.sub_service_name" type="textarea">{{ newSubService.sub_service_name }}</el-input>
            </el-form-item>

            <el-form-item label="Description" prop="desc">
                <el-input v-model="newSubService.description" type="textarea">{{ newSubService.description }}</el-input>
            </el-form-item>

            <el-form-item label="Price" prop="desc">
                <el-input v-model="newSubService.price" type="textarea">{{ newSubService.price }}</el-input>
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleClose">Cancel</button>
                <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="addSubService">Confirm</button>
            </span>
        </template>
    </el-dialog>
</template>
 

<script>
import { reactive, ref } from "vue";
import DataService from '@/dataRoutes/DataSubService';

export default {
    props: ['service_cat_id'],
    data() {
        return {
            newSubService: {
                short_name: "",
                sub_service_name: "",
                description: "",
                price: ""
            },
            submitted: false
        };
    },
    setup(props, { emit }) {
        const subServiceVisible = ref(false)

        const handleClose = () => {
            emit('update:modelValue', false)
        }
        return {
            handleClose,
            subServiceVisible,
        };
    },
    methods: {
        addSubService() {
            var data = {
                short_name: this.newSubService.short_name,
                sub_service_name: this.newSubService.sub_service_name,
                description: this.newSubService.description,
                price: this.newSubService.price
            };

            console.log(data)

            console.log(this.service_cat_id)
            DataService.create(this.service_cat_id, data)
                .then(res => {
                    this.submitted = true;
                    this.$emit('update:modelValue', false)
                })
                .catch(err => {
                    console.log(err);
                });

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