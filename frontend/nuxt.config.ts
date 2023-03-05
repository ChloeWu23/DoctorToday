// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Doctor Today",
            script: [
                { src: 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.9/dist/cookieconsent.js'},
                { innerHTML: `
                window.addEventListener('load', function(){

                    var cc = initCookieConsent();
        
                    cc.run({
                        current_lang: 'en',
                        autoclear_cookies: true,                   // default: false
                        page_scripts: true,                        // default: false

                        onFirstAction: function(user_preferences, cookie){
                            // callback triggered only once on the first accept/reject action
                        },
        
                        onAccept: function (cookie) {
                            // callback triggered on the first accept/reject action, and after each page load
                        },
        
                        onChange: function (cookie, changed_categories) {
                            // callback triggered when user changes preferences after consent has already been given
                        },
        
                        languages: {
                            'en': {
                                consent_modal: {
                                    title: 'Cookies',
                                    description: 'This website makes use of browser cookies to provide essential functionality. It also makes use of Google Ads, which in turn makes use of browser cookies to track ad performance and to personalise ads. <a aria-label="Cookie policy" class="cc-link" href="https://www.doctortoday.co.uk/faqs">Learn more</a>',
                                    primary_btn: {
                                        text: 'Got it',
                                        role: 'accept_all'              // 'accept_selected' or 'accept_all'
                                    },
                                },
                                settings_modal: {
                                    blocks: [
                                    ]
                                }
                            }
                        },
                        gui_options: {
                            consent_modal: {
                                layout: 'cloud',               // box/cloud/bar
                                position: 'bottom left',     // bottom/middle/top + left/right/center
                                transition: 'slide',           // zoom/slide
                                swap_buttons: false            // enable to invert buttons
                            },
                            settings_modal: {
                                layout: 'box',                 // box/bar
                                // position: 'left',           // left/right
                                transition: 'slide'            // zoom/slide
                            }
                        }
                    });
                });
                `}
            ],
            link: [
                { rel: 'stylesheet', href:'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.9/dist/cookieconsent.css'},
            ]         
        }
    },
    css: [
        '~/assets/css/tailwind.css'
    ],
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@element-plus/nuxt'],
    
})