<template>
    <div class="w-full"></div>
    <div class="m-10 min-w-fit max-w-sm md:max-w-lg">
        <p>At Doctor Today we offer a wide range of medical services, the most frequently requested of which fall into
            the following categories.</p>
        <p>Please click a category name to skip directly to detailed service and pricing information</p>
    </div>
    <div class="m-10 grid gap-10 md:grid-cols-3 divide-x grid-auto-flow: column">
        <div v-for="service in fullServices" :key="service.name">
            <div class="bg-sky-100 rounded border-sky-700 min-h-full p-4 drop-shadow-md">
                <p class="font-bold text-sky-600">{{ service.name }}</p>
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