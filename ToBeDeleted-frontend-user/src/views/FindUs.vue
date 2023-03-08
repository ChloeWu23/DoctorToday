<template>
    <div class="pt-20-10 md:p-20 md:pt-56 bg-[url('assets/interior.png')] bg-no-repeat">
        <div class="border rounded-3xl backdrop-blur-lg bg-white p-10">
            <div class="grid grid-cols-3">
                <div class="border-0 border-b border-sky-700 w-full"></div>
                <div class="text-2xl text-sky-700 text-center align-middle row-span-2">Contact Us</div>
                <div class="border-0 border-b border-sky-700 w-full"></div>
                <div class="border-0 border-t border-sky-700 w-full"></div>
                <div class="border-0 border-t border-sky-700 w-full"></div>
            </div>
            <div class="grid md:grid-cols-2">
                <div class="text-sm mt-4">
                    <div class="justify-items-centeralign-middle m-2">
                        <a href="mailto:enquiries@doctortoday.co.uk" class="flex">
                            <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                    height="24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M22 20.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2-10-9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16.007zM4.434 5L12 11.81 19.566 5H4.434zM0 15h8v2H0v-2zm0-5h5v2H0v-2z"
                                        fill="rgba(3,105,161,1)" />
                                </svg></span>
                            <span class="hidden lg:block">Email: </span>
                            <span>enquiries@doctortoday.co.uk</span>
                        </a>
                    </div>
                    <div class="justify-items-center align-middle m-2">
                        <div><a href="tel:02074331444" class="flex">
                                <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path
                                            d="M9.366 10.682a10.556 10.556 0 0 0 3.952 3.952l.884-1.238a1 1 0 0 1 1.294-.296 11.422 11.422 0 0 0 4.583 1.364 1 1 0 0 1 .921.997v4.462a1 1 0 0 1-.898.995c-.53.055-1.064.082-1.602.082C9.94 21 3 14.06 3 5.5c0-.538.027-1.072.082-1.602A1 1 0 0 1 4.077 3h4.462a1 1 0 0 1 .997.921A11.422 11.422 0 0 0 10.9 8.504a1 1 0 0 1-.296 1.294l-1.238.884zm-2.522-.657l1.9-1.357A13.41 13.41 0 0 1 7.647 5H5.01c-.006.166-.009.333-.009.5C5 12.956 11.044 19 18.5 19c.167 0 .334-.003.5-.01v-2.637a13.41 13.41 0 0 1-3.668-1.097l-1.357 1.9a12.442 12.442 0 0 1-1.588-.75l-.058-.033a12.556 12.556 0 0 1-4.702-4.702l-.033-.058a12.442 12.442 0 0 1-.75-1.588z"
                                            fill="rgba(3,105,161,1)" />
                                    </svg></span>
                                <span class="hidden lg:block">Tel: </span>
                                <span>020 7433 1444</span>
                            </a></div>
                    </div>
                    <div class="justify-items-center align-middle m-2">
                        <a href="fax:02077943064" class="flex">
                            <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                    height="24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M6 19H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm0-2v-1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1h2V9H4v8h2zM8 4v3h8V4H8zm0 13v3h8v-3H8zm-3-7h3v2H5v-2z"
                                        fill="rgba(3,105,161,1)" />
                                </svg></span>

                            <span class="hidden lg:block">Fax: </span>
                            <span>020 7794 3064</span>
                        </a>

                    </div>
                </div>
                <div class="text-sm mt-4">
                    <div class="m-2 flex">
                        <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                    fill="rgba(3,105,161,1)" />
                            </svg></span>
                        <span @click="openRedirection()">
                            182 Finchley Rd
                            <br />
                            London
                            <br />
                            NW3 6BP</span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3">
                <div class="border-0 border-b border-sky-700 w-full"></div>
                <div class="text-2xl text-sky-700 text-center align-middle row-span-2">Visit Us</div>
                <div class="border-0 border-b border-sky-700 w-full"></div>
                <div class="border-0 border-t border-sky-700 w-full"></div>
                <div class="border-0 border-t border-sky-700 w-full"></div>
            </div>
            <div class="mt-4">
                <p class="text-center">The Doctor Today medical centre is located in
                    West Hampstead near Finchley Road underground station.
                </p>
            </div>
            <div class="divide-y divide-sky-700 p-10">
                <div class="grid grid-cols-5 py-4">
                    <span class="hidden lg:block">By underground</span>
                    <span class="lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                            height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M17.2 20l1.8 1.5v.5H5v-.5L6.8 20H5a2 2 0 0 1-2-2V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v11a2 2 0 0 1-2 2h-1.8zM13 5v6h6V7a2 2 0 0 0-2-2h-4zm-2 0H7a2 2 0 0 0-2 2v4h6V5zm8 8H5v5h14v-5zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                fill="rgba(3,105,161,1)" />
                        </svg></span>
                    <div class="col-span-4">We are located 5 minutes walk from <span
                            class="text-sky-700 font-semibold">Finchley Road</span> London underground station,
                        which is served by the
                        <span class="text-sky-700 font-semibold">Jubilee</span> and
                        <span class="text-sky-700 font-semibold">Metropolitan</span> lines. Turn left out of the tube
                        station, use the underpass to cross Finchley Road and
                        walk north along Finchley Road keeping the road on your left and shop fronts on your right. You
                        will pass opposite the O2 centre on
                        the left. We are approximately 150 yards further up Finchley Road on the right.
                    </div>
                </div>

                <div class="grid grid-cols-5 py-4">
                    <span class="hidden lg:block">By rail</span>
                    <span class="lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                            height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M17.2 20l1.8 1.5v.5H5v-.5L6.8 20H5a2 2 0 0 1-2-2V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v11a2 2 0 0 1-2 2h-1.8zM13 5v6h6V7a2 2 0 0 0-2-2h-4zm-2 0H7a2 2 0 0 0-2 2v4h6V5zm8 8H5v5h14v-5zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                fill="rgba(3,105,161,1)" />
                        </svg></span>
                    <div class="col-span-4">We are 100 yards from
                        <span class="text-sky-700 font-semibold">Finchley Road and Frognal station (Silverlink)</span>,
                        and a short walk or taxi ride from
                        <span class="text-sky-700 font-semibold">
                            West Hampstead Thameslink Station</span>.
                    </div>
                </div>

                <div class="grid grid-cols-5 py-4">
                    <span class="hidden lg:block">By bus</span>
                    <span class="lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                            height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M17 20H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1H3v-8H2V8h1V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3h1v4h-1v8h-1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1zm2-8V5H5v7h14zm0 2H5v4h14v-4zM6 15h4v2H6v-2zm8 0h4v2h-4v-2z"
                                fill="rgba(3,105,161,1)" />
                        </svg></span>
                    <div class="col-span-4">Local buses that stop directly outside the practice:
                        <br />
                        <br />
                        13 (Aldwych - Baker Street - Golders Green)
                        <br />
                        82 (Victoria - Golders Green - North Finchley)
                        <br />
                        113 (Oxford Circus - Hendon - Edgware)
                    </div>
                </div>
                <div class="grid grid-cols-5 py-4">
                    <span class="hidden lg:block">By car</span>
                    <span class="lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                            height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M19 20H5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V11l2.48-5.788A2 2 0 0 1 6.32 4H17.68a2 2 0 0 1 1.838 1.212L22 11v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1zm1-7H4v5h16v-5zM4.176 11h15.648l-2.143-5H6.32l-2.143 5zM6.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                fill="rgba(3,105,161,1)" />
                        </svg></span>
                    <div class="col-span-4">We are located on the <span class="text-sky-700 font-semibold">A41 (Finchley
                            Road)</span> between Finchley Road & Frognal
                        Station
                        and Finchley Road
                        Underground
                        Station. Car parking is available nearby in the O2 centre Sainsburys car park - postcode NW3
                        6LU.
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        openRedirection() {
            window.open("https://goo.gl/maps/Y5pCFsWfG9evbGQV9");
        }
    }
}
</script>
