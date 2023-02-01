<template>
    <div class="flex flex-col justify-center">
        <div>
            <Logo></Logo>
            <nav class="flex items-center justify-between flex-wrap bg-sky-700 p-6">
                <NavBar></NavBar>
                <SearchBox></SearchBox>
            </nav>
        </div>
        <div class="h-full md:max-w-screen-lg self-center">
            <RouterView></RouterView>
        </div>
        <div class="flex items-center justify-between flex-wrap bg-sky-700 p-2">
            <Footer></Footer>
        </div>
    </div>
</template>



<script>
import NavBar from '../components/NavBar.vue';
import Logo from '../components/Logo.vue';
import SearchBox from '../components/SearchBox.vue';
import Footer from '../components/Footer.vue'

export default {
    data() {
        return {}
    },
    components: {
        NavBar,
        Logo,
        SearchBox,
        Footer
    }
}
</script>