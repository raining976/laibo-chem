<template>
  <div class="nav" ref="nav">
    <div class="h">
      <div class="content">
        <div class="logoBox">
          <img :src="logos[this.isWhite]" alt="" @click="toMainPage()" />
        </div>
        <div class="inputBox">
          <input
            v-model="inputValue"
            type="text"
            :placeholder="$t('home.searchTip')"
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
        <el-dropdown v-if="isLogin">
          <span class="userName"> {{ $t("nav.hello") + name }} </span>
          <template #dropdown>
            <el-dropdown-menu class="navDropdown">
              <el-dropdown-item
                ><span @click="toTeam()">{{ $t('userMenu.team') }}</span></el-dropdown-item
              >
              <el-dropdown-item
                ><router-link to="/address"
                  >{{ $t('userMenu.address') }}</router-link
                ></el-dropdown-item
              >
              <el-dropdown-item
                ><router-link to="/info"
                  >{{ $t('userMenu.info') }}</router-link
                ></el-dropdown-item
              >
              <el-dropdown-item
                ><router-link to="/changePsd"
                  >{{ $t('userMenu.changePass') }}</router-link
                ></el-dropdown-item
              >
              <el-dropdown-item divided @click="exitOpen()"
                >{{ $t('userMenu.exit') }}</el-dropdown-item
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
        { menuName: this.$t("nav.customization") },
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
      logos: [
        require("../../assets/logo.png"),
        require("../../assets/logo_black.png"),
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
      this.$refs.chosen.style.left = this.$refs.nav_li[this.currentIndex].offsetLeft + "px";
      this.chosenWidth = this.$refs.nav_li[this.currentIndex].offsetWidth + "px";
    }, 50);
  },

  watch: {
    // 监听路由
    $route: {
      immediate: true,
      handler(val) {
        // console.log("val", val);
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
          // 私人订单
          this.$root.isShowOrder = !this.$root.isShowOrder;
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
      this.$confirm(this.$t('callback.exitTip'), this.$t('base.tip'), {
        confirmButtonText: this.$t('base.sure'),
        cancelButtonText: this.$t('base.cancel'),
        type: "warning",
      })
        .then(() => {
          this.exit();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t('base.canceled'),
          });
        });
    },
    toTeam() {
      if (this.$route.path.includes("team")) return;
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
      this.$message(this.$t('callback.exitSuccess'));
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
              inputValue: this.inputValue,
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
  height: 5.21vw;
  /* Typography */
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  font-size: 0.94vw;
  /* visual */
  background-color: transparent;
  /* background: pink; */
  border-bottom: 0.05vw solid var(--text--color);
  /* background: #ffffff; */
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
  width: 11.46vw;
  cursor: pointer;
}
.logoBox img {
  width: 11.41vw;
  height: 3.85vw;
}

.inputBox {
  position: relative;
  width: 19.5vw;
  height: 100%;
  display: flex;
  align-items: center;
}
.inputBox input {
  width: 19.5vw;
  height: 2.03vw;
  border-radius: 0.99vw;
  border: 0.05vw solid var(--text--color);
  background: transparent;
  color: var(--text--color);
  padding: 0 1.04vw;

}
.inputBox input::placeholder {
  color: var(--text--color);
  font-size: 0.83vw;
}

.inputBox .search {
  position: absolute;
  right: 0.78vw;
  width: 1.2vw;
  height: 1.2vw;
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
  width: 0vw;
  height: 0.36vw;
  background: var(--color);
  position: absolute;
  left: 0;
  bottom: -1.35vw;
  transition: 0.5s;
}
.btnBox {
  display: flex;
  justify-content: space-between;
  color: var(--text--color);
}
.btnBox .btn:first-child {
  margin-right: 1.56vw;
}
.btnBox .btn {
  padding: 0 1.04vw;
  height: 2.03vw;
  text-align: center;
  line-height: 2.03vw;
  border: 0.05vw solid var(--text--color);
  border-radius: 0.99vw;
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
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  margin: 0 0.52vw;
  color: var(--text--color);
  cursor: pointer;
}
/* 被选中的语言按钮的样式 */
.choose {
  font-weight: 600;
  font-size: 1.04vw;
  color: var(--color);
}
.menu li {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 1.04vw;
}
.nav .hello {
  position: relative;
  cursor: pointer;
  margin-right: 4.01vw;
}
.nav .hello:hover .menuBox {
  display: flex !important;
}
.nav .hello .menuBox {
  position: absolute;
  bottom: -2.08vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5.21vw;
  padding: 0.52vw 1.04vw;
  border-radius: 0.26vw;
  background: #eaf3f8;
}

.nav >>> .el-dropdown {
  transform: scale(1.3);
  transform-origin: center;
  margin-right: 1.56vw;
  cursor: pointer;
}
.nav >>> .el-message-box {
  transform: scale(1.3);
}
.userName {
  color: var(--text--color);
  font-size: 0.9375vw;
}
.toILabPlus {
  padding: 0 1.04vw;
  height: 2.03vw;
  border: 0.05vw solid var(--text--color);
  border-radius: 0.99vw;
  text-align: center;
  line-height: 2.03vw;
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