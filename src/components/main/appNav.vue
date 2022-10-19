<template>
  <div class="nav" ref="nav">
    <div class="h">
      <div class="content">
        <div class="logoBox">
          <img src="../../assets/logo.png" alt="" @click="toMainPage()" />
        </div>
        <div class="inputBox">
          <input
            v-model="inputValue"
            type="text"
            placeholder="输入产品编码，CAS编码，关键字或结构式"
            @keyup.enter="toSearchResult()"
          />
          <img
            :src="searchIcon[this.isWhite]"
            alt=""
            class="search"
            @click="toSearchResult()"
          />
        </div>
        <ul class="menu">
          <li
            v-for="(item, index) in menuLists"
            :key="index"
            @click="routerTo(index)"
          >
            <span ref="nav_li">
              {{ item.menuName }}
            </span>
          </li>
          <span
            class="chosen"
            :style="{ width: chosenWidth }"
            ref="chosen"
          ></span>
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
          <span class="userName">
            {{ name }}
          </span>
          <template #dropdown>
            <el-dropdown-menu class="navDropdown">
              <el-dropdown-item
                ><span @click="toTeam()">团队管理</span></el-dropdown-item
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
        <div class="toILabPlus">
          {{ $t("home.toILaiBoPlus") }}
        </div>
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
        { menuName: "私人订制" },
      ],
      register: "注册",
      isActive: true, // 当前语言是否为中文
      currentIndex: 0, // 当前选中的菜单索引
      isLogin: false, // 是否为登录状态
      name: "", // 用户姓名
      chosenWidth: "", // 被选中的导航栏条的宽度
      searchIcon: [
        require("../../assets/search_white.png"),
        require("../../assets/search_black.png"),
      ],
      isWhite: 0, // 在主页为 0 , 不在主页为 1
      inputValue: "", // 搜索关键词
      isSearch: 0,
    };
  },
  created() {
    // 个人状态
    if (localStorage.getItem("token")) {
      this.$http.get("/userInfo").then((res) => {
        if (res.data.code == 20000) {
          localStorage.setItem("privilege", res.data.data.privilege);
          localStorage.setItem("in_team", res.data.data.in_team);
          localStorage.setItem("myEmail", res.data.data.email);
        }
      });
    }

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
  mounted() {
    // console.log('this.currentIndex',this.currentIndex)
    // console.log("this.$refs.nav_li", this.$refs.nav_li[this.currentIndex].clientWidth);
    setTimeout(() => {
      this.$refs.chosen.style.left =
        this.$refs.nav_li[this.currentIndex].offsetLeft + "px";
      this.chosenWidth =
        this.$refs.nav_li[this.currentIndex].offsetWidth + "px";
    }, 50);
  },
  watch: {
    // 监听路由
    $route: {
      immediate: true,
      handler(val) {
        console.log("val", val);
        if (val.path == "/" || val.path == "/mainPage") {
          document.documentElement.style.setProperty("--text--color", "#fff");
          this.isWhite = 0;
        } else {
          document.documentElement.style.setProperty("--text--color", "#000");
          this.isWhite = 1;
        }
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
    },
    currentIndex(val) {
      if (this.currentIndex == -1) this.$refs.chosen.style.display = "none";
      else {
        this.$refs.chosen.style.display = "inline-block";
        this.$refs.chosen.style.left =
          this.$refs.nav_li[this.currentIndex].offsetLeft + "px";
        // this.$refs.chosen.style.left = 100 * val + "px";
        this.chosenWidth = this.$refs.nav_li[val].offsetWidth + "px";
      }
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
    toTeam() {
      let inTeam = localStorage.getItem("in_team");
      if (inTeam == 0) this.$router.push("/teamBlank");
      else if (inTeam == 1) this.$router.push("/searchMember");
    },
    // 退出登录
    exit() {
      this.$router.push("/mainPage");
      // localStorage.removeItem("token");
      // localStorage.removeItem("refresh");
      localStorage.clear();
      this.$message("退出登录成功");
      this.$parent.key++;
    },
    // 搜索
    toSearchResult() {
      if (this.inputValue !== "") {
        this.isSearch++;
        if (this.$route.path !== "/searchResult") {
          this.$router.push({
            path: "/searchResult",
            query: {
              inputValue: this.$data.inputValue,
            },
          });
        } else if (this.$route.path === "/searchResult") {
          this.$router.push({
            path: "/searchResult",
            query: {
              inputValue: this.inputValue,
              isSearch: this.isSearch,
            },
          });
        }
      }
    },
    toMainPage() {
      if (this.$route.path != "/" || this.$route.path != "/mainPage")
        this.$router.push("/mainPage");
    },
  },
};
</script>

<style scoped>
:root {
  --text--color: #ffffff;
}
.nav {
  /* Position */
  /* Box-model */
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100px;
  /* Typography */
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  font-size: 18px;
  /* visual */
  background-color: transparent;
  /* background: pink; */
  border-bottom: 1px solid var(--text--color);
}
.h {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
.logoBox {
  width: 220px;
  cursor: pointer;
}
.logoBox img {
  /* width: 60px;
  height: 60px; */
  width: 219px;
  height: 74px;
}

.inputBox {
  position: relative;
  width: 370px;
  height: 100%;
  display: flex;
  align-items: center;
}
.inputBox input {
  width: 370px;
  height: 39px;
  border-radius: 19px;
  border: 1px solid var(--text--color);
  background: transparent;
  color: var(--text--color);
  padding: 0 20px;
}
.inputBox input::placeholder {
  color: var(--text--color);
}
.inputBox .search {
  position: absolute;
  right: 15px;
  width: 23px;
  height: 23px;
  cursor: pointer;
}
.menu {
  position: relative;
  /* box-model */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--text--color);
}

.menu .chosen {
  display: inline-block;
  width: 0px;
  height: 7px;
  background: var(--color);
  position: absolute;
  left: 0;
  bottom: -26px;
  transition: 0.5s;
}
.btnBox {
  display: flex;
  justify-content: space-between;
  color: var(--text--color);
}
.btnBox .btn:first-child {
  margin-right: 30px;
}
.btnBox .btn {
  padding: 0 20px;
  height: 39px;
  text-align: center;
  line-height: 39px;
  border: 1px solid var(--text--color);
  border-radius: 19px;
  cursor: pointer;
  transition: all 0.3s;
}
.btnBox .btn:hover {
  background-color: var(--color);
  color: #000;
  border-color: var(--color);
}
.zh_enBox {
  color: var(--text--color);
}
.language {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  margin: 0 10px;
  color: var(--text--color);
  cursor: pointer;
}
/* 被选中的语言按钮的样式 */
.choose {
  font-weight: 600;
  font-size: 20px;
  color: var(--color);
}
.menu li {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 20px;
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
.userName {
  color: var(--text--color);
}
.toILabPlus {
  padding: 0 20px;
  height: 39px;
  border: 1px solid var(--text--color);
  border-radius: 19px;
  text-align: center;
  line-height: 39px;
  color: var(--text--color);
  cursor: pointer;
  transition: 0.3s;
}
.toILabPlus:hover {
  background-color: var(--color);
  border-color: var(--color);
  color: #000;
}
</style>
<style>
.el-dropdown__popper {
  background: rgba(0, 0, 20, 0.3);
}
</style>