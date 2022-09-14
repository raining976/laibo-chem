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
          <span class="operation">{{ $t("base.action") }}</span>
        </li>
        <li class="eachLi" v-for="(item, index) in memberList" :key="index">
          <span class="name">{{ item.name }}</span>
          <span class="email">{{ item.email }}</span>
          <span class="phone">{{ item.phone }}</span>
          <span class="privilege">{{ item.privilegeText }}</span>
          <!-- <span class="operation">{{ $t("base.dele") }}</span> -->
          <span class="operation">
            <el-dropdown>
              <el-button :disabled="item.privilege == 2"> 处理 </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :disabled="item.privilege == 1"
                    @click="setAdminOpen(index)"
                    >提拔为管理员</el-dropdown-item
                  >
                  <el-dropdown-item
                    :disabled="item.privilege == 0"
                    @click="delAdminOpen(index)"
                    >降为普通成员</el-dropdown-item
                  >
                  <el-dropdown-item
                    divided
                    style="color: #bf0300"
                    @click="delOpen(index)"
                    >删除该成员</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
    };
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
            size: 6,
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
                size: "6",
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
    handlePrivilege(array) {
      if (array.length == 1) {
        array.privilegeText = "成员";
        if (array.privilege == 1) array.privilegeText = "管理员";
        return array;
      }
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
            this.$parent.refreshKey++; // 刷新
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
            this.$parent.refreshKey++;
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
  },
};
</script>
<style>
</style>
<style scoped>
.searchBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  padding-top: 30px;
  padding-bottom: 50px;
  margin-right: 50px;
  border-bottom: 2px solid #eaeaec;
}
.tag {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
input {
  width: 260px;
  height: 43px;
  border: 2px solid #999999;
  border-radius: 5px;
  padding-left: 20px;
}
.searchBtn {
  width: 98px;
  height: 41px;
  background: var(--color);
  border-radius: 5px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 41px;
  cursor: pointer;
}
.listTitle {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin: 40px 0 30px 0;
}
.memberList {
  min-height: 530px;
}
.eachLi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  border-radius: 5px;
  border-bottom: 1px solid #eaeaec;
  padding-left: 30px;
}
.eachLi span {
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.listHead {
  background: #eaebed;
  border: 0;
}
.listHead span {
  font-size: 18px;
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
  flex: 0.5;
}

.eachLi .operation {
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: var(--color);
  cursor: pointer;
}
.listHead .operation {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #333333;
  cursor: initial;
}
.searchMember .layPage {
  display: flex;
  justify-content: center;
}
.layPage {
  margin-top: 30px;
}
.layPage >>> .el-pagination {
  transform: scale(1.3);
}
.layPage >>> .el-pagination > button,
.layPage >>> .el-pagination .number {
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: 2px;
}
.layPage >>> .el-pagination .el-icon {
  margin: 0 auto;
}
.layPage >>> .el-pagination.is-background .el-pager li:not(.disabled).active,
.layPage >>> .el-pagination .el-pager .active {
  background-color: var(--color);
}
</style>