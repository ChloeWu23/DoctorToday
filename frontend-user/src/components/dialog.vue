<template>
  <el-dialog :model-value="dialogFormVisible" title="Adding New Service" :show-close="false"
    :close-on-click-modal="false">
    <el-form :model="form">
      <el-form-item label="Service Category Name">
        <el-input v-model="newService.name" autocomplete="off">{{
          newService.name
        }}</el-input>
      </el-form-item>

      <el-form-item label="Description 1" prop="desc">
        <el-input v-model="newService.desc1" type="textarea">{{
          newService.desc1
        }}</el-input>
      </el-form-item>

      <el-form-item label="Description 2" prop="desc">
        <el-input v-model="newService.desc2" type="textarea">{{
          newService.desc2
        }}</el-input>
      </el-form-item>

      <el-form-item label="Description 3" prop="desc">
        <el-input v-model="newService.desc3" type="textarea">{{
          newService.desc3
        }}</el-input>
      </el-form-item>
    </el-form>

    <el-upload action="" list-type="picture" :auto-upload="false"
          :on-remove="handleRemove"
      :on-change="upldchange" :limit="1" :on-exceed="handleExceed" ref="upload">
      <el-button>Add image</el-button>
      

    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>



    <template #footer>
      <span class="dialog-footer">
        <button type="button"
          class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleClose">
          Cancel
        </button>
        <button type="button"
          class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="addService">
          Confirm
        </button>
      </span>
    </template>

  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";
import DataService from "@/dataRoutes/DataService";
import UploadService from '../dataRoutes/DataUpload';

export default {
  data() {
    return {
      newService: {
        name: "",
        desc1: "",
        desc2: "",
        desc3: "",
        dialogImageUrl: '',
        dialogVisible: false,
        baseurl: '',
        imageUrl: '', // image preview url
        files: [], // uploaded files
        url: '', // auto-upload = false, so set to null
      },
      submitted: false,
    };
  },
  setup(props, { emit }) {
    const dialogFormVisible = ref(false);
    const form = reactive({
      name: "",
      desc1: "",
      desc2: "",
      desc3: "",
    });

    const handleClose = () => {
      emit("update:modelValue", false);
    };

    return {
      handleClose,
      dialogFormVisible,
    };
  },

  methods: {
    addService() {
      var data = {
        serviceName: this.newService.name,
        description_1: this.newService.desc1,
        description_2: this.newService.desc2,
        description_3: this.newService.desc3,
      };

      console.log(data);

      if (data.serviceName == undefined || data.serviceName == "") {
        console.log("please input a service name");
        alert("please input a service name");
        return;
      }

      if (data.description_1 == undefined || data.description_1 == "") {
        console.log("please input at least one description");
        alert("please input at least one description");
        return;
      }

      if (this.files.length !== 0) {
        let formData = new FormData()
        formData.append('file', this.files)
        formData.append('serviceName',this.newService.name)
        formData.append('description_1', this.newService.desc1)
        formData.append('description_2', this.newService.desc2)
        formData.append('description_3', this.newService.desc3)

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

      console.log("after parent emit");
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadImage() {
      if (this.files.length !== 0) {
        let formData = new FormData()
        formData.append('file', this.files)

        UploadService.upload(formData)
        this.$refs.upload.clearFiles()

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
