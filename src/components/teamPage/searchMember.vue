//createDate:2022-07-31
<template>
  <div class="searchMember">
    <div class="searchBox">
      <div class="tag">{{ $t("team.member") + " :" }}</div>
      <div class="inputBox">
        <input
          type="text"
          :placeholder="$t('base.enter') + $t('team.member')"
          v-model="keywords"
          @keydown.enter="searchTeammate()"
        />
      </div>
      <div class="searchBtn btn" @click="searchTeammate()">
        {{ $t("base.query") }}
      </div>
      <div class="searchBtn btn" @click="checkAll()">
        {{ $t("team.checkAll") }}
      </div>
    </div>
    <div class="listBox">
      <h3 class="listTitle">{{ $t("team.teamMember") }}</h3>
      <ul class="memberList">
        <li class="listHead eachLi">
          <span class="name">{{ $t("base.name") }}</span>
          <span class="email">{{ $t("base.email") }}</span>
          <span class="phone">{{ $t("base.phone") }}</span>
          <span class="privilege">{{ $t("team.privilege") }}</span>
          <span class="operation" v-if="myPrivilege == 1 || myPrivilege == 2">{{
            $t("base.action")
          }}</span>
        </li>
        <li
          class="eachLi listContent"
          v-for="(item, index) in memberList"
          :key="index"
        >
          <span class="name">{{ item.name }}</span>
          <span class="email">{{ item.email }}</span>
          <span class="phone">{{ item.phone }}</span>
          <span class="privilege">{{ item.privilegeText }}</span>
          <span class="operation">
            <div
              class="btnBox"
              v-if="
                (myEmail != item.email && myPrivilege == 1) ||
                (myPrivilege == 2 && myEmail != item.email) ||
                (myPrivilege == 0 && myEmail != item.email)
              "
            >
              <i class="blank" v-if="item.privilege == 2"></i>
              <img
                src="../../assets/adminPlus.png"
                class="handleBtn"
                @click="setAdminOpen(index)"
                v-if="item.privilege == 0"
              />
              <img
                src="../../assets/adminMinus.png"
                class="handleBtn"
                @click="delAdminOpen(index)"
                v-if="item.privilege == 1"
                alt=""
              />
              <i
                class="el-icon-delete delMember"
                style="color: #bf0300; cursor: pointer"
                v-if="
                  item.privilege != 2 &&
                  (item.privilege == 1 || item.privilege == 0)
                "
                v-show="myPrivilege == 1 || myPrivilege == 2"
                @click="delOpen(index)"
              ></i>
            </div>
          </span>
        </li>
      </ul>
      <div class="layPage">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="totalPages"
          :current-page="currentPage"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { h } from "vue";
