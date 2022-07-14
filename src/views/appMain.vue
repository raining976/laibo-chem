<template>
  <appNav />
  <search />
  <appFooter />
</template>

<script>
import appNav from "../components/main/appNav.vue";
import appFooter from "../components/main/appFooter.vue";
import search from "../components/main/search.vue";
export default {
  name: "appMain",
  components: {
    appNav,
    appFooter,
    search,
  },
};
</script>

<style>
</style>