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
      <div class="searchBtn" @click="searchTeammate()">
        {{ $t("base.query") }}
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
        <li
          class="eachLi"
          v-for="(item, index) in memberList.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )"
          :key="index"
        >
          <span class="name">{{ item.name }}</span>
          <span class="email">{{ item.email }}</span>
          <span class="phone">{{ item.phone }}</span>
          <span class="privilege">{{ item.privilegeText }}</span>
          <!-- <span class="operation">{{ $t("base.dele") }}</span> -->
          <span class="operation">
            <a-dropdown trigger="hover">
              <a-button :disabled="item.privilege == 1 || !isAdmin">处理</a-button>
              <template #content>
                <a-doption
                  :disabled="item.privilege == 1"
                  @click="setAdmin(index)"
                  >设为为管理员</a-doption
                >
                <a-doption>降为普通成员</a-doption>
                <a-doption>删除成员</a-doption>
              </template>
            </a-dropdown></span
          >
        </li>
      </ul>
      <div class="layPage">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="memberList.length"
          :page-size="pageSize"
          :current-page="currentPage"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "searchMember",
  data() {
    return {
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页条数
      memberList: [],
      keywords: "", // 搜索成员关键字
    };
  },
  mounted() {
    this.getTeamMember();
  },
  methods: {
    // 页面给改变时
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },

    // 获取团队成员
    getTeamMember() {
      this.$http
        .get("/team")
        .then((res) => {
          if (res.data.code == 20000) {
            this.memberList = this.handlePrivilege(res.data.data.memberList);
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
    searchTeammate() {
      if (this.keywords != "") {
        this.$http
          .post("/searchTeammate", {
            name: this.keywords,
            phone: "",
          })
          .then((res) => {
            if (res.data.code == 20000) {
              let message;
              if (!res.data.data) {
                message = ",空空如也~";
                this.memberList = [];
              } else {
                this.memberList = this.handlePrivilege(
                  res.data.data.memberList
                );
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
      }
    },

    // 将数字或bool转化成文字
    handlePrivilege(array) {
      array.forEach((item) => {
        if (item.privilege) {
          item.privilegeText = "管理员";
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
  width: 550px;
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
  height: 630px;
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