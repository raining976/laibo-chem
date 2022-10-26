<template>
    <div class="orderSuccess">
        <div class="completedPic"><img src="../../assets/dingdan.webp" alt=""></div>
        <div class="completedWord">您的订单已经成功支付，订单交易号：{{orderId}}</div>
        <div class="btnBox">
            <div class="toCart btnStyle" @click="toCart()">返回购物车</div>
            <div class="toOrder btnStyle" @click="toOrder()">查看订单</div>
        </div>
    </div>

</template>
<script>
export default {
  name: "orderSuccess",
  components: "",
  data() {
    return {
      orderId: 1111,
    };
  },
  created() {
      this.orderId = this.$route.params.id;
  },
  methods: {
     toCart() {
      this.$router.push({
        path: "/cart",
      })
     },
     toOrder() {
         this.$router.push({
          path: "/order",
         })
     },

  },
};
</script>
<style scoped>
.orderSuccess {
    width: 100%;
    height: 30.1vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.completedWord {
  /* width: 745px; */
  text-align: center;
height: 1.3vw;
font-size: 1.25vw;
font-family: Microsoft YaHei UI;
font-weight: 400;
color: #2A94F4;
line-height: 1.3vw;
margin: 26px 0 2.08vw;
}
.btnBox {
width: 45%;
height: 2.6vw;
display: flex;
justify-content: space-between;
align-items: center;
}
.btnStyle {
width: 12.19vw;
height: 2.6vw;
background: #2A94F4;
border-radius: 0.26vw;
font-size: 1.25vw;
font-family: Microsoft YaHei UI;
font-weight: 400;
color: #FFFFFF;
line-height: 2.6vw;
text-align: center;
cursor: pointer;
}
</style>