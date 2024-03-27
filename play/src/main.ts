import { createApp } from 'vue'
import './assets/main.css'
import Calendar from '@vue-calendar-next'

import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(Calendar)
app.use(router)

app.mount('#app')
