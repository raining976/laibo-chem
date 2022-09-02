
<template>
  <appNav :key="key" />
  <router-view name="search"></router-view>
  <router-view name="table"></router-view>
  <router-view name="textPage"></router-view>
  <appFooter />
  <copyRight />
  <!-- 登录模态框 -->
   
  <log-in v-if="isShowLogIn" />
</template>

<script>
import appNav from "../components/main/appNav.vue";
import appFooter from "../components/main/appFooter.vue";
import copyRight from "../components/main/copyRight.vue";
import logIn from "../components/logIn/logIn.vue";

export default {
  name: "appMain",
  components: {
    appNav,
    appFooter,
    copyRight,
    logIn,
  },
  data() {
    return {
      isShowLogIn: false, // 是否显示登录
      key: 1, // 用于强制刷新nav组件
    };
  },
  methods: {
    // 更改登录页面的显示与否
    changeLogIn() {
      this.isShowLogIn = !this.isShowLogIn;
    
    },
  },
};
</script>

<style>
</style>