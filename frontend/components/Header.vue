<template>
    <ContactButton/>
    <!--

    <div class = "xl:max-w-screen-xl md:text-lg text-base mx-auto container">
        <label for="color-mode" >Select Color Mode</label>
        <select v-model="$colorMode.preference" id="color-mode">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
        </select>
    </div>  

    -->
    

    <div class="z-40 relative bg-gray-100 xl:max-w-screen-xl mx-auto container">
        <div class="container mx-auto bg-hero bg-[length:1920px_260px] border-b-2 drop-shadow-md mb-6">
            <div class="flex flex-col sm:flex-row"> 
                <div class = "self-start w-2/3 mx-[0px] md:mx-[10px]">
                    <NuxtLink :to="'/'">
                        <img class="md:h-[150px] md:w-[500px] h-[100px] mx-5 lg:mx-[60px] xl:mx-[95px] mt-[20px]" src="../assets/logo.png" alt="" style="object-fit: contain;" />
                    </NuxtLink>
                </div>

                <div class="self-start flex flex-row sm:flex-col relative right-0 bg-transparant text-[10px] text-xs md:text-sm text-sky-700 md:mx-20 mx-[40px] break-all md:break-normal md:mt-10 mt-0">
                    <div class="pb-2 sm:p-1 hover:text-amber-500">
                        <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#101;&#110;&#113;&#117;&#105;&#114;&#105;&#101;&#115;&#64;&#100;&#111;&#99;&#116;&#111;&#114;&#116;&#111;&#100;&#97;&#121;&#46;&#99;&#111;&#46;&#117;&#107;" class="flex items-center">
                            <span class="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" class="w-[16px] h-[16px] md:w-[20px] md:h-[20px]">
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

                    <div class="pl-2 sm:p-1 hover:text-amber-500 ">
                        <a href="tel:02074331444" class="flex items-center">
                            <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" class="w-[16px] h-[16px] md:w-[20px] md:h-[20px]">
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
            <div class="flex flex-col items-center mx-[12px]">
                <div class="w-full flex flex-col items-center">
                    <nav class="flex fex-wrap p-6 gap-6 justify-center w-full">
                        <div class="items-center w-full">
                            <NavBar></NavBar>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

    </div>

</template>


<style>
/*
.dark-mode body {
  background-color: #091a28;
  color: aliceblue;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
*/
</style>
