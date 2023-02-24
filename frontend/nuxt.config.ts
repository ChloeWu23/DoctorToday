// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Doctor Today"
        }
    },
    css: [
        '~/assets/css/tailwind.css',
        "quill/dist/quill.snow.css",
        "quill/dist/quill.bubble.css",
        "quill/dist/quill.core.css"
    ],
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
    plugins: [ { src: 'plugins/quill.client.js', ssr: false }]
})