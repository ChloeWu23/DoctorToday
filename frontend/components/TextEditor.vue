<template>
  <div>
    <ClientOnly fallback-tag="span" fallback="Loading text editor...">
      <div v-if="editor" class="h-full flex flex-col">
        <div class="editor-menu flex w-full grid grid-cols-12 gap-2 grow-0" :tippy-options="{ duration: 100 }" :editor="editor">
          <button @click.prevent="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"
                fill="#1663A9" />
            </svg>
          </button>
          <button @click.prevent="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" fill="#1663A9" />
            </svg>
          </button>
          <button @click.prevent="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z"
                fill="#1663A9" />
            </svg>
          </button>
          <button @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            <span class="text-[#1663A9] mx-auto">H1</span>
          </button>
          <button @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            <span class="text-[#1663A9] mx-auto">H2</span>
          </button>
          <button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            <span class="text-[#1663A9] mx-auto">H3</span>
          </button>
          <button @click.prevent="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
            <span class="text-[#1663A9] mx-auto">H4</span>
          </button>
          <button @click.prevent="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
            <span class="text-[#1663A9] mx-auto">H5</span>
          </button>
          <button @click.prevent="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
            <span class="text-[#1663A9] mx-auto">H6</span>
          </button>
          <button @click.prevent="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
                fill="#1663A9" />
            </svg>
          </button>
          <button @click.prevent="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
                fill="#1663A9" />
            </svg>
          </button>
          <button @click.prevent="editor.chain().focus().setHorizontalRule().run()">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M2 11h2v2H2v-2zm4 0h12v2H6v-2zm14 0h2v2h-2v-2z" fill="#1663A9" />
            </svg>
          </button>
          <button @click.prevent="addUrl" :class="{ 'is-active': editor.isActive('link') }">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                fill="#1663A9" />
            </svg>
          </button>
          <button @click.prevent="editor.chain().focus().undo().run()">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"
                fill="#1663A9" />
            </svg>
          </button>
          <button @click.prevent="editor.chain().focus().redo().run()">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z"
                fill="#1663A9" />
            </svg>
          </button>
        </div>
        <EditorContent :editor="editor" id="textEditor" contentType="html" v-model:content="textContent" class="h-auto w-full grow" />
        <!-- <button class="bg-sky-600 text-white p-2 rounded grow-0 w-16 m-4" @click="sendToParent">Save</button> -->
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

export default {
  props: {
    isEdited: Boolean,
    service_description: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      textContent: "",
      editor: null,
      defaultContent:'<p>Please enter text here🎉</p>',
    };
  },
  components: {
    EditorContent
  },
  mounted() {
    this.displayDescription()
    this.editor = new Editor({
      content: this.defaultContent,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
        }),
      ],
      editorProps: {
        attributes: {
          class: 'focus:outline-none border border-2 h-full prose-lg',
        },
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    addUrl() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt("Please enter the url link in the box below and click 'Save'", previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()
        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
    sendToParent() {
      //send HTML content to parent component
      const contentHTML = this.editor.getHTML();
      console.log(contentHTML);
      this.$emit('editorUpdated', contentHTML);
      return true;
    },
    displayDescription(){
      if(this.isEdited){
        console.log("here")
        // this.editor.setHTML(this.service_description);
        this.defaultContent = this.service_description;
        //this.service_description
        // this.editor.content = this.service_description;
        // console.log(this.editor.content)
      }
    },
    // truncatedHtml(data) {
    //         const maxLength = 300;
    //         const html = data;
    //         // const html = this.description; // replace with the name of your variable containing the HTML
    //         if (html.length > maxLength) {
    //             data = html.slice(0, maxLength) + '...';
    //             return data;
    //         } else {
    //             return data;
    //         }
    //     }, 
  },

};
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  >*+* {
    margin-top: 0.75em;
  }
}
</style>