<template>
  <div class="nav">
    <div class="h">
      <div class="content">
        <ul class="menu">
          <li
            v-for="(item, index) in menuLists"
            :key="index"
            :class="{ chosen: index == currentIndex }"
            @click="routerTo(index)"
          >
            {{ item.menuName }}
          </li>
        </ul>
        <div class="btnBox" v-if="!isLogin">
          <span class="btn logIn" @click="showLogIn()">{{
            $t("nav.logIn")
          }}</span>
          <span class="btn register" @click="toRegister()">{{
            $t("nav.register")
          }}</span>
        </div>
        <!-- 你好客户 -->
        <div class="btnBox hello" v-if="isLogin" @click="toUserInfo()">
          你好,{{ name }}!
        </div>
        <div class="sonMenu" @click="exit()">退出登录</div>
        <!-- /你好客户 -->
        <div class="zh_enBox">
          <span
            class="zh language"
            :class="{ choose: isActive }"
            @click="changeLang('zh')"
            >中</span
          >
          <span>/</span>
          <span
            class="en language"
            :class="{ choose: !isActive }"
            @click="changeLang('en')"
            >EN</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "appNav",
  data() {
    return {
      menuLists: [
        { menuName: this.$t("nav.home") },
        { menuName: this.$t("nav.myOrder") },
        { menuName: this.$t("nav.cart") },
        // { menuName: "私人订制" },
      ],
      register: "注册",
      isActive: true, // 当前语言是否为中文
      currentIndex: 0, // 当前选中的菜单索引
      isLogin: false, // 是否为登录状态
      name: "", // 用户姓名
      isMenuShow: false, // 是否展示子菜单
    };
  },
  created() {
    let lang = localStorage.getItem("lang");
    switch (lang) {
      case "zh":
        this.isActive = true;
        break;
      case "en":
        this.isActive = false;
        break;
      default:
        break;
    }
    if (localStorage.getItem("token")) {
      console.log("存在token");
      this.isLogin = true;
      this.$http.get("/userInfo").then((res) => {
        console.log("nav_res", res);
        this.name = res.data.data.name;
      });
    }
  },
  watch: {
    // 监听路由
    $route: {
      handler() {
        let routeName = this.$route.name;
        switch (routeName) {
          case "mainPage":
            this.currentIndex = 0;
            break;
          case "order":
            this.currentIndex = 1;
            break;
          case "cart":
            this.currentIndex = 2;
            break;
          default:
            this.currentIndex = -1;
            break;
        }
      },
      immediate: true,
    },
  },
  methods: {
    showLogIn() {
      this.$parent.isShowLogIn = !this.$parent.isShowLogIn;
    },
    toRegister() {
      this.$router.push("/register");
    },
    routerTo(index) {
      switch (index) {
        case 0:
          this.$router.push("/mainPage");
          break;
        case 1:
          this.$router.push("/order");
          break;
        case 2:
          this.$router.push("/cart");
          break;
        case 3:
          this.$parent.isShowOrder = !this.$parent.isShowOrder;
          break;
        default:
          break;
      }
    },
    changeLang(lang) {
      if (lang != localStorage.getItem("lang")) {
        localStorage.setItem("lang", lang);
        window.location.reload();
      }
    },
    toUserInfo() {
      this.$router.push("/info");
    },
    // 下拉菜单
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    // 退出登录
    exit(){
      localStorage.removeItem("token")
      localStorage.removeItem("refresh")
      this.$parent.key++

    }
  },
};
</script>

<style scoped>
.nav {
  /* Position */
  /* Box-model */
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 72px;
  /* Typography */
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
  font-size: 18px;
  /* visual */
  background: #e3f5ff;
  box-shadow: 0px 0px 40px 0px rgba(0, 78, 162, 0.23) inset;
  /* 内部阴影 */
}
.h {
  display: flex;
  justify-content: flex-end;
  width: 72%;
  margin: 0 auto;
}
.content {
  /* box-model */
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;
}
.menu {
  /* box-model */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btnBox {
  display: flex;
  justify-content: space-between;
  width: 170px;
  margin-right: 77px;
}
.btnBox .btn {
  width: 75px;
  height: 39px;
  text-align: center;
  line-height: 39px;
  border: 1px solid #666666;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}
.btnBox .btn:hover {
  background-color: #fec79a;
  color: var(--color);
}
.language {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  margin: 0 10px;
  cursor: pointer;
}
/* 被选中的语言按钮的样式 */
.choose {
  font-weight: 600;
  font-size: 20px;
  color: #ed6c00;
}
.menu li {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-bottom: 8px;
  margin-right: 50px;
}
/* 被选中菜单按钮的样式 */
.menu .chosen {
  padding-bottom: 5px;
  border-bottom: 3px solid #ed6c00;
  transition: border 0.4s;
}
.nav .hello {
  position: relative;
  cursor: pointer;
}
.nav .hello .sonMenu {
  position: absolute;
  bottom: -20px;
}
</style>