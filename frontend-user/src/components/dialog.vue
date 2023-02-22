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
      <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      <el-button>Add image</el-button>
      

    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>


    <!-- <button type="button" @click="uploadImage"
      class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      UPLOAD
    </button> -->


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
import { Plus} from "@element-plus/icons-vue";
import UploadService from '../dataRoutes/DataUpload';

export default {
  components: {
    Plus
  },
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
        imageUrl: '', // 预览图片地址
        files: [], // 复刻文件数据
        url: '', // 因为auto-upload元素，action设置为空
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

      //this.uploadImage()

      if (this.files.length !== 0) {
        // 赋值给formData
        let formData = new FormData()
        formData.append('file', this.files)
        formData.append('serviceName',this.newService.name)
        formData.append('description_1', this.newService.desc1)
        formData.append('description_2', this.newService.desc2)
        formData.append('description_3', this.newService.desc3)

        // POST接口请求
        // UploadService.upload(formData)
        // this.$refs.upload.clearFiles()
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
        // 没有预览图片文件处理
        this.$message({
          message: 'Image can not be null!',
          type: 'error',
          duration: 1500
        })
      }


      // DataService.create(data)
      //   .then((res) => {
      //     this.submitted = true;
      //     this.$emit("update:modelValue", false);
      //     this.$emit("refresh-callback");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

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
      // 判断是否存在预览图片信息,才执行post请求
      if (this.files.length !== 0) {
        // 赋值给formData
        let formData = new FormData()
        formData.append('file', this.files)

        // POST接口请求
        UploadService.upload(formData)
        this.$refs.upload.clearFiles()

      } else {
        // 没有预览图片文件处理
        this.$message({
          message: 'Image can not be null!',
          type: 'error',
          duration: 1500
        })
      }
    },
    upldchange(file) {
      // 文件格式大小判断处理
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

      // 格式无误后，预览文件处理
      this.imgSaveToUrl(file)
      // 复刻文件信息
      this.files = file.raw
      console.log(this.files)
    },
    imgSaveToUrl(file) {
      // 获取上传图片的本地URL，用于上传前的本地预览，转换后的地址为 blob:http://xxx/7bf54338-74bb-47b9-9a7f-7a7093c716b5
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log('Image preview url: ', this.imageUrl)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`You can only upload one image`);
    },

    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
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
