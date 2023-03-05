// https://nuxt.com/docs/api/configuration/nuxt-config
import axios from 'axios'

const getPostRoutes = async () => {

    const endpoint = 'https://doctor-today-back.herokuapp.com/service'
    const response = await axios.get(endpoint)
    let services = response.data;

    let slugs = services.map((each) => {
        return '/services/' + each.serviceName.replace(/\s+/g, '-').toLowerCase()
    })

    return slugs
}

export default defineNuxtConfig({
    app: {
        head: {
            title: "Doctor Today"
        }
    },
    css: [
        '~/assets/css/tailwind.css'
    ],
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@element-plus/nuxt'],
    hooks: {
        async 'nitro:config'(nitroConfig) {
            if (nitroConfig.dev) {
                return
            }
            let slugs = await getPostRoutes();
            nitroConfig.prerender.routes.push(...slugs)
            return
        }
    }

}
)