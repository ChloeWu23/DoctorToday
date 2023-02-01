<template>
    <div class="m-10">
        <p>Our popular fast-track travel clinic at Doctor Today offers you an individually-tailored course of
            travel
            vaccinations, anti-malarial medication and travel advice appropriate to your destination(s), length
            of stay
            and personal medical circumstances. The consultation for this service is free if vaccinations and/or
            anti-malarial medications to the value of £35 or more are purchased; otherwise an advice fee of up
            to £35
            applies. We are a registered Yellow Fever Centre.</p>
    </div>
    <div class="m-10 grid gap-8 md:grid-cols-3">
        <!--Step 1-->
        <div class="border border-sky-700 bg-white rounded p-4 flex flex-col justify-between">
            <div class="mb-8">
                <div class="text-sky-700 font-bold text-xl mb-2">Step 1:</div>
                <p class="text-gray-700 text-base">Select below for your travel destination. This will allow you to
                    consult the relevant section of the NHS Fit for travel website.
                </p>
            </div>
            <div class="w-full flex items-center">
                <div class="w-full">
                    <input type="text" id="search" v-model="searchTerm"
                        placeholder="Type the name of destination country"
                        class="p-2 w-full border border-sky-700 rounded">

                    <ul v-if="searchCountries.length"
                        class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10">
                        <li v-for="country in searchCountries" :key="country.name" @click="openRedirection(country)"
                            class="cursor-pointer hover:bg-gray-100 p-1">
                            {{ country.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!--Step 2-->

        <div class="border border-sky-700 bg-white rounded p-4 flex flex-col justify-between">
            <div class="mb-8">
                <div class="text-sky-700 font-bold text-xl mb-2">Step 2:</div>
                <p class="text-gray-700 text-base">Consult our <a class="text-sky-700 underline"
                        href="#/Services">services and prices</a> list to obtain detailed medical and
                    pricing information about individual vaccinations or anti-malarials.
                </p>
            </div>
        </div>

        <!--Step 3-->
        <div class="border border-sky-700 bg-white rounded p-4 flex flex-col justify-between">
            <div class="mb-8">
                <div class="text-sky-700 font-bold text-xl mb-2">Step 3:</div>
                <p class="text-gray-700 text-base">Fill in our <a class="text-sky-700 underline"
                        href="#/appointment">online appointment request form</a> to discuss your
                    specific needs or email us at <a class="text-sky-700 underline"
                        href="mailto:enquiries@doctortoday.co.uk">enquiries@doctortoday.co.uk</a>.
                </p>
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