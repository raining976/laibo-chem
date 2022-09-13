<template>
    <div class="payCompleted">
        <div class="completedPic"><img src="../../assets/dingdan.png" alt=""></div>
        <div class="completedWord">您的订单已经成功支付，订单交易号：{{orderId}}</div>
        <div class="btnBox">
            <div class="toCart" @click="toCart()">返回购物车</div>
            <div class="toOrder" @click="toOrder()">查看订单</div>
        </div>
    </div>

</template>
<script>
export default {
  name: "payCompleted",
  components: "",
  data() {
    return {
      orderId: 1111,
    };
  },
  created: {

  },
  methods: {
     getPayCompleted() {
        
     },
     toCart() {

     },
     toOrder() {

     },

  },
};
</script>
<style scoped>
.payCompleted {
    width: 1120px;
    height: 578px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>