<template>
    <el-dialog :model-value="dialogFormVisible" title="Adding FAQ" :show-close="false" :close-on-click-modal="false">
        <el-form>
            <el-form-item label="Question">
                <el-input v-model="FAQ.question" autocomplete="off">{{ FAQ.question }}</el-input>
            </el-form-item>

            <el-form-item label="Answer">
                <el-input v-model="FAQ.answer" autocomplete="off">{{ FAQ.answer }}</el-input>
            </el-form-item>

            <!-- FIXME: change to text editor -->
        </el-form>

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
import DataService from '@/dataRoutes/DataFAQ';
// import { QuillEditor } from "@vueup/vue-quill";

export default {
    // components: { QuillEditor },
    props: {
        isEdit: Boolean,

        data_faq_id: {
            type: Number,
            default: null
        },
        data_question: String,
        data_answer: String
    },

    data() {
        return {
            FAQ: {
                question: this.data_question,
                answer: this.data_answer,
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
        handleDialogue() {
            if (this.isEdit) {
                this.editFAQ();
            } else {
                this.addFAQ();
            }
        },
        addFAQ() {
            var data = {
                question: this.FAQ.question,
                answer: this.FAQ.answer,
            };

            console.log(data)

            if (data.question == undefined || data.question == '') {
                alert('please input question')
                return;
            }

            if (data.answer == undefined || data.answer == '') {
                alert('please input the answer')
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
        editFAQ() {
            var data = {
                faq_id: this.data_faq_id,
                question: this.FAQ.question,
                answer: this.FAQ.answer,
            };

            console.log(data)

            if (data.question == undefined || data.question == '') {
                alert('please input question')
                return;
            }

            if (data.answer == undefined || data.answer == '') {
                alert('please input the answer')
                return;
            }

            DataService.update(data)
                .then(res => {
                    this.submitted = true;
                    this.$emit('update:modelValue', false)
                    this.$emit("refresh-callback");
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