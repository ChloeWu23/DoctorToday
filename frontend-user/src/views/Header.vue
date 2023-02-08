<template>
    <div class="flex flex-col min-h-screen justify-between">
        <div class="w-full flex flex-col justify-center">
            <Logo></Logo>
            <nav class="flex items-center flex-wrap bg-sky-700/80 p-6 gap-6">
                <div>
                    <NavBar></NavBar>
                </div>
                <SearchBox></SearchBox>
            </nav>

            <div class="h-full xl:max-w-screen-xl place-self-center justify-center m-0">
                <RouterView></RouterView>
            </div>
        </div>

        <div class="flex-wrap bg-sky-700/80 p-2">
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