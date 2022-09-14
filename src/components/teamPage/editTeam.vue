//createDate:2022-08-05
<template>
  <div class="editTeam">
    <create-team :isAdmin="isAdmin" />
  </div>
</template>
<script>
import createTeam from "./createTeam.vue";
export default {
  name: "editTeam",
  components: {
    createTeam,
  },
  data() {
    return {
      isAdmin: false,
      isEdit: true,
    };
  },
  beforeMount() {
    this.$http.get("/userInfo").then((res) => {
      if (res.data.code == 20000) {
        let _isAdmin = res.data.data.privilege;
        if (_isAdmin) {
          this.isAdmin = true;
        } else this.isAdmin = false;
      }
    });
  },
};
</script>
<style scoped>
</style>