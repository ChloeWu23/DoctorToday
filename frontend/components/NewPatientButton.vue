<template>
    <div class="bg-white border-2 border-sky-700 shadow-lg h-1/3">
        <RouterLink to="/newpatientregister">
            <span class="max-w-sm justify-end">
                <p class="text-sky-700 text-center p-6">Please only register after your appointment is confirmed by the
                    clinic.</p>
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
