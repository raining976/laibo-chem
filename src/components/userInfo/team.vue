// 团队管理部分
//createDate:2022-07-17
<template>
  <div class="team">
    <div class="topBox">
      <h3 class="title">{{ $t("userMenu.team") }}</h3>
      <div class="setBox" v-if="isAdmin">
        <el-tooltip
          :content="$t('team.edit')"
          placement="top"
          effect="light"
          popper-class="editTip"
        >
          <i class="el-icon-edit-outline edit set" @click="toEditTeam()"></i>
        </el-tooltip>
        <el-tooltip
          :content="$t('team.message')"
          placement="top"
          effect="light"
          popper-class="editTip"
        >
          <el-badge :value="notices.length" :max="9">
            <i
              class="el-icon-bell notice set"
              @click="isNoticeShow = !isNoticeShow"
            ></i>
          </el-badge>
        </el-tooltip>
        <!-- 通知模态框 -->
        <notice
          v-show="isNoticeShow"
          ref="notice"
          :notices="notices"
          :key="noticeKey"
        />
      </div>
    </div>
    <div class="content">
      <router-view :key="refreshKey"></router-view>
    </div>
  </div>
</template>
<script>
import notice from "../teamPage/notice.vue";
export default {
  name: "team",
  components: {
    notice,
  },
  data() {
    return {
      team: "", // 团队名称
      in_team: -1, //是否在团队里
      privilege: -1, // 权限
      isNoticeShow: false,
      isAdmin: true, // 是否为管理员,默认是
      refreshKey: 0, // 刷新key
      noticeKey: 0, // notice刷新key
      notices: [], // 申请加入团队的通知列表
    };
  },
  mounted() {
    this.getUserInfo();
    this.getNotice();
  },
  watch: {
    isNoticeShow: {
      handler(val) {
        if (val) {
          window.addEventListener("mousedown", this.closeNotice);
        } else {
          window.removeEventListener("mousedown", this.closeNotice);
        }
      },
      immediate: false,
    },
  },
  methods: {
    toEditTeam() {
      this.$router.push({
        name: "editTeam",
      });
    },
    closeNotice(e) {
      let notice = document.getElementsByClassName("noticeBox")[0]; // 目标元素
      if (!e.path.includes(notice)) {
        this.isNoticeShow = false;
      }
    },

    // 处理是否位于团队的方法
    isInTeam(flag) {
      switch (flag) {
        case 0:
          this.$router.push("/teamBlank");
          break;
        case 1:
          this.$router.push("/searchMember");
          break;
        default:
          break;
      }
    },

    // 处理是否为管理员
    isAdminHandler(flag) {
      switch (flag) {
        case 0:
          this.isAdmin = false;
          break;
        case 1:
          this.isAdmin = true;
          break;
        default:
          break;
      }
    },
    // 获取用户信息,判断权限问题
    getUserInfo() {
      this.$http.get("/userInfo").then((res) => {
        if (res.data.code == 20000) {
          this.team = res.data.data.team;
          this.in_team = res.data.data.in_team;
          this.privilege = res.data.data.privilege;
          this.isAdminHandler(this.privilege);
          this.isInTeam(this.in_team);
        }
      });
    },

    // 管理员界面获取申请加入团队的通知
    getNotice() {
      if (this.isAdmin) {
        this.$http.get("/team").then((res) => {
          if (res.data.code == 20000) {
            if (res.data.data) {
              this.notices = res.data.data.acceptList;
            } else this.notices = [];
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.topBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eaeaec;
}
.title {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
}
.setBox {
  position: relative;
  margin-right: 100px;
}
.team .setBox >>> .set {
  margin: 0 20px;
  transform: scale(2.5);
  transform-origin: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #e3f5ff;
  border-radius: 5px;
}
.team .setBox .edit:hover,
.team .setBox .notice:hover {
  color: var(--color);
}
.team >>> .el-badge__content {
  color: #fff;
  font-weight: 600;
  background: red;
}
</style>