//createDate:2022-07-29
<template>
  <div class="blank">
    <div class="imgBox">
      <img src="../../assets/teamBlank.webp" alt="" />
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
  font-size: 2.5vw;
  /* font-family: YOUSHEhaoshenti; */
  font-weight: 400;
  color: #2a94f4;
  margin-top: 0.52vw;
}
.btnBox {
  display: flex;
  width: calc(24.38vw + 4.01vw);
  justify-content: space-between;
  margin-top: 5.21vw;
}
.btn {
  display: inline-block;
  width: 12.19vw;
  height: 2.55vw;
  background: #2a94f4;
  border-radius: 0.26vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  text-align: center;
  line-height: 2.55vw;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s;
}
.btn:hover {
  background: var(--color);
}
</style>