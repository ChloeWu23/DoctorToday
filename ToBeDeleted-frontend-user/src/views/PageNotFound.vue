<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>This page no longer exists or was moved to another location.</p>
    <TextEditorVue />
    <SearchBox />
    <SembleButton/>
    
  </div>
  
</template>


<script>
import TextEditorVue from "../components/TextEditor.vue";
import SembleButton from "@/components/SembleButton.vue";
import SearchBox from "../components/SearchBox.vue";


export default {
  components: { TextEditorVue, SearchBox, SembleButton }
};
</script>
