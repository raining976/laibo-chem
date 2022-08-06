// 团队管理部分
//createDate:2022-07-17
<template>
  <div class="team">
    <div class="topBox">
      <h3 class="title">团队管理</h3>
      <div class="setBox">
        <el-tooltip
          content="编辑团队信息"
          placement="top"
          effect="light"
          popper-class="editTip"
        >
          <i class="el-icon-edit-outline edit set" @click="toEditTeam()"></i>
        </el-tooltip>
        <el-tooltip
          content="消息通知"
          placement="top"
          effect="light"
          popper-class="editTip"
        >
          <el-badge :value="100" :max="99">
            <i
              class="el-icon-bell notice set"
              @click="isNoticeShow = !isNoticeShow"
            ></i>
          </el-badge>
        </el-tooltip>
        <!-- 通知模态框 -->
        <notice v-show="isNoticeShow" ref="notice" />
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
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
      isNoticeShow: false,
    };
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
      this.$router.push("/editTeam");
    },
    closeNotice(e) {
      let notice = document.getElementsByClassName("noticeBox")[0]; // 目标元素
      if (!e.path.includes(notice)) {
        this.isNoticeShow = false;
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
  transform-origin: left;
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