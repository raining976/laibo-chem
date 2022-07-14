<template>
  <appNav />
  <search />
  <appFooter />
  <copyright />
</template>

<script>
import appNav from "../components/main/appNav.vue";
import appFooter from "../components/main/appFooter.vue";
import search from "../components/main/search.vue";
import copyright from "../components/main/copyright.vue";

export default {
  name: "appMain",
  components: {
    appNav,
    appFooter,
    search,
    copyright,
  },
};
</script>

<style>
</style>