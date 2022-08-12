import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import installElementPlus from './plugins/element'
import axios from 'axios';
import VueI18n from './i18n/index'


const app = createApp(App);
app.config.globalProperties.$http = axios;


axios.defaults.baseURL = 'https://hnxnb.tk/';

app.use(router).use(installElementPlus).use(VueI18n).mount("#app");
