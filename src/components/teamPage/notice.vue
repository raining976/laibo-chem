//createDate:2022-08-05
<template>
  <div class="noticeBox">
    <div class="titleBox">
      <div class="title">{{ $t("team.message") }}</div>
      <div class="btn" @click="allRead()">{{ $t("team.read") }}</div>
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
  props: {
    notices: Array,
  },
  data() {
    return {
      curIndex: -1, // 当前选中的索引
    };
  },
  methods: {
    allRead() {
      for (let i = 0; i < this.notices.length; i++) {
        this.notices[i].isDot = false;
      }
    },
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
              message: "处理成功",
              type: "success",
            });
            this.$parent.refreshKey++;
            this.$parent.noticeKey++;
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
            message: "未知错误!",
            type: "error",
          });
        });
    },
    // 确认提示
    warningTip(index) {
      this.$confirm("是否拒绝该成员的申请,该处理不可撤销", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleFun(0, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
};
</script>
<style scoped>
.noticeBox {
  position: absolute;
  right: -30px;
  bottom: -630px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: calc(500px - 34px);
  height: calc(610px - 40px);
  padding: 20px 17px;
  background: #ffffff;
  box-shadow: 0px 10px 21px 0px rgba(7, 2, 3, 0.2);
  border-radius: 10px;
  transition: all 0.3s;
}
.titleBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 2px solid #eaeaec;
  margin-bottom: 20px;
}
.titleBox .title {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #333333;
}
.titleBox .btn {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: var(--color);
  cursor: pointer;
}
.noticeList {
  height: calc(92px * 5 + 40px);
  overflow: auto;
  overflow-y: auto;
}
.noticeList::-webkit-scrollbar {
  width: 7px;
}
/* 设置滚动条里面的滑块样式 */
.noticeList::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: #dfdfe1;
}
.eachNotice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 465px;
  height: 92px;
  background: #f7f7f7;
  border: 1px solid #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-right: 5px;
}
.infoBox {
  display: flex;
  align-items: center;
}
.infoContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
}
.infoContent span {
  margin: 2px 0;
  font-size: 16px;
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
  margin-right: 30px;
  font-size: 16px;
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
  margin-left: 30px;
  border-radius: 5px;
}
.noticeBox >>> .el-badge__content.is-fixed.is-dot {
  right: -5px;
  top: -5px;
}
</style>