<template>
    <nav class="flex items-center justify-between flex-wrap bg-sky-700 p-6">
        <NavBar></NavBar>
    </nav>
    <RouterView></RouterView>
</template>



<script>
import NavBar from '../components/NavBar.vue';

export default {
    data() {
        return {}
    },
    components:{
        NavBar
    }
}
</script>