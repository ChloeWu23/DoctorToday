<template>
    <ContactButton/>
    <SembleButton/>
    <body class="bg-gray-100">
        <div class="container items-center mx-auto bg-hero bg-[length:1920px_260px] border-b-2 drop-shadow-md mb-6">
            <div class="flex flex-col md:flex-row items-start md:items-start justify-between">
                <RouterLink :to="'/'">
                    <img class="h-[120px] object-cover md:mx-[10px] xl:mx-[140px] mt-[20px]" src="../assets/title-4.png" alt="" />
                </RouterLink>
            
                <div class="flex flex-row md:flex-col relative items-center md:items-start ml-[20px] md:right-0 bg-transparant text-xs md:text-sm text-sky-700 md:mx-10 lg:mx-20 break-all md:break-normal mt-4 md:mt-10">
                    <div class="w-7/10 md:1/2 md:pb-2 md:p-1 hover:text-amber-500 hover:font-bold">
                        <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#101;&#110;&#113;&#117;&#105;&#114;&#105;&#101;&#115;&#64;&#100;&#111;&#99;&#116;&#111;&#114;&#116;&#111;&#100;&#97;&#121;&#46;&#99;&#111;&#46;&#117;&#107;" class="flex items-center">
                            <span class="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width="22"
                                    height="22">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M22 20.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2-10-9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16.007zM4.434 5L12 11.81 19.566 5H4.434zM0 15h8v2H0v-2zm0-5h5v2H0v-2z"
                                        fill="rgba(3,105,161,1)" />
                                </svg>
                            </span>
                            <span class="hidden lg:block w-12">Email: </span>
                            <span>&#101;&#110;&#113;&#117;&#105;&#114;&#105;&#101;&#115;&#64;&#100;&#111;&#99;&#116;&#111;&#114;&#116;&#111;&#100;&#97;&#121;&#46;&#99;&#111;&#46;&#117;&#107;</span>
                        </a>
                    </div>

                    <div class="pl-1 md:p-1 hover:text-amber-500 hover:font-bold">
                        <a href="tel:02074331444" class="flex items-center">
                            <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"
                                    width="22" height="22">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M9.366 10.682a10.556 10.556 0 0 0 3.952 3.952l.884-1.238a1 1 0 0 1 1.294-.296 11.422 11.422 0 0 0 4.583 1.364 1 1 0 0 1 .921.997v4.462a1 1 0 0 1-.898.995c-.53.055-1.064.082-1.602.082C9.94 21 3 14.06 3 5.5c0-.538.027-1.072.082-1.602A1 1 0 0 1 4.077 3h4.462a1 1 0 0 1 .997.921A11.422 11.422 0 0 0 10.9 8.504a1 1 0 0 1-.296 1.294l-1.238.884zm-2.522-.657l1.9-1.357A13.41 13.41 0 0 1 7.647 5H5.01c-.006.166-.009.333-.009.5C5 12.956 11.044 19 18.5 19c.167 0 .334-.003.5-.01v-2.637a13.41 13.41 0 0 1-3.668-1.097l-1.357 1.9a12.442 12.442 0 0 1-1.588-.75l-.058-.033a12.556 12.556 0 0 1-4.702-4.702l-.033-.058a12.442 12.442 0 0 1-.75-1.588z"
                                        fill="rgba(3,105,161,1)" />
                                </svg></span>
                            <span class="hidden lg:block">Tel: &nbsp</span>
                            <span>020 7433 1444</span>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-col">
                <div class="w-full flex flex-col items-center">
                    <nav class="flex h-full fex-wrap p-6 gap-6 justify-center w-full">
                        <div class="items-center w-full">
                            <NavBar></NavBar>
                        </div>
                    </nav>
                    
                </div>
            </div>
            <!-- <nav class="flex h-full w-full flex-wrap p-6 gap-6 justify-center">
                <div class="items-center place-self-center w-full">
                     <NavBar></NavBar>
                </div>
            </nav> -->

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
import ContactButton from '@/components/ContactButton.vue';
import SembleButton from '../components/SembleButton.vue';

export default {
    data() {
        return {}
    },
    components: {
        NavBar,
        Logo,
        SearchBox,
        Footer,
        ContactButton,
        SembleButton
    }
}

</script>
