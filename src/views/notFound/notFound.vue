
//createDate:2022-11-01
<template>
  <div class="notFound">
    <router-link to="/mainPage" class="back">返回主页</router-link>
    <img src="../../assets/404.png" alt="" />
  </div>
</template>
<script>
export default {
  name: "notFound",
  mounted() {
    console.log("404");
  },
};
</script>
<style scoped>
.notFound{
  width: 100%;
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.back {
  font-size: 24px;
}
</style>