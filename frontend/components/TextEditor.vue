<template>
  <div>
    <ClientOnly fallback-tag="span" fallback="Loading text editor...">
      <editor-content :editor="editor" id="textEditor" theme="snow" toolbar="essential" contentType="html" v-model:content="textContent" />
      <div class="p-4"></div>
      <button class="bg-sky-600 text-white p-2 rounded" @click="sendToServer">Save</button>
    </ClientOnly>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  data() {
    return {
      textContent: "",
      dataBaseTable: "",
    };
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
      ],
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    // removed from QuillEditor tag @update:content="checkText"
    // checkText($event) {
    //     console.log($event);
    // },
    sendToServer() {
      console.log(this.textContent);
      //save html data to the table specified in dataBaseTable, which should be a parameter passed from parent component
      return true;
    }
  },
  
};
</script>