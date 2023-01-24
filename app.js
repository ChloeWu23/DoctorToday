const app = Vue.createApp({
    template: "<h1>Hello World</h1>",
    data() {
        return {
            footer: 'Footer'
        }
    }

})

app.mount('#app')