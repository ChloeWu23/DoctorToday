<template>
    <div class="bg-[url('assets/map_2.png')] bg-cover bg-no-repeat bg-center p-6 grid md:grid-cols-2 gap-8 w-full">
        <div class="m-12 p-6 justify-center bg-white bg-opacity-50 drop-shadow-lg backdrop-blur-md">
            <div class="text-2xl my-4 text-sky-700">Travel vaccines, medications and advice</div>
            <div class="self-center text-base">
                <p class="my-2">Our popular fast-track travel clinic at Doctor Today offers you an
                    individually-tailored course of travel vaccinations, anti-malarial medication and travel advice
                    appropriate to your destination(s), length of stay
                    and personal medical circumstances. </p>
                <p class="my-2">The consultation for this service is free if vaccinations and/or anti-malarial
                    medications to the
                    value of £35 or more are purchased; otherwise an advice fee of up
                    to £35 applies. We are a registered Yellow Fever Centre.</p>
            </div>
        </div>

        <div class="m-6 p-6">
            <div class="flex">
                <div class="flex flex-col items-center mr-4">
                    <div>
                        <div class="flex items-center justify-center w-10 h-10 border rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-sky-700" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-px h-full bg-gray-300"></div>
                </div>
                <div class="m-2 mt-6 p-5  bg-white bg-opacity-50 backdrop-blur-md">
                    <div class="text-sky-700 font-bold text-xl mb-2">Step 1</div>
                    <p class="text-base">Select below for your travel destination. This will allow you to
                        consult the relevant section of the NHS Fit for travel website.
                    </p>
                    <div class="w-full flex items-center my-2">
                        <div class="w-full">
                            <input type="text" id="search" v-model="searchTerm"
                                placeholder="Type the name of destination country"
                                class="p-2 w-full border border-sky-700 rounded bg-slate-50/30">

                            <ul v-if="searchCountries.length"
                                class="rounded border border-gray-300 bg-slate-100 px-4 py-2 space-y-1 absolute z-10">
                                <li v-for="country in searchCountries" :key="country.name"
                                    @click="openRedirection(country)"
                                    class="cursor-pointer hover:bg-sky-700/80 hover:text-white p-1">
                                    {{ country.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="flex flex-col items-center mr-4">
                    <div>
                        <div class="flex items-center justify-center w-10 h-10 border rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-sky-700" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-px h-full bg-gray-300"></div>
                </div>
                <div class="m-2 mt-6 p-5 bg-white bg-opacity-50 backdrop-blur-md">
                    <div class="text-sky-700 font-bold text-xl mb-2">Step 2</div>
                    <p class="text-base">Consult our <a class="text-sky-700 underline"
                            href="#/services/travel-medication">services and prices</a> list to obtain detailed medical
                        and pricing information about individual vaccinations or anti-malarials.
                    </p>
                </div>
            </div>
            <div class="flex">
                <div class="flex flex-col items-center mr-4">
                    <div>
                        <div class="flex items-center justify-center w-10 h-10 border rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-sky-700" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-px h-full bg-gray-300"></div>
                </div>
                <div class="m-2 mt-6 p-5  bg-white bg-opacity-50 backdrop-blur-md">
                    <div class="text-sky-700 font-bold text-xl mb-2">Step 3:</div>
                    <p class="text-base">Fill in our <a class="text-sky-700 underline" href="#/appointment">online
                            appointment request form</a> to discuss your
                        specific needs or email us at <a class="text-sky-700 underline"
                            href="mailto:enquiries@doctortoday.co.uk">enquiries@doctortoday.co.uk</a>.
                    </p>
                </div>
            </div>

            <div class="flex">
                <div class="flex flex-col items-center mr-4">
                    <div>
                        <div class="flex items-center justify-center w-10 h-10 border rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-sky-700" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>







    </div>

</template>

<script>
import countries from '../assets/countries.json'
import { ref, computed } from 'vue'

export default {
    data() {
        return {
        }
    },
    setup() {
        let searchTerm = ref('')
        const searchCountries = computed(() => {
            if (searchTerm.value === '') {
                return []
            }
            let matches = 0
            return countries.filter(country => {
                if (country.name.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10) {
                    matches++
                    return country
                }
            })
        });
        let selectedCountry = ref('')
        return {
            countries,
            searchTerm,
            searchCountries,
            selectedCountry
        }
    },
    methods: {
        openRedirection(country) {
            window.open('https://travelhealthpro.org.uk/country/' + country.id + '/' + country.pathName)
        }
    }

}
</script>