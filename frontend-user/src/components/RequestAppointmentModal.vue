<template>
    <div class="absolute z-10 inset-0 h-full w-full bg-gray-200/50 grid md:grid-cols-4 lg:grid-cols-6">
        <div class="lg:col-span-2"></div>
        <div class="md:col-span-2 mt-20 md:min-h-2/3 max-h-screen md:h-[70vh] max-h-screen bg-teal-700 rounded-lg">
            <div class="flex justify-end">
                <button class="p-2" @click="handleClose">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                            fill="rgba(255,255,255,1)" />
                    </svg>
                </button>
            </div>
            <iframe src="https://online-booking.semble.io/?token=59df46c901c3c1673ec018b4eec76f70ce63838c"
                class="h-full w-full border-0" frameborder="0" scrolling="auto"></iframe>
        </div>
        <div></div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        handleClose() {
            this.$emit("close");
        }
    }
}
</script>