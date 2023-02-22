<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>This page no longer exists or was moved to another location.</p>
    <TextEditorVue />
    <SearchBox />
    
  </div>
  
</template>


<script>
import TextEditorVue from "../components/TextEditor.vue";
import SearchBox from "../components/SearchBox.vue";


export default {
  components: { TextEditorVue, SearchBox }
};
</script>
