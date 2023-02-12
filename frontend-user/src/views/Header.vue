<template>
    <body class="bg-gray-100">
        <div class="relative container mx-auto bg-hero bg-cover border-b-2 drop-shadow-md mb-6">
            <div class="flex items-start justify-between">
                <img class="h-[120px] object-cover mx-[140px] mt-[20px]" src="../assets/title-4.png" alt="" />
                <div class="box shadow-lg mx-20 p-3 rounded-b-lg bg-gradient-to-r from-blueLight to-blueDark">
                    <div class="text-white align-text-bottom font-bold tracking-wider]">
                        Tel:020 7433 1444 | enquiries@doctortoday.co.uk
                    </div>
                </div>
            </div>

            <nav class="relative container py-2">
                <div class="hidden px-[160px] mt-3 justify-between font-medium sm:flex">
                    <a href="" class="text-black py-2 hover:text-blueLight">
                        Home
                    </a>
                    <a href="" class="text-black py-2 hover:text-blueLight">
                        Services & Prices
                    </a>
                    <a href="" class="text-black py-2 hover:text-blueLight">
                        Travel Guide
                    </a>
                    <a href="" class="text-black py-2 hover:text-blueLight">
                        Appointments
                    </a>
                    <a href="" class="text-black py-2 hover:text-blueLight">
                        Reviews
                    </a>
                    <a href="" class="text-black py-2 hover:text-blueLight">
                        FAQs
                    </a>
                    <a href="" class="text-black py-2 hover:text-blueLight">
                        About Us
                    </a>

                    
                    <div class="text-black px-8 bg-gray-200 py-2 rounded"> Search </div>
                </div>

            </nav>
        </div>

        <!-- TrustBox widget - Micro Combo -->
        <div class="trustpilot-widget" data-locale="en-GB" data-template-id="5419b6ffb0d04a076446a9af" data-businessunit-id="56aa8f960000ff000588375e" data-style-height="20px" data-style-width="100%" data-theme="light">
        <a href="https://uk.trustpilot.com/review/doctortoday.co.uk" target="_blank" rel="noopener">Trustpilot</a>
        </div>
        <!-- End TrustBox widget -->

        


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
            
            <!-- <nav class="flex justify-between h-full flex-wrap bg-sky-700/80 p-6 gap-6">
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