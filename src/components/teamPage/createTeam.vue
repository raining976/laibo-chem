//createDate:2022-07-29
<template>
  <div class="createTeam">
    <div class="backBtn"><router-link to="/teamBlank">返回上一级</router-link></div>
  </div>
</template>
<script>
export default {
  name: "createTeam",
};
</script>
<style scoped>
.backBtn a{
  font-size: 18px;
  color: var(--color);
}
</style>