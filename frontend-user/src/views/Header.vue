<template>
    <body class="bg-gray-100">
        <div class="container mx-auto bg-hero bg-cover border-b-2 drop-shadow-md mb-6">
            <div class="flex items-start justify-between">
                <img class="h-[120px] object-cover mx-[40px] xl:mx-[140px] mt-[20px]" src="../assets/title-4.png" alt="" />
                <div class="hidden md:flex shadow-lg mx-20 p-3 rounded-b-lg bg-gradient-to-r from-blueLight to-blueDark">
                    <div class="text-white text-xs lg:text-sm align-text-bottom font-bold tracking-wider]">
                        Tel:020 7433 1444 | enquiries@doctortoday.co.uk
                    </div>
                </div>

            </div>

            <nav class="flex justify-between h-full flex-wrap  p-6 gap-6 place-content-center">
                <!-- <div class="flex items-center bg-white place-self-center"> -->
                <div class="flex ">
                     <NavBar></NavBar>
                </div>
                <!-- <SearchBox></SearchBox> -->
            </nav>

            <!-- <nav class="relative container py-2 px-[60px] xl:px-[160px] bg-blueLight">
                <div class="flex items-center">
                    <NavBar></NavBar>
                </div>
            </nav> -->
        </div>


        <div class="flex flex-col min-h-screen justify-between">
            <div class="w-full flex flex-col justify-center">

                <div class="h-full xl:max-w-screen-xl place-self-center justify-center m-0">
                    <RouterView></RouterView>
                </div>
            </div>

            <div class="flex-wrap bg-sky-700/80 p-2">
                <Footer></Footer>
            </div>
        </div>
    </body>
</template>


            <!-- <div class="flex justify-between h-full xl:max-w-screen-xl place-self-center bg-blueDark items-start"> -->
            <!-- <div class="flex items-start justify-between h-full xl:max-w-screen-xl place-self-center bg-black"> -->
<!--             
            <nav class="flex justify-between h-full flex-wrap bg-sky-700/80 p-6 gap-6">
                <div class="flex items-center">
                    <NavBar></NavBar>
                </div>
                <SearchBox></SearchBox>
            </nav> -->

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