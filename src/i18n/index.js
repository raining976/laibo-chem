import { createI18n } from 'vue-i18n'
import en from './config/en';
import zh from './config/zh';

const i18n = createI18n({
   // 如果本地有语言标识就采用本地，没有就根据浏览器语言默认标识显示语言
   locale: localStorage.getItem('lang') || navigator.language.slice(0, 2),  // zh-CN
   messages: {
      zh: zh,
      en: en
   },
   legacy: false,
   globalInjection: true,

});
export default i18n;