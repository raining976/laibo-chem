<template>
  <div class="navBox">
    <appNav :key="key" />
  </div>
  <!-- <router-view name="search"></router-view> -->
  <keep-alive>
    <router-view name="table" v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view name="table" v-if="!$route.meta.keepAlive"></router-view>
  <router-view name="textPage"></router-view>
  <!-- <appFooter /> -->
  <copyRight />
  <!-- 登录模态框 -->
  <transition leave-active-class="fadeOut">
    <log-in v-if="isShowLogIn" />
  </transition>
  <transition leave-active-class="fadeOut"
    ><private-order v-if="isShowOrder"
  /></transition>
</template>


<script>
import appNav from "./components/main/appNav.vue";
import appFooter from "./components/main/appFooter.vue";
import copyRight from "./components/main/copyRight.vue";
import logIn from "./components/logIn/logIn.vue";
import privateOrder from "./components/privateOrder/privateOrder.vue";
export default {
  name: "App",
  components: {
    appNav,
    appFooter,
    copyRight,
    logIn,
    privateOrder,
  },

  data() {
    return {
      isShowLogIn: false, // 是否显示登录
      key: 1, // 用于强制刷新nav组件
      isShowOrder: false, // 私人订单
    };
  },
  created() {
    // Object.defineProperty(window, "isShowLogin", {
    //   writable: true,
    //   get() {
    //     return this.isShowLogIn;
    //   },
    //   set(val) {
    //     this.isShowLogIn = val;
    //   },
    // });
    // window.isShowLogIn = this.isShowLogIn;
    let nowTime = new Date().getTime() / 1000;
    let refresh_exp = localStorage.getItem("refresh_exp");
    if (refresh_exp - nowTime < 60 && refresh_exp) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("refresh_refresh");
      localStorage.removeItem("token_exp");
    }
  },
  mounted(){
    window.openLogin = this.openLogin
  },
  unmounted() {
    window.localStorage.removeItem("lang");
  },
  methods: {
    // 更改登录页面的显示与否
    changeLogIn() {
      this.isShowLogIn = !this.isShowLogIn;
    },
    openLogin(){
      this.isShowLogIn = true
    }
  },
};
</script>

<style>
:root {
  /* 字体颜色 */
  --text--color: #000;
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
.in-active-path > span,
.el-cascader-node.is-active > span {
  color: var(--color);
}

.el-message {
  transform: scale(1.5);
}
body >>> .is-message-box {
  transform: scale(1.5);
}
body >>> .is-message-box .el-button--primary {
  background: var(--color);
}
.el-dropdown-menu__item:hover a,
.el-dropdown-menu__item:hover span
 {
  font-weight: 700;
  color: var(--color);
}
.el-dropdown__popper .navDropdown .el-dropdown-menu__item {
  font-size: 18px;
  /* 这是两个动画,我只能把我这个放大优先级调到最高 */
  transform-origin: top;
}
.navBox {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
}
.fadeOut {
  animation: fadeOut 0.3s;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeUp {
  0% {
    transform: translateY(40px);
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
