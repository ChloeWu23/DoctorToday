<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>This page no longer exists or was moved to another location.</p>
    {{ text }}
    <TextEditor @editorUpdated="updateContent" class="w-96 h-60"/>
    <SearchBox />
    <SembleButton/>
    
  </div>
  
</template>


<script>
export default {
  data(){
    return {
      text: "To be updated upon clicking 'save'; "
    }
  },
  methods:{
    updateContent(html) {
      console.log("parent triggered");
      this.text = html;
    }
  }
}
</script>
