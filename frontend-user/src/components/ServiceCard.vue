<template>
    <div class="grid gap-10 md:grid-cols-3 divide-x grid-auto-flow: column">
        <div v-for="service in fullServices" :key="service.name">
            <div class="bg-sky-100 border-sky-700 border-b-4 min-h-full p-4 drop-shadow-md ">
                <p class="
                font-bold text-sky-600 
                underline underline-offset-4 decoration-sky-700 ">{{ service.name }}
                </p>
                <p class="my-2">include:</p>
                <span v-for="subCatetory in service.children" :key="service.children.name">
                    <li><a :href="subCatetory.path">{{ subCatetory.name }}</a></li>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import services from '../assets/config.json'

export default {
    data() {
        return {
            fullServices: services.priceList
        }
    }
}</script>