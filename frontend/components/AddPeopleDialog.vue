<template>
  <el-dialog :model-value="dialogFormVisible" title="Adding People" :show-close="false" :close-on-click-modal="false">
    <el-form>
      <el-form-item label="Name">
        <el-input v-model="newPeople.name" autocomplete="off">{{
          newPeople.name
        }}</el-input>
      </el-form-item>

      <el-form-item label="Title" prop="desc">
        <el-input v-model="newPeople.title" type="textarea" :rows="1">{{
          newPeople.title
        }}</el-input>
      </el-form-item>

      <el-form-item label="Profile" prop="desc">
        <el-input v-model="newPeople.profile" type="textarea" :rows="1">{{
          newPeople.profile
        }}</el-input>
      </el-form-item>

      <el-form-item label="Independent:" prop="is_independent">
        <el-radio-group v-model="newPeople.independent">
          <el-radio :label="true">Yes</el-radio>
          <el-radio :label="false">No</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Website" prop="desc">
        <el-input v-model="newPeople.website" type="textarea" :rows="1">{{
          newPeople.website
        }}</el-input>
      </el-form-item>

      <el-form-item label="Description" prop="desc">
        <!-- <el-input v-model="newPeople.description" type="textarea">{{
          newPeople.description
        }}</el-input> -->
      </el-form-item>
      <TextEditor ref="textEditor" @editorUpdated="updateContent" :isEdited="this.isEdit"
        :service_description="this.data_description" class="w-96 h-60" />
      <!-- FIXME: Text editor -->
    </el-form>

    <el-upload action="" :file-list="this.imageList" list-type="picture" :auto-upload="false" :on-remove="handleRemove"
      :on-change="upldchange" :limit="1" :on-exceed="handleExceed" ref="upload">
      <el-button>Add image</el-button>
    </el-upload>

    <template #footer>
      <span class="dialog-footer">
        <button type="button"
          class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleClose">
          Cancel
        </button>
        <button type="button"
          class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleDialogue">
          Confirm
        </button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";
import DataService from "@/dataRoutes/DataPeople";
// import { QuillEditor } from "@vueup/vue-quill";

export default {
  // components: { QuillEditor },
  props: {
    isEdit: Boolean,

    data_staff_id: Number,
    data_name: String,
    data_title: String,
    data_profile: String,
    data_description: String,
    data_image: String,
    data_website: String,
    data_is_independent: Boolean,
  },
  data() {
    return {
      newPeople: {
        name: this.data_name,
        title: this.data_title,
        profile: this.data_profile,
        description: this.data_description,
        dialogVisible: false,
        independent: this.data_is_independent,
        website: this.data_website,
        files: [], // uploaded files
        url: "", // auto-upload = false, so set to null
      },
      submitted: false,
      imageList: [],
    };
  },
  setup(props, { emit }) {
    const dialogFormVisible = ref(false);
    const independent = ref(false);

    const handleClose = () => {
      emit("update:modelValue", false);
    };
    return {
      handleClose,
      dialogFormVisible,
      independent,
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
        this.editPeople();
      } else {
        this.addPeople();
      }
    },
    async addPeople() {
      await this.updateDescription();
      var data = {
        name: this.newPeople.name,
        title: this.newPeople.title,
        profile: this.newPeople.profile,
        description: this.newPeople.description,
        website: this.newPeople.website,
        is_independent: this.newPeople.independent,
      };

      console.log(data);

      if (data.name == undefined || data.name == "") {
        console.log("please input name");
        alert("please input name");
        return;
      }

      if (data.title == undefined || data.title == "") {
        console.log("please input the title");
        alert("please input the title");
        return;
      }

      if (this.files.length !== 0) {
        let formData = new FormData();
        formData.append("file", this.files);
        formData.append("name", this.newPeople.name);
        formData.append("title", this.newPeople.title);
        formData.append("profile", this.newPeople.profile);
        formData.append("description", this.newPeople.description);
        formData.append("website", this.newPeople.website);
        formData.append("is_independent", this.newPeople.independent);

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
          message: "Image can not be null!",
          type: "error",
          duration: 1500,
        });
      }
    },
    async editPeople() {
      await this.updateDescription();
      var data = {
        staff_id: this.data_staff_id,
        name: this.newPeople.name,
        title: this.newPeople.title,
        profile: this.newPeople.profile,
        description: this.newPeople.description,
        website: this.newPeople.website,
        is_independent: this.newPeople.independent,
        image: this.data_image, // FIXME: change to new image url
      };

      if (data.name == undefined || data.name == "") {
        console.log("please input name");
        alert("please input name");
        return;
      }

      if (data.title == undefined || data.title == "") {
        console.log("please input the title");
        alert("please input the title");
        return;
      }

      if (this.files !== undefined && this.files.length !== 0) {
        const objectKey = this.data_image.substring(this.data_image.indexOf('people/'));
        console.log('in frontend' + objectKey)
        let formData = new FormData()
        formData.append('file', this.files)
        formData.append('objectKey', objectKey)
        formData.append("staff_id", this.data_staff_id)
        formData.append("name", this.newPeople.name);
        formData.append("title", this.newPeople.title);
        formData.append("profile", this.newPeople.profile);
        formData.append("description", this.newPeople.description);
        formData.append("website", this.newPeople.website);
        formData.append("is_independent", this.newPeople.independent);

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
          .then((res) => {
            this.submitted = true;
            this.$emit("update:modelValue", false);
            this.$emit("refresh-callback");
          })
          .catch((err) => {
            console.log(err);
          });
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
      this.files = file.raw;
      // console.log(this.files)
    },
    handleExceed(files, fileList) {
      alert('You can only upload one image')
    },

    async updateDescription() {
      this.$refs.textEditor.sendToParent();
    },
    updateContent(html) {
      console.log("parent triggered");
      this.newPeople.description = html;
      console.log(this.newPeople.description);
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
