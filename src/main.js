import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/scss/_main.scss'
import { OhVueIcon } from "oh-vue-icons";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.component("v-icon", OhVueIcon)
app.use(pinia).use(router).mount('#app')