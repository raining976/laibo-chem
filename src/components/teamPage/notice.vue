//createDate:2022-08-05
<template>
  <div class="noticeBox">
    <div class="titleBox">
      <div class="title">{{ $t("team.message") }}</div>
      <!-- <div class="btn" @click="allRead()">{{ $t("team.read") }}</div> -->
    </div>
    <ul class="noticeList">
      <li class="eachNotice" v-for="(notice, index) in notices" :key="index">
        <div class="infoBox">
          <div class="userBox">
            <el-badge :is-dot="notice.isDot"
              ><i class="el-icon-user user"></i
            ></el-badge>
          </div>
          <div class="infoContent">
            <span>{{ notice.name }}{{ " " + $t("base.user") }}</span>
            <!-- <span>{{ notice.content }}</span> -->
            <span class="time">{{ notice.applicationTime }}</span>
          </div>
        </div>
        <div class="btnBox">
          <div class="btn ignore" @click="handleApplication(0, index)">
            {{ $t("team.refuse") }}
          </div>
          <div class="btn agree" @click="handleApplication(1, index)">
            {{ $t("team.agree") }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "notice",
  data() {
    return {
      curIndex: -1, // 当前选中的索引
      notices: [],
    };
  },
  mounted() {
    this.getNotice();
  },
  methods: {
    // 处理申请加入团队
    handleApplication(flag, idx) {
      if (flag == 0) {
        this.warningTip(idx);
      } else {
        this.handleFun(flag, idx);
      }
    },
    handleFun(flag, idx) {
      this.$http
        .post("/teamApplication", {
          id: this.notices[idx].id,
          status: String(flag), // num格式 string测试用
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: this.$t('callback.success'),
              type: "success",
            });
            // if(flag == 1){
            //  调用更新成员列表的函数
            // }
            this.getNotice();
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
    // 确认提示
    warningTip(index) {
      this.$confirm(this.$t('callback.refuseWarn'), this.$t('base.tip'), {
        confirmButtonText: this.$t('base.sure'),
        cancelButtonText: this.$t('base.cancel'),
        type: "warning",
      })
        .then(() => {
          this.handleFun(0, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t('base.canceled'),
          });
        });
    },
    // 管理员界面获取申请加入团队的通知
    getNotice() {
      this.$http
        .get("/team")
        .then((res) => {
          if (res.data.code == 20000) {
            if (res.data.data.acceptList) {
              this.notices = res.data.data.acceptList;
              this.$parent.noticeLength = res.data.data.acceptList.length;
            } else this.notices = [];
          } else {
            console.log("res.data.msg", res.data.msg);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>
<style scoped>
.noticeBox {
  position: absolute;
  right: -1.56vw;
  bottom: -32.81vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: calc(26.04vw - 1.77vw);
  height: calc(31.77vw - 2.08vw);
  padding: 1.04vw 0.89vw;
  background: #ffffff;
  box-shadow: 0px 0.52vw 1.09vw 0px rgba(7, 2, 3, 0.2);
  border-radius: 0.52vw;
  transition: all 0.3s;
  z-index: 999;
}
.titleBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.56vw;
  border-bottom: 0.1vw solid #eaeaec;
  margin-bottom: 1.04vw;
}
.titleBox .title {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #333333;
}
.titleBox .btn {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: var(--color);
  cursor: pointer;
}
.noticeList {
  height: calc(4.79vw * 5 + 2.08vw);
  overflow: auto;
  overflow-y: auto;
}
.noticeList::-webkit-scrollbar {
  width: 0.36vw;
}
/* 设置滚动条里面的滑块样式 */
.noticeList::-webkit-scrollbar-thumb {
  border-radius: 0.1vw;
  background-color: #dfdfe1;
}
.eachNotice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 24.22vw;
  height: 4.79vw;
  background: #f7f7f7;
  border: 0.05vw solid #ffffff;
  border-radius: 0.52vw;
  margin-bottom: 0.52vw;
  margin-right: 0.26vw;
}
.infoBox {
  display: flex;
  align-items: center;
}
.infoContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1.56vw;
}
.infoContent span {
  margin: 0.1vw 0;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333;
}
.infoContent .time {
  color: #999999;
}
.btnBox {
  display: flex;
}
.btnBox > .btn {
  margin-right: 1.56vw;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  cursor: pointer;
}
.btnBox .ignore {
  color: #999999;
}
.btnBox .agree {
  color: var(--color);
}
.noticeBox >>> .user {
  transform: scale(3);
  background: #e3f5ff;
  margin-left: 1.56vw;
  border-radius: 0.26vw;
}
.noticeBox >>> .el-badge__content.is-fixed.is-dot {
  right: -0.26vw;
  top: -0.26vw;
}
</style>