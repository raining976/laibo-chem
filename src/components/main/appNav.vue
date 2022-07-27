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
        <div class="btnBox">
          <span class="btn logIn" @click="showLogIn()">{{ logIn }}</span>
          <span class="btn register" @click="toRegister()">{{ register }}</span>
        </div>
        <div class="zh_enBox" @click="isActive = !isActive">
          <span class="zh language" :class="{ choose: isActive }">中</span>
          <span>/</span>
          <span class="en language" :class="{ choose: !isActive }">EN</span>
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
        { menuName: "首页" },
        { menuName: "我的订单" },
        { menuName: "购物车" },
        // { menuName: "私人订制" },
      ],
      logIn: "登录",
      register: "注册",
      isActive: true, // 当前语言是否为中文
      currentIndex: 0, // 当前选中的菜单索引
    };
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
          this.$parent.isShowOrder = !this.$parent.isShowOrder
          break;
        default:
          break;
      }
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

}
.btnBox {
  display: flex;
  justify-content: space-between;
  width: 163px;
  margin-right: 77px;
}
.btnBox .btn {
  width: 67px;
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
.zh_enBox {
  width: 50px;
  cursor: pointer;
}
.language {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
}
/* 被选中的语言按钮的样式 */
.choose {
  font-weight: 600;
  font-size: 20px;
  color: #ed6c00;
}
.menu li {
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
</style>