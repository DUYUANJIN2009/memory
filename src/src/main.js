import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'


const app = createApp(App)
app.use(Viewer) // 注册插件
app.mount('#app')
