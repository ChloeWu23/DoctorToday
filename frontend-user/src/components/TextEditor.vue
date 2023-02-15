<template>
  <div>
    <QuillEditor id="textEditor" theme="snow" toolbar="essential" contentType="html" v-model:content="textContent" @update:content="checkText"/>
    <div class="p-4"></div>
    <button class="bg-sky-600 text-white p-2 rounded" @click="sendToServer">Save</button>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      textContent: "",
    };
  },
  methods: {
    checkText($event) {
        console.log($event);
    },
    sendToServer(){
      return true;
    }
  }
};
</script>