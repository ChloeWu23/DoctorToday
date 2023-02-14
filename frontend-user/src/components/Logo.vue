<template>
    <div class="py-3 flex flex-col md:flex-row">
        <div class="w-full md:w-3/4 bg-white text-sky-700 m-5 md:mx-10 md:my-5">
            <span class="text-lg md:text-xl tracking-tight">Doctor Today | Private Medical Centre</span>
        </div>

        <div class="flex flex-row md:flex-col relative right-0 bg-white text-xs md:text-sm text-sky-700 mx-5 md:mx-11 break-all md:break-normal">
            <div class="w-1/2 pb-2 md:p-1 hover:text-amber-500 hover:font-bold">
                <a href="mailto:enquiries@doctortoday.co.uk" class="flex items-center">
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
                    <span>enquiries@doctortoday.co.uk</span>
                </a>
            </div>

            <div class="pl-2 md:p-1 hover:text-amber-500 hover:font-bold">
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
</template>

<script>
export default {
    data() {
        return {}
    }
}</script>
