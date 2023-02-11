<template>
    <div class="relative container mx-auto bg-blueDark">
        <div class="flex items-start justify-between bg-white">
            <img class="h-20 object-cover mx-[100px] mt-[50px]" src="../assets/logo-2.png" alt="" />
            <div class="box shadow-lg top-0 right-0 p-3 rounded-b-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                <div class="text-white align-text-bottom font-medium tracking-wide [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]">
                    Tel:020 7433 1444 | enquiries@doctortoday.co.uk
                </div>
            </div>
        </div>

        <nav class="relative container mt-auto p-4">
            <div class="hidden px-[90px] mt-6 justify-between font-medium sm:flex">
                <a href="" class="text-black hover:text-blueLight">
                    Home
                </a>
                <a href="" class="text-black hover:text-blueLight">
                    Services & Prices
                </a>
                <a href="" class="text-black hover:text-blueLight">
                    Travel Guide
                </a>
                <a href="" class="text-black hover:text-blueLight">
                    Appointments
                </a>
                <a href="" class="text-black hover:text-blueLight">
                    Reviews
                </a>
                <a href="" class="text-black hover:text-blueLight">
                    FAQs
                </a>
                <a href="" class="text-black hover:text-blueLight">
                    About Us
                </a>

                
                <div class="text-black px-8 bg-blue-300 rounded"> Search </div>
            </div>

        </nav>
    </div>

    


    <div class="flex flex-col min-h-screen justify-between">
        <div class="w-full flex flex-col justify-center">
            <!-- <div class="flex justify-between h-full xl:max-w-screen-xl place-self-center bg-blueDark items-start"> -->
            <!-- <div class="flex items-start justify-between h-full xl:max-w-screen-xl place-self-center bg-black"> -->
            
            <!-- <nav class="flex justify-between h-full flex-wrap bg-sky-700/80 p-6 gap-6">
                <div class="flex items-center">
                    <NavBar></NavBar>
                </div>
                <SearchBox></SearchBox>
            </nav> -->

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