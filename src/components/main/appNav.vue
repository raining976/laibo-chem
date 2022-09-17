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
        <el-dropdown>
          <span>
            {{ name }}
          </span>
          <template #dropdown >
            <el-dropdown-menu class="navDropdown">
              <el-dropdown-item
                ><router-link to="/team"
                  >团队管理</router-link
                ></el-dropdown-item
              >
              <el-dropdown-item
                ><router-link to="/address"
                  >收货地址</router-link
                ></el-dropdown-item
              >
              <el-dropdown-item
                ><router-link to="/info"
                  >个人信息</router-link
                ></el-dropdown-item
              >
              <el-dropdown-item
                ><router-link to="/changePsd"
                  >修改密码</router-link
                ></el-dropdown-item
              >
              <el-dropdown-item divided @click="exitOpen()"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
      this.isLogin = true;
      this.$http.get("/userInfo").then((res) => {
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
      this.$root.isShowLogIn = !this.$root.isShowLogIn;
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
    // 退出登录提示
    exitOpen() {
      this.$confirm("是否确定退出登录,确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exit();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
          });
        });
    },
    // 退出登录
    exit() {
      this.$router.push("/mainPage");
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      this.$message("退出登录成功");
      this.$parent.key++;
    },
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
  margin-right: 77px;
}
.nav .hello:hover .menuBox {
  display: flex !important;
}
.nav .hello .menuBox {
  position: absolute;
  bottom: -40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  padding: 10px 20px;
  border-radius: 5px;
  background: #eaf3f8;
}
.nav >>> .el-dropdown {
  transform: scale(1.3);
  transform-origin: center;
  margin-right: 30px;
  cursor: pointer;
}
.nav >>> .el-message-box {
  transform: scale(1.3);
}

</style>