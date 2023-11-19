import { createApp } from 'vue'
import App from './views/App/App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './main.scss'

import socket from './plugin/socket'
import event from './plugin/EventEmitter'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(socket)
app.use(event)

app.mount('#app')
