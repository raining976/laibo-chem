<template>
    <div class="orderSuccess">
        <div class="completedPic"><img src="../../assets/dingdan.png" alt=""></div>
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
    height: 578px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.completedWord {
  /* width: 745px; */
  text-align: center;
height: 25px;
font-size: 24px;
font-family: Microsoft YaHei UI;
font-weight: 400;
color: #2A94F4;
line-height: 25px;
margin: 26px 0 40px;
}
.btnBox {
width: 45%;
height: 50px;
display: flex;
justify-content: space-between;
align-items: center;
}
.btnStyle {
width: 234px;
height: 50px;
background: #2A94F4;
border-radius: 5px;
font-size: 24px;
font-family: Microsoft YaHei UI;
font-weight: 400;
color: #FFFFFF;
line-height: 50px;
text-align: center;
cursor: pointer;
}
</style>