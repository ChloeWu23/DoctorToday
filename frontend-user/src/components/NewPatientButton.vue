<template>
    <div class="bg-white border-2 border-sky-700 rounded-lg w-1/6 shadow-lg">
        <RouterLink to="/newpatientregister">
            <span class="max-w-sm justify-end">
                <p class="font-bold text-sky-700 text-center p-6">Please only register after your appointment is confirmed by the clinic.</p>
            </span>
        </RouterLink>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>
