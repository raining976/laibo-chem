<template>
  <div class="userInfo">
    <div class="h">
      <div class="contentBox">
        <div class="menuBox">
          <ul class="menuUl">
            <li
              class="eachSelect"
              v-for="(item, index) in menuList"
              :key="index"
              :class="{ choose: currentIdx == index }"
              
              @click="chooseThis(index)"
            >
              {{ item.selectName }}
              <span class="square"></span>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="menuContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      menuList: [
        { selectName: this.$t("userMenu.cart") },
        { selectName: this.$t("userMenu.order") },
        { selectName: this.$t("userMenu.team") },
        { selectName: this.$t("userMenu.address") },
        { selectName: this.$t("userMenu.info") },
        { selectName: this.$t("userMenu.changePass") },
      ],
      addFun: { selectName: this.$t("userMenu.orderReview") },
      currentIdx: 0, // 当前选中的菜单选项
    };
  },
  created() {
    let quanxian = localStorage.getItem("privilege");
    // 0成员 1普通管理员 2群主？
    if( quanxian === "1" || quanxian === "2") {
        this.menuList.push(this.addFun);
    }
  },
  watch: {
    // 监听路由
    $route: {
      handler() {
        let name = this.$route.name;
        switch (name) {
          case "cart":
          case "setOrder":
            this.currentIdx = 0;
            break;
          case "order":
          case "payment":
          case "orderInfo":
            this.currentIdx = 1;
            break;
          case "team":
          case "teamBlank":
          case "joinTeam":
          case "createTeam":
          case "searchMember":
          case "editTeam":
            this.currentIdx = 2;
            break;
          case "address":
            this.currentIdx = 3;
            break;
          case "info":
            this.currentIdx = 4;
            break;
          case "changePsd":
            this.currentIdx = 5;
            break;
          case "orderReview":
            this.currentIdx = 6;
            break;
          default:
            this.currentIdx = -1;
            break;
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 跳转到对应路由
    chooseThis(idx) {
      switch (idx) {
        case 0:
          this.$router.push("/cart");
          break;
        case 1:
          this.$router.push("/order");
          break;
        case 2:
          let inTeam = localStorage.getItem("in_team");
          if (inTeam == 1) this.$router.push("/searchMember");
          else if (inTeam == 0) this.$router.push("/teamBlank");
          break;
        case 3:
          this.$router.push("/address");
          break;
        case 4:
          this.$router.push("/info");
          break;
        case 5:
          this.$router.push("/changePsd");
          break;
        case 6:
          this.$router.push("/orderReview");
          break;
        default:
          break;
      }
    },
  },
};
</script>


<style scoped>
.userInfo {
  width: 100%;
  min-height: 54.9vw;
  padding-top: 5.21vw;
}
.contentBox {
  display: flex;
}
.menuBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 17.19vw;
}
.eachSelect {
  position: relative;
  text-align: start;
  line-height: 2.6vw;
  width: calc(15.99vw - 4.27vw);
  padding: 0 2.14vw;
  height: 2.6vw;
  border-radius: 0.26vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #4a4a4a;
  cursor: pointer;
  margin: 0.42vw 0;
  transition: all 0.3s;
  /* background: #e3f5ff; */
}

.choose {
  background: #e3f5ff;
}
.square {
  position: absolute;
  display: inline-block;
  left: 0.52vw;
  top: 1.09vw;
  width: 0.52vw;
  height: 0.52vw;
  transition: all 0.3s;
}
.choose .square {
  left: 1.25vw;
  top: 1.09vw;
  background: #004ea2;
}
.line {
  width: 0.16vw;
  background-color: #eaeaec;
  height: 44.9vw;
  margin-top: 0.63vw;
}
.menuContent {
  min-height: 54.9vw;
  margin: 2.6vw 2.6vw 5.21vw 2.6vw;
  flex: 1;
}
</style>