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
  data(){
    return{
      isEdit:true,
    }
  },
  created(){
    
    // console.log('this.$route.query',this.$route.query.isEdit)
  }
};
</script>
<style scoped>
</style>