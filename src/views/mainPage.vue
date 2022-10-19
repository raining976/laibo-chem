<template>
  <div>
    <imgInfo />
    <productsType />
    <hotProduct />
    <companyProfile />
    <newsCenter />
    <appFooter />
  </div>
</template>
<script>
import appFooter from "../components/main/appFooter.vue";
import imgInfo from "../components/mainPage/imgInfo.vue";
import productsType from "../components/mainPage/productsType.vue";
import hotProduct from "../components/mainPage/hotProduct.vue";
import companyProfile from "../components/mainPage/companyProfile.vue";
import newsCenter from "../components/mainPage/newsCenter.vue";

export default {
  name: "",
  components: {
    imgInfo,
    productsType,
    hotProduct,
    companyProfile,
    newsCenter,
    appFooter
  },
  data() {
    return {};
  },
  mounted() {
    //
    window.scrollTo(0, 0);
  },
};
</script>
<style scoped>
</style>