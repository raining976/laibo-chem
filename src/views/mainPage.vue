<template>
<div>
<imgInfo />
  <productsType />
  <hotProduct />
  <companyProfile /> 
  <newsCenter />
</div>
  
</template>
<script>
import imgInfo from "../components/mainPage/imgInfo.vue";
import productsType from "../components/mainPage/productsType.vue";
import hotProduct from "../components/mainPage/hotProduct.vue";
import companyProfile from "../components/mainPage/companyProfile.vue";
import newsCenter from "../components/mainPage/newsCenter.vue";

export default {
   name: '',
   components: {
    imgInfo,
    productsType,
    hotProduct,
    companyProfile,
    newsCenter,
   },
   data () {
       return {

       }
   }
}
</script>
<style scoped>

</style>