import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import installElementPlus from './plugins/element'
import axios from 'axios';
import VueI18n from './i18n/index'
import interceptor from "./Interceptor/config"


const app = createApp(App);
app.config.globalProperties.$http = axios;
// 挂载js-base64
let Base64 = require('js-base64').Base64;
app.config.globalProperties.$Base64=Base64;
app.config.globalProperties.getToken = function () {
    localStorage.getItem('token')
}

axios.defaults.baseURL = 'https://hnxnb.tk/';

app.use(router).use(installElementPlus).use(VueI18n).use(interceptor).mount("#app");
