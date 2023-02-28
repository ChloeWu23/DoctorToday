<template>
  <div>
    <ClientOnly fallback-tag="span" fallback="Loading text editor...">
      <div v-if="editor">
        <BubbleMenu class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor">
          <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            bold
          </button>
          <button @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }">
            italic
          </button>
          <button @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }">
            strike
          </button>
          <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
            code
          </button>
          <button @click="editor.chain().focus().unsetAllMarks().run()">
            clear marks
          </button>
          <button @click="editor.chain().focus().clearNodes().run()">
            clear nodes
          </button>
          <button @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }">
            paragraph
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            h1
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            h2
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            h3
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
            h4
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
            h5
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
            h6
          </button>
          <button @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }">
            bullet list
          </button>
          <button @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }">
            ordered list
          </button>
          <button @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }">
            code block
          </button>
          <button @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }">
            blockquote
          </button>
          <button @click="editor.chain().focus().undo().run()">
            undo
          </button>
          <button @click="editor.chain().focus().redo().run()">
            redo
          </button>
        </BubbleMenu>

        <EditorContent :editor="editor" id="textEditor" contentType="html" v-model:content="textContent" class="h-64 w-64 border"/>

        <div class="p-4"></div>
        <button class="bg-sky-600 text-white p-2 rounded" @click="sendToServer">Save</button>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  data() {
    return {
      textContent: "",
      dataBaseTable: "",
      editor: null
    };
  },
  components: {
    EditorContent, BubbleMenu
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>Please enter text here🎉</p>',
      extensions: [
        StarterKit,
      ],
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {

    sendToServer() {
      console.log(this.editor.getHTML())
      //save html data to the table specified in dataBaseTable, which should be a parameter passed from parent component
      return true;
    }
  },

};
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }
}
</style>