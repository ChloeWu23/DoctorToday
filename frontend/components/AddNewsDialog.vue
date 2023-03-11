<template>
  <el-dialog
    :model-value="dialogFormVisible"
    title="Adding News"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form>
      <el-form-item label="Title">
        <el-input v-model="news.title" autocomplete="off">{{
          news.title
        }}</el-input>
      </el-form-item>

      <el-form-item label="Content" prop="desc">
        <!-- <el-input v-model="news.content" autocomplete="off">{{ news.content }}</el-input> -->
      </el-form-item>
      <TextEditor
        ref="textEditor"
        @editorUpdated="updateContent"
        :isEdited="this.isEdit"
        :service_description="this.data_content"
        class = "w-96 h-60"
      />
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <button
          type="button"
          class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleClose"
        >
          Cancel
        </button>
        <button
          type="button"
          class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleDialog"
        >
          Confirm
        </button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";
import DataService from "@/dataRoutes/DataNews";
// import { QuillEditor } from "@vueup/vue-quill";

export default {
  // components: { QuillEditor },
  props: {
    isEdit: Boolean,

    data_news_id: {
        type: Number,
        default: null
    },
    data_title: String,
    data_content: String
  },

  data() {
    return {
      news: {
        title: this.data_title,
        content: this.data_content,
      },
      submitted: false,
    };
  },
  setup(props, { emit }) {
    const dialogFormVisible = ref(false);

    const handleClose = () => {
      emit("update:modelValue", false);
    };
    return {
      handleClose,
      dialogFormVisible,
    };
  },
  methods: {
    handleDialog() {
      if (this.isEdit) {
        this.editNews();
      } else {
        this.addNews();
      }
    },
    async addNews() {
      await this.updateDescription();
      var data = {
        title: this.news.title,
        content: this.news.content,
      };

      console.log(data);

      if (data.title == undefined || data.title == "") {
        alert("please input title");
        return;
      }

      if (data.content == undefined || data.content == "") {
        alert("please input the content");
        return;
      }

      DataService.create(data)
        .then((res) => {
          this.submitted = true;
          this.$emit("update:modelValue", false);
          this.$emit("refresh-callback");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editNews() {
      await this.updateDescription();
      var data = {
        news_id: this.data_news_id,
        title: this.news.title,
        content: this.news.content,
      };
      console.log(data)

      if (data.title == undefined || data.title == "") {
        alert("please input title");
        return;
      }

      if (data.content == undefined || data.content == "") {
        alert("please input the content");
        return;
      }

      DataService.update(data)
        .then((res) => {
          this.submitted = true;
          this.$emit("update:modelValue", false);
        })
        .catch((err) => {
          console.log(err);
        });

    },
    async updateDescription() {
      this.$refs.textEditor.sendToParent();
    },
    updateContent(html) {
      console.log("parent triggered");
      this.news.content = html;
      console.log(this.news.content);
    },
  },
};
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
