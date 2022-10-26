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
  margin-bottom: 2.08vw;
}
.backBtn a {
  font-size: 0.94vw;
  color: var(--color);
}
.searchBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 0.1vw solid #eaeaec;
  padding-bottom: 2.6vw;
  margin-right: 2.6vw;
  margin-bottom: 2.6vw;
}
.tag {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.inputBox {
  margin: 0 4.17vw 0 1.56vw;
}
input {
  width: 13.49vw;
  height: 2.24vw;
  border: 0.1vw solid #999999;
  border-radius: 0.26vw;
  padding-left: 1.04vw;
  transition: 00.3s;
}
input:hover,
input:focus {
  border-color: var(--color);
}
.btn {
  width: 5.1vw;
  height: 2.14vw;
  background: var(--color);
  border-radius: 0.26vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  line-height: 2.14vw;
  text-align: center;
  cursor: pointer;
}
.listTitle {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1.56vw;
}
.searchList {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.eachLi {
  height: 2.86vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 2.6vw;
  padding-left: 0.52vw;
}
.eachLi span {
  display: inline-block;
  flex: 1;
  align-items: center;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
  margin: 0 0.52vw;
}
.listHead {
  background: #eaebed;
  border-radius: 0.26vw;
}
.listHead span {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.eachLi .joinBtn {
  font-size: 0.83vw;
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