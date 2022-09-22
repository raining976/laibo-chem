//createDate:2022-07-29
<template>
  <div class="blank">
    <div class="imgBox">
      <img src="../../assets/teamBlank.png" alt="" />
      <h3 class="imgTitle">{{ $t("team.noTeam") }}</h3>
    </div>
    <div class="btnBox">
      <span class="btn" @click="joinTeam()">{{
        $t("team.join") + $t("base.team")
      }}</span>
      <span class="btn" @click="createTeam()">{{
        $t("team.create") + $t("base.team")
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "blank",
  methods: {
    // 加入团队
    joinTeam() {
      this.$router.push("/joinTeam");
    },
    // 创建团队
    createTeam() {
      this.$router.push({
        name: "createTeam",
        params: {
          createFlag:true,
        },
      });
    },
  },
};
</script>
<style scoped>
.blank {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.imgBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.imgTitle {
  font-size: 48px;
  /* font-family: YOUSHEhaoshenti; */
  font-weight: 400;
  color: #2a94f4;
  margin-top: 10px;
}
.btnBox {
  display: flex;
  width: calc(468px + 77px);
  justify-content: space-between;
  margin-top: 100px;
}
.btn {
  display: inline-block;
  width: 234px;
  height: 49px;
  background: #2a94f4;
  border-radius: 5px;
  font-size: 24px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  text-align: center;
  line-height: 49px;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s;
}
.btn:hover {
  background: var(--color);
}
</style>