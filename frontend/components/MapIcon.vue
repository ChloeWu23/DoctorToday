<template>
    <div class="flex items-center bg-white text-sky-700 m-10">
        <span class="font md:text-xl tracking-tight"><button @click="getDirection">
                Get Direction
            </button></span>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        getDirection() {
            window.location = 'geo:40.765819,-73.975866';
        }
    }
}</script>
