// 购物车
//createDate:2022-07-17
<template>
<div>
  <div class="top">
 <div class="shopCart">购物车（共{{count}}件）</div>
 <div class="deleteBtn" @click="func()">删除</div>
</div>
 
  <div class="solidLine"></div>
<!-- 以下是购物车信息 -->
  <div class="shopCart">
    <div class="listHead">
      <div class="quanxuan">
        <div class="checked"></div>
        <div class="word">全选</div>
      </div>
      <div class="_productInfo">产品信息</div>
      <div class="_size">规格</div>
      <div class="_price">单价</div>
      <div class="_count">数量</div>
      <div class="_allMoney">总金额</div>
    </div>
    <div class="allCommodity">
      <!-- 以下v-for一个商品 -->
      <div class="commodity" v-for="(item0,index) in commodityList" :key="index">
        <div class="radio"></div>
        <!--  -->
        <div class="productInfo">
          <div class="productPic">
        <img src="" alt="">
          </div>
          <div class="infoBox">
            <div class="name_zh">{{item0.name}}</div>
            <div class="infoWord">货号：{{item0.huohao}}</div>
            <div class="infoWord">CAS编号：{{item0.casCode}}</div>
          </div>
        </div>
        <div class="size">{{item0.size}}</div>
        <div class="price">{{item0.price}}</div>
        <div class="count">
          <div class="" @click="func()">-</div>
          <div class="">1{{}}</div>
          <div class="" @click="func()">+</div>
        </div>
        <!-- 关于金额的计算方式 -->
        <div class="allMoney">{{item0.allMoney}}</div>
      </div>
    </div>
  </div>
</div>

  
</template>
<script>
export default {
  name: "shopCart",
  components:{

  },
  data() {
     return {
      allProducts: 0,
 commodityList:[
  {
    name: "1",huohao: "2", shopCart_id: 3, guige: "%", price: 5, payment:666,
  }
 ]
     };
  },
};
</script>
<style scoped>
.top {}
.shopCart {}
.deleteBtn {}
.solidLine {}
/* ---以下为购物车样式 */
</style>