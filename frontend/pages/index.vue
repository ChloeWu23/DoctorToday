<template>
    <head> <!-- TrustBox script -->
        <component :is="'script'" type="text/javascript"
            src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></component>
        <!-- End TrustBox script -->
    </head>

    <body class="h-full xl:max-w-screen-xl place-self-center md:p-4 mx-auto">
        <transition name="modal" v-if="showModal">
            <!-- <div class="modal-mask" > -->
            <RequestAppointmentModal @close="closeModal" />
            <!-- </div> -->
        </transition>
        <!-- Upper: Brand & News -->
        <div class="w-full grid lg:grid-cols-3 lg:gap-6 md:h-96 justify-self-center">
            <div
                class="w-full lg:col-span-2 bg-[url('assets/home.jpg')] bg-no-repeat bg-right bg-cover grid lg:grid-cols-3 items-center">
                <div class="w-full p-10 text-white lg:col-span-2">
                    <button class="bg-[#143B71] text-white rounded px-4 py-2 mb-8">
                        <NuxtLink to="AboutPeople">Meet Our Team</NuxtLink>
                    </button>
                    <p class="">Doctor Today is a London-based private medical clinic that aims to provide
                        high-quality
                        independent health care services to individuals, families and companies at reasonable cost.
                    </p>

                </div>
            </div>
            <div id="news"
                class="m-4 lg:m-0 shadow-lg lg:w-full overflow-y-scroll h-48 md:h-5/6 lg:h-full scrollbar-thin scrollbar-thumb-[#2A4359] scrollbar-track-[#8896AB]">
                <div class="flex my-2 w-full sticky top-0 bg-gray-100 p-2">
                    <span class="md:mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M16 20V4H4v15a1 1 0 0 0 1 1h11zm3 2H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7h4v9a3 3 0 0 1-3 3zm-1-10v7a1 1 0 0 0 2 0v-7h-2zM6 6h6v6H6V6zm2 2v2h2V8H8zm-2 5h8v2H6v-2zm0 3h8v2H6v-2z"
                                fill="#2A4359" />
                        </svg>
                    </span>
                    <span class="text-[#143B71] font-semibold underline">Doctor Today News
                    </span>
                </div>
                <div class="divide-y divide-dashed md:text-sm">
                    <div class="w-full p-4" v-for="item in news">
                        <div class="font-semibold text-[#143B71] pb-2">{{ item.title }}</div>
                        <div class="">{{ item.description }}</div>
                    </div>
                </div>

            </div>
        </div>

        <div class="m-4 justify-self-center"></div>

        <!-- Lower: search, appointment, reviews -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10 min-h-[16rem] justify-self-center">
            <div class="w-full flex items-center border-t-8 border-[#5BB57B] py-8 shadow-lg px-4">
                <div class="pr-2 scale-125">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M14 22.5L11.2 19H6a1 1 0 0 1-1-1V7.103a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1h-5.2L14 22.5zm1.839-5.5H21V8.103H7V17H12.161L14 19.298 15.839 17zM2 2h17v2H3v11H1V3a1 1 0 0 1 1-1z"
                            fill="#5BB57B" />
                    </svg>
                </div>
                <div class="w-full">
                    <div class="flex">
                        <p class=""></p>
                    </div>
                    <div class="my-2">
                        <!-- TrustBox widget - Mini -->
                        <div class="trustpilot-widget" data-locale="en-GB" data-template-id="53aa8807dec7e10d38f59f32"
                            data-businessunit-id="56aa8f960000ff000588375e" data-style-height="150px"
                            data-style-width="100%" data-theme="light">
                            <a href="https://uk.trustpilot.com/review/doctortoday.co.uk" target="_blank"
                                rel="noopener">Trustpilot</a>
                        </div>
                        <!-- End TrustBox widget -->
                    </div>
                </div>
            </div>
            <div class="w-full flex items-center border-t-8 border-[#8E603F] py-8 shadow-lg px-4">
                <div class="pr-2 scale-125"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                        height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
                            fill="#8E603F" />
                    </svg></div>
                <div class="w-full">
                    <div class="my-2 sticky top-2">Request Appointment
                    </div>
                    <div class="flex w-5/6">
                        <button class="border border-2 border-[#8E603F] p-2 text-sm" @click="showModal = true">Check
                            Available
                            Slots</button>

                    </div>
                </div>
            </div>
            <div class="w-full flex items-center border-t-8 border-[#2A4359] py-8 shadow-lg px-4">
                <div class="pr-2 scale-125">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M3.161 4.469a6.5 6.5 0 0 1 8.84-.328 6.5 6.5 0 0 1 9.178 9.154l-7.765 7.79a2 2 0 0 1-2.719.102l-.11-.101-7.764-7.791a6.5 6.5 0 0 1 .34-8.826zm1.414 1.414a4.5 4.5 0 0 0-.146 6.21l.146.154L12 19.672l5.303-5.304-3.535-3.535-1.06 1.06a3 3 0 1 1-4.244-4.242l2.102-2.103a4.501 4.501 0 0 0-5.837.189l-.154.146zm8.486 2.828a1 1 0 0 1 1.414 0l4.242 4.242.708-.706a4.5 4.5 0 0 0-6.211-6.51l-.153.146-3.182 3.182a1 1 0 0 0-.078 1.327l.078.087a1 1 0 0 0 1.327.078l.087-.078 1.768-1.768z"
                            fill="#2A4359" />
                    </svg>
                </div>
                <div>
                    <div class="my-2">Find A Service
                    </div>
                    <div class="w-5/6">
                        <SearchBox />
                    </div>
                </div>
            </div>
            <div class="w-full flex items-center border-t-8 border-[#8896AB] py-8 shadow-lg px-4">
                <div class="pr-2 scale-125">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 6V5h-3v2h-2V5H9v2H7V5H4v4h16zm0 2H4v8h16v-8zM6 13h5v4H6v-4z"
                            fill="#8896AB" />
                    </svg>
                </div>
                <div>
                    <div class="my-2">
                        <p class="text-sm font-semibold">{{ getHealthMonth(month()).title }}</p>
                    </div>
                    <div>
                        <p class="text-sm">{{ getHealthMonth(month()).description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-4"></div>
    </body>
</template>
  
<script>

export default {
    data() {
        return {
            showModal: false,
            medicalMonths: [
                {
                    title: "",
                    description: ""
                },
                {
                    title: "Heart Disease Awareness Month",
                    description: "February is Heart Disease Awareness Month. Learn more at the British Heart Foundation website, or come and see us for one of our general health screens to make sure you're as healthy as can be!"
                },
                {
                    title: "",
                    description: ""
                },
                {
                    title: "",
                    description: ""
                },
                {
                    title: "",
                    description: ""
                },
                {
                    title: "",
                    description: ""
                },
                {
                    title: "",
                    description: ""
                },
                {
                    title: "",
                    description: ""
                },
                {
                    title: "",
                    description: ""
                },
                {
                    title: "",
                    description: ""
                },
                {
                    title: "",
                    description: ""
                }],
            news: [
                {
                    title: "Online Appointment Request",
                    description: "Patients wishing to request an appointment can now do so using our online request form.",
                    link: "",
                    pics: ""
                }]
        };
    },
    methods:
    {
        closeModal() {
            this.showModal = false;
        },
        month() {
            let d = new Date();
            return d.getMonth();
        },
        getHealthMonth(month) {
            if (month < this.medicalMonths.length) {
                return this.medicalMonths[month];
            }
            else {
                return "NOT A SPECIAL MONTH";
            }
        }
    }
}
</script>
  