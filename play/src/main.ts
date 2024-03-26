import './assets/main.css'
import { ElButton } from '../../packages'
// import { ElButton } from '@vue-calendar-next'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
console.log('ElButton:', ElButton)
const app = createApp(App)
app.use(ElButton)
app.use(router)

app.mount('#app')
