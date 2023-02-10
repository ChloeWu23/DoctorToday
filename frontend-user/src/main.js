import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './index.css'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App);

import store from './admin_store';

app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount('#app');