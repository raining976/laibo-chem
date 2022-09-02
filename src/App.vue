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
import appNav from "./components/main/appNav.vue";
import appFooter from "./components/main/appFooter.vue";
import copyRight from "./components/main/copyRight.vue";
import logIn from "./components/logIn/logIn.vue";
export default {
  name: "App",
  components: {
    appNav,
    appFooter,
    copyRight,
    logIn,
  },

  provide() {
    return {
      reload: this.reload,     
    }
  },
  data() {
      return {
        isReloadData: true, //控制全局刷新
        isShowLogIn: false, // 是否显示登录
        key: 1, // 用于强制刷新nav组件
      }
  },
  methods: {
        // 全局刷新
    reload() {
      this.$data.isReloadData = false;
      this.$nextTick(() => {
        this.$data.isReloadData = true;
      });
    },
  },
  created() {
    let nowTime = new Date().getTime() / 1000;
    let refresh_exp = localStorage.getItem("refresh_exp");
    if (refresh_exp - nowTime < 60 && refresh_exp) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("refresh_refresh");
      localStorage.removeItem("token_exp");
    }
    // 测试用,开始先清除token
    // localStorage.removeItem("token");
    // localStorage.removeItem("refresh")
  },
  unmounted() {
    window.localStorage.removeItem("lang");
    console.log("已移除");
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
:root {
  /* 字体颜色 */
  --text--color: #666666;
  /* 主题色 */
  --color: #004ea2;
  /* 判定通过颜色 */
  --check-color: #1c6905;
}
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}
a {
  color: black;
  text-decoration-line: none;
}
li {
  list-style: none;
}
input,
textarea {
  resize: none;
}
</style>
