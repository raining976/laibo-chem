// 团队管理部分
//createDate:2022-07-17
<template>
  <div class="team">
    <div class="topBox">
      <h3 class="title">{{ $t("userMenu.team") }}</h3>
      <div class="setBox" v-if="in_team != 0">
        <i class="el-icon-delete set" @click="delTeamOpen()" v-if="isAdmin"></i>
        <el-tooltip
          :content="$t('team.edit')"
          placement="top"
          effect="light"
          popper-class="editTip"
        >
          <i class="el-icon-edit-outline edit set" @click="toEditTeam()"></i>
        </el-tooltip>
        <el-tooltip
          v-if="isAdmin"
          :content="$t('team.message')"
          placement="top"
          effect="light"
          popper-class="editTip"
        >
          <el-badge :value="noticeLength" :max="10" :hidden="noticeLength == 0">
            <i
              class="el-icon-bell notice set"
              @click="isNoticeShow = !isNoticeShow"
            ></i>
          </el-badge>
        </el-tooltip>
        <notice v-show="isNoticeShow" ref="notice" :key="noticeKey" />
      </div>
    </div>
    <div class="content">
      <router-view @update="getUserInfo()"></router-view>
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
      privilege: 0, // 权限
      isNoticeShow: false,
      isAdmin: false, // 是否为管理员,默认是
      noticeKey: 0, // notice刷新key
      notices: [], // 申请加入团队的通知列表
      teamId: -1, // 团队id
      noticeLength: 0, // 通知列表长度
    };
  },
  mounted() {
    
    this.getUserInfo();
    setTimeout(() => {
      if (this.in_team != 0) {
        this.getTeamInfo();
      }
    }, 50);
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
    privilege: {
      handler(val) {
        if (val == 1 || val == 2) this.isAdmin = true;
        else this.isAdmin = false;
      },
      immediate: true,
    },
  },
  methods: {
    toEditTeam() {
      this.$router.push({
        name: "editTeam",
        params: {
          editFlag: true,
        },
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
    // 获取用户信息,判断权限问题
    getUserInfo() {
      this.$http.get("/userInfo").then((res) => {
        if (res.data.code == 20000) {
          this.team = res.data.data.team;
          this.in_team = res.data.data.in_team;
          this.privilege = res.data.data.privilege;
          this.isInTeam(this.in_team);
        }
      });
    },
    // 删除团队
    delTeam() {
      this.$http
        .post("/delTeam", {
          id: localStorage.getItem("teamId"),
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: this.$t('callback.deleSuccess'),
              type: "success",
            });
            this.in_team = 0;
            this.$router.push("/teamBlank");
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
          this.$message({
            message: this.$t('callback.error'),
            type: "error",
          });
        });
    },
    // 删除团队提示
    delTeamOpen() {
      this.$confirm(this.$t('callback.deleWarn'), this.$t('base.tip'), {
        confirmButtonText: this.$t('base.sure'),
        cancelButtonText: this.$t('base.cancel'),
        type: "warning",
      })
        .then(() => {
          this.delTeam();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t('base.canceled'),
          });
        });
    },
    getTeamInfo() {
      if (this.in_team) {
        this.$http
          .get("/teamInfo")
          .then((res) => {
            if (res.data.code == 20000) {
              this.teamId = res.data.data.id;
              localStorage.setItem("teamId", this.teamId);
            }
          })
          .catch((err) => {
            this.$message({
              message: this.$t('callback.error'),
              type: "error",
            });
            console.log("err", err);
          });
      }
    },
    // 强制刷新方法
    refreshFun() {
      this.$forceUpdate();
    },
  },
};
</script>
<style scoped>
.topBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.56vw;
  margin-bottom: 1.04vw;
  border-bottom: 0.1vw solid #eaeaec;
}
.title {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
}
.setBox {
  position: relative;
  margin-right: 5.21vw;
}
.team .setBox >>> .set {
  margin: 0 1.04vw;
  transform: scale(2.5);
  transform-origin: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #e3f5ff;
  border-radius: 0.26vw;
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
@media screen and (max-width: 960px) {
  .team .setBox >>> .set {
  transform: scale(1.5);
    
  }
}
</style>