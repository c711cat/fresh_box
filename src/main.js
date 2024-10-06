import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import LoadingView from '@/components/LoadingView.vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { currency, changeDateStyle } from './methods/filters'
import { status200, status404 } from './methods/PushMsg'
import vSelect from 'vue-select'

const app = createApp(App)
app.config.globalProperties.$filters = { currency, changeDateStyle }
app.config.globalProperties.$pushMsg = { status200, status404 }
app.use(VueAxios, axios)
app.use(router)
app.component('LoadingView', LoadingView)
app.component('v-select', vSelect)
app.mount('#app')