export default {
  name: "searchMember",
  data() {
    return {
      totalPages: 1, // 总页码数
      currentPage: 1, // 当前页数
      memberList: [],
      keywords: "", // 搜索成员关键字
      isSearch: false, // 是否为搜索成员
      myPrivilege: 0, // 我的权限
      myEmail: "", // 我的邮箱
    };
  },
  created() {
    this.myPrivilege = localStorage.getItem("privilege");
    this.myEmail = localStorage.getItem("myEmail");
  },
  mounted() {
    let flag = this.$route.params.flag;
    if (flag == 1) {
      let _that = this;
      _that.$emit("update");
    }
    this.getTeamMember(1);
  },
  methods: {
    // 页码给改变时,val是改变后的页码
    handleCurrentChange(val) {
      // 判断是搜索还是默认团队列表
      if (this.isSearch) {
        this.searchTeammate(val);
      } else this.getTeamMember(val);
    },
    checkAll() {
      if (this.isSearch) {
        this.getTeamMember();
        this.keywords = "";
      }
    },
    // 获取团队成员
    getTeamMember(page) {
      this.isSearch = false;
      this.$http
        .get("/team", {
          params: {
            page: page,
            size: 9,
          },
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.memberList = this.handlePrivilege(res.data.data.memberList);
            this.totalPages = res.data.data.totalPages;
            this.currentPage = res.data.data.pageNum;
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
    // 搜索团队成员
    searchTeammate(page) {
      if (this.keywords != "") {
        this.isSearch = true;
        this.$http
          .post(
            "/searchTeammate",
            {
              name: this.keywords,
              phone: "",
            },
            {
              params: {
                page: page,
                size: 9,
              },
            }
          )
          .then((res) => {
            if (res.data.code == 20000) {
              let message;
              if (!res.data.data.memberList.length) {
                message = ",空空如也~";
                this.memberList = [];
              } else {
                this.memberList = this.handlePrivilege(
                  res.data.data.memberList
                );
                this.totalPages = res.data.data.totalPages;
                this.currentPage = res.data.data.pageNum;
                message = "";
              }
              this.$message({
                message: "查询成功" + message,
                type: "success",
              });
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
      } else {
        this.$message("请输入查询关键词哦~");
      }
    },

    // 将数字或bool转化成文字
    // 可以兼容数组为一的情况
    handlePrivilege(array) {
      if (!array) return; // 数组为空时
      array.forEach((item) => {
        if (item.privilege == 1) {
          item.privilegeText = "管理员";
        } else if (item.privilege == 2) {
          item.privilegeText = "团队拥有者";
        } else item.privilegeText = "成员";
      });
      return array;
    },

    // 提拔管理员
    setAdmin(idx) {
      this.$http
        .post("/teamAdmin", {
          id: this.memberList[idx].id,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: "成功设置为管理员!",
              type: "success",
            });
            this.refreshFun(this.currentPage);
            this.setAdminNotice(idx);
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
    // 设置管理员通知
    setAdminNotice(idx) {
      this.$notify({
        title: "通知",
        message: h("i", this.memberList[idx].name + "已成为管理员"),
      });
    },
    // 设置管理员提示
    setAdminOpen(idx) {
      this.$confirm(
        "是否确定将" + this.memberList[idx].name + "设置为管理员",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "msgBox", // 自定义一个class名
        }
      )
        .then(() => {
          this.setAdmin(idx);
        })
        .catch((err) => {
          console.log("err", err);
          this.$message({
            type: "info",
            message: "已取消设置",
          });
        });
    },
    // 薅掉管理员
    delAdmin(idx) {
      this.$http
        .post("/delTeamAdmin", {
          id: this.memberList[idx].id,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: "降级成功!",
              type: "success",
            });
            this.refreshFun(this.currentPage);
            this.delAdminNotice(idx);
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
    // 薅掉管理员提示
    delAdminOpen(idx) {
      this.$confirm(
        "此操作会将" + this.memberList[idx].name + "降级为普通成员, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "msgBox", // 自定义一个class名
        }
      )
        .then(() => {
          this.delAdmin(idx);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消降级",
          });
        });
    },
    // 薅掉管理员通知
    delAdminNotice(idx) {
      this.$notify({
        title: "通知",
        message: h("i", "您已将" + this.memberList[idx].name + "降为普通成员"),
      });
    },
    // 删除团队成员
    delMember(idx) {
      console.log("this.memberList[idx].id", this.memberList[idx].id);
      this.$http
        .post("/delTeammate", {
          id: this.memberList[idx].id,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: "删除成功!",
              type: "success",
            });
            this.refreshFun(this.currentPage);
            this.delMemberNotice(idx);
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.err("err", err);
          this.$message({
            message: "未知错误!",
            type: "error",
          });
        });
    },
    // 删除成员的提醒
    delMemberNotice(idx) {
      this.$notify({
        title: "通知",
        message: h("i", "您已将" + this.memberList[idx].name + "删除"),
      });
    },
    delOpen(idx) {
      this.$confirm(
        "此操作将永久删除成员" + this.memberList[idx].name + ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.delMember(idx);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    refreshFun(curPage) {
      if (this.isSearch) {
        this.searchTeammate(curPage);
      } else this.getTeamMember(curPage);
    },
  },
};
</script>
<style>
.searchMember .delMember {
  transform: scale(2);
  transform-origin: center;
}
.searchMember .el-button:focus,
.el-button:hover {
  color: var(--color);
  font-weight: 600;
}
</style>
<style scoped>
.searchBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* width: 700px; */
  padding-top: 1.56vw;
  padding-bottom: 2.6vw;
  margin-right: 2.6vw;
  border-bottom: 0.1vw solid #eaeaec;
}
.searchBox > div {
  margin-left: 1.04vw;
}
.tag {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
input {
  width: 13.54vw;
  height: 2.24vw;
  border: 0.1vw solid #999999;
  border-radius: 0.26vw;
  padding-left: 1.04vw;
}
.searchBtn {
  width: 5.1vw;
  height: 2.14vw;
  background: var(--color);
  border-radius: 0.26vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 2.14vw;
  cursor: pointer;
}
.listTitle {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin: 2.08vw 0 1.56vw 0;
}
.memberList {
  min-height: 27.6vw;
}
.eachLi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.86vw;
  border-radius: 0.26vw;
  border-bottom: 0.05vw solid #eaeaec;
  padding-left: 1.56vw;
  transition: 0.3s;
}
.eachLi.listContent:hover {
  background: #f6f7f7;
}
.eachLi span {
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.listHead {
  background: #eaebed;
  border: 0;
}
.listHead span {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #333333;
}
.eachLi span {
  flex: 1;
}
.eachLi .name,
.eachLi .privilege,
.eachLi .operation {
  flex: 0.8;
}

.eachLi .operation {
  display: flex;
  align-items: center;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
}
.listHead .operation {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #333333;
  cursor: initial;
  text-align: center;
}
.eachLi .operation .handleBtn {
  width: 1.67vw;
  height: 1.67vw;
  cursor: pointer;
  margin-right: 0.78vw;
}
.blank {
  display: inline-block;
  width: 6.56vw;
  margin-right: 0.78vw;
}
.searchMember .layPage {
  display: flex;
  justify-content: center;
}
.layPage {
  margin-top: 1.56vw;
}
.layPage >>> .el-pagination {
  transform: scale(1.3);
}
.layPage >>> .el-pagination > button,
.layPage >>> .el-pagination .number {
  background: #ffffff;
  border: 0.05vw solid #999999;
  border-radius: 0.1vw;
}
.layPage >>> .el-pagination .el-icon {
  margin: 0 auto;
}
.layPage >>> .el-pagination.is-background .el-pager li:not(.disabled).active,
.layPage >>> .el-pagination .el-pager .active {
  background-color: var(--color);
}
</style>