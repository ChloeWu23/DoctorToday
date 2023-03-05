<template>
    <el-dialog :model-value="subServiceVisible" title="Add sub-service" :show-close="false"
        :close-on-click-modal="false">
        <el-form>
            <div class="el-form-item"> Sub-service name </div>
            <el-form-item prop="desc" >
                <el-input 
                    v-model="newSubService.sub_service_name" 
                    type="textarea">
                    {{ newSubService.sub_service_name }}
                </el-input>
            </el-form-item>
            
            <div class="el-form-item"> Description </div>
            <!-- <QuillEditor  class="h-64" id="textEditor" theme="snow" toolbar="essential" contentType="html" :content-style="contentStyle" v-model:content="newSubService.description" >
            </QuillEditor> -->
            
            <div class="el-form-item mt-6"> Price (Optional) </div>
            <el-form-item prop="desc">
                <el-input 
                    v-model="newSubService.price" 
                    type="textarea">
                    {{ newSubService.price }}
                </el-input>
            </el-form-item>

        </el-form>
        <template #footer>
            <!-- <div class="flex bg-blue-100">
                {{ bind_id }}
                <div class="flex" v-if="isEdit"> Edit </div>
                <div class="flex" v-else> Add </div>
            </div> -->
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
import DataSubService from '@/dataRoutes/DataSubService';
// import { QuillEditor } from "@vueup/vue-quill";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";


export default {
    props: {
        bind_id: {
            type: Number,
            default: 0,
        },
        isEdit: Boolean,
        data_sub_service_id: Number,
        data_sub_service_name: {
            type: String,
            default: ""
        },
        data_description: {
            type: String,
            default: ""
        },
        data_price: {
            type: String,
            default: ""
        }
    },
    // components: { QuillEditor },
    data() {
        return {
            submitted: false,
            contentStyle: {
                fontFamily: 'Lato, sans-serif'
            },
            newSubService: {
                sub_service_name: this.data_sub_service_name,
                description: this.data_description,
                price: this.data_price
            },
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
        handleDialogue() {
            if(this.isEdit) {
                this.editSubService();
            } else {
                this.addSubService();
            }
        },
        addSubService() {
            var data = {
                sub_service_name: this.newSubService.sub_service_name,
                description: this.newSubService.description,
                price: this.newSubService.price
            };

            console.log(data);
            console.log("Add data in category " + this.bind_id);
            DataSubService.create(this.bind_id, data)
                .then(res => {
                    this.submitted = true;
                    this.$emit('update:modelValue', false)
                })
                .catch(err => {
                    console.log(err);
                });
        },

        editSubService() {
            var data = {
                sub_service_id: this.data_sub_service_id,
                sub_service_name: this.newSubService.sub_service_name,
                description: this.newSubService.description,
                price: this.newSubService.price
            }

            console.log(data);
            console.log("Edit data in category " + this.bind_id);
            DataSubService.update(this.bind_id, data)
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