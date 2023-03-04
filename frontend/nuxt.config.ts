// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Doctor Today"
        }
    },
    css: [
        '~/assets/css/tailwind.css'
    ],
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@element-plus/nuxt']
})