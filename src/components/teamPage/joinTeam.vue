//createDate:2022-07-29
<template>
  <div class="joinTeam">
    <div class="backBtn">
      <router-link to="/teamBlank">{{ $t("base.back") }}</router-link>
    </div>
    <div class="searchBox">
      <div class="tag">{{ $t("team.name") }}</div>
      <div class="inputBox">
        <input
          type="text"
          :placeholder="$t('form.enter') + $t('team.name')"
          v-model="keywords"
          @keydown.enter="searchTeam()"
        />
      </div>
      <div class="btn" @click="searchTeam()">{{ $t("base.query") }}</div>
    </div>
    <div class="searchListBox">
      <h3 class="listTitle">{{ $t("base.query") + " " + $t("base.list") }}</h3>
      <ul class="searchList">
        <li class="listHead eachLi">
          <span>{{ $t("team.name") }}</span>
          <span>{{ $t("team.admin") }}</span>
          <span>{{ $t("base.phone") }}</span>
          <span>{{ $t("base.email") }}</span>
          <span>{{ $t("base.action") }}</span>
        </li>
        <li class="eachLi" v-for="(item, index) in searchList" :key="index">
          <span>{{ item.name }}</span>
          <span>{{ item.admin }}</span>
          <span>{{ item.phone }}</span>
          <span>{{ item.email }}</span>
          <span>
            <a class="joinBtn" @click="joinTeam(index)">{{
              $t("team.apply")
            }}</a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "joinTeam",
  data() {
    return {
      keywords: "", // 搜索关键字
      searchList: [], // 查询团队结果列表
    };
  },
  methods: {
    searchTeam() {
      if (this.keywords != "") {
        this.$http
          .post("/searchTeam", {
            team_name: this.keywords,
          })
          .then((res) => {
            if (res.data.code == 20000) {
              if (res.data.data) {
                this.$message({
                  message: "查询成功",
                  type: "success",
                });
              } else {
                this.$message("空空如也~");
              }
              this.searchList = res.data.data;
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$message({
              message: "未知错误",
              type: "error",
            });
            console.log("err", err);
          });
      }
    },
    // 加入团队
    joinTeam(idx) {
      this.$http
        .post("/joinTeam", {
          team_id: this.searchList[idx].id,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: "申请成功!请等待管理员同意",
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "未知错误",
            type: "error",
          });
        });
    },
  },
};
</script>
<style scoped>
.backBtn {
  margin-bottom: 40px;
}
.backBtn a {
  font-size: 18px;
  color: var(--color);
}
.searchBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid #eaeaec;
  padding-bottom: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
}
.tag {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.inputBox {
  margin: 0 80px 0 30px;
}
input {
  width: 259px;
  height: 43px;
  border: 2px solid #999999;
  border-radius: 5px;
  padding-left: 20px;
  transition: 00.3s;
}
input:hover,
input:focus {
  border-color: var(--color);
}
.btn {
  width: 98px;
  height: 41px;
  background: var(--color);
  border-radius: 5px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  line-height: 41px;
  text-align: center;
  cursor: pointer;
}
.listTitle {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin-bottom: 30px;
}
.searchList {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.eachLi {
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
  padding-left: 10px;
}
.eachLi span {
  display: inline-block;
  flex: 1;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
  margin: 0 10px;
}
.listHead {
  background: #eaebed;
  border-radius: 5px;
}
.listHead span {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.eachLi .joinBtn {
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
  cursor: pointer;
  transition: all 0.3s;
}
.eachLi .joinBtn:hover {
  font-weight: 600;
}
</style>