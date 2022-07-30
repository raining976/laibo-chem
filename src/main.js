import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import installElementPlus from './plugins/element'
import axios from 'axios';
// 地址选择器
// import 'vue-area-linkage/dist/index.css';
// import 'vue3-country-intl/lib/vue3-country-intl.css'


const app = createApp(App);
app.config.globalProperties.$http = axios;

// axios.defaults.baseURL = 'https://api.lmark.cc/v1/api';
app.use(router).use(installElementPlus).mount("#app");
