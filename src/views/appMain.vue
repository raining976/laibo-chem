<template>
  <appNav />
  <search />
  <appFooter />
  <copyright />
  <!-- 登录模态框 -->
  <log-in v-show="isShowLogIn"   />
</template>

<script>
import appNav from "../components/main/appNav.vue";
import appFooter from "../components/main/appFooter.vue";
import search from "../components/main/search.vue";
import copyright from "../components/main/copyright.vue";
import logIn from "../components/logIn/logIn.vue";

export default {
  name: "appMain",
  components: {
    appNav,
    appFooter,
    search,
    copyright,
    logIn,
  },
  data() {
    return {
      isShowLogIn: false,
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