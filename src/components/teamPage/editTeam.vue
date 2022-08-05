//createDate:2022-08-05
<template>
  <div class="editTeam">
    <create-team />
  </div>
</template>
<script>
import createTeam from "./createTeam.vue";
export default {
  name: "editTeam",
  components: {
    createTeam,
  },
};
</script>
<style scoped>
</style>