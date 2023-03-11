<template>
    <head>
        <!-- TrustBox script -->
        <component :is="'script'" type="text/javascript"
            src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></component>
        <!-- End TrustBox script -->
    </head>

    <body class="h-full xl:max-w-screen-xl place-self-center md:p-4 mx-auto container" id="pageContent">
        <div id="modal" v-if="showModal" class="z-0">
            <!-- <div class="modal-mask" > -->
            <RequestAppointmentModal @close="closeModal" :semble-form=this.sembleForm class="z-50" />
            <!-- </div> -->
        </div>
        <!-- Upper: Brand & News -->
        <div class="w-full grid lg:grid-cols-3 lg:gap-6 md:h-96 justify-self-center">
            <div
                class="w-full lg:col-span-2 bg-[url('assets/home.jpg')] bg-no-repeat bg-right bg-cover grid lg:grid-cols-3 items-center">
                <div class="w-full p-10 text-white lg:col-span-2">
                    <button class="bg-[#143B71] text-white rounded px-4 py-2 mb-8">
                        <NuxtLink to="/about/People">Meet Our Team</NuxtLink>
                    </button>
                    <p class="">Doctor Today is a London-based private medical clinic that aims to provide
                        high-quality
                        independent health care services to individuals, families and companies at reasonable cost.
                    </p>

                </div>
            </div>
            <div id="news"
                class="m-4 lg:m-0 shadow-lg lg:w-full overflow-y-scroll h-48 md:h-5/6 lg:h-full scrollbar-thin scrollbar-thumb-[#2A4359] scrollbar-track-[#8896AB]">
                <div class="flex my-2 w-full hover:sticky top-0 p-2 z-0">
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
                        <div v-html="item.content"></div>
                    </div>
                </div>

            </div>
        </div>

        <div class="m-4 justify-self-center"></div>

        <!-- Lower: appointment, reviews, CQC -->
        <div class="mx-6 md:mx-0 grid md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[16rem] justify-self-center">
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
            <div class="w-full flex items-center border-t-8 border-[#2A4359] py-8 shadow-lg px-4 md:row-span-2 lg:row-span-1">
                <div class="w-full">
                    <!-- CQC Report Plugin -->
                    <component :is="'script'" type="text/javascript"
                        src="//www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js?data-id=1-117106339&data-host=www.cqc.org.uk">
                    </component>
                    <!-- End CQC Report Plugin -->
                </div>
            </div>
            <div class="w-full flex items-center border-t-8 border-[#8896AB] py-8 shadow-lg px-4">
                <div class="pr-2 scale-125"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                        height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
                            fill="#8896AB" />
                    </svg></div>
                <div class="w-full">
                    <div class="my-2 sticky top-2">Request Appointment
                    </div>
                    <div class="flex w-5/6">
                        <button class="border border-2 border-[#8896AB] p-2 text-sm" @click="showModal = true">Check
                            Available
                            Slots</button>

                    </div>
                </div>
            </div>
            <!-- <div class="w-full flex items-center border-t-8 border-[#8896AB] py-8 shadow-lg px-4">
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
            </div> -->
        </div>
        <div class="m-4"></div>
    </body>
</template>
  
<script>

export default {
    data() {
        return {
            showModal: false,
            sembleForm: '<iframe src="https://online-booking.semble.io/?token=59df46c901c3c1673ec018b4eec76f70ce63838c" class="h-full w-full border-0" frameborder="0" scrolling="auto"></iframe>',
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
                    title: "Ovarian Cancer Awareness Month",
                    description: "March is Ovarian Cancer Awareness month. Learn more at the Ovarian Cancer Action website  or come and see us for one of our general health screens to make sure you're as healthy as can be!"
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
            news: []
        };
    },
    mounted() {
        $fetch("https://doctor-today-back.herokuapp.com/news")
            .then(res => {
                this.news = res;
                console.log(res)
            }
            )
            .catch(err => {
                console.log("Error: cannot retrieve news data");
            })
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

<style>
:root {
    --cc-text: white;
    --cc-bg: #2d4156;
    --cc-btn-primary-bg: white;
    --cc-btn-primary-hover-bg: lightgray;
}
</style>
  