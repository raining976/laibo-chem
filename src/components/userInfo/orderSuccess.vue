<template>
  <div class="orderSuccess">
    <div class="completedPic">
      <img src="../../assets/dingdan.webp" alt="" />
    </div>
    <div class="completedWord">{{ $t("order.successTip") + orderId }}</div>
    <div class="btnBox">
      <div class="toCart btnStyle" @click="toCart()">
        {{ $t("order.back") + " " + $t("userMenu.cart") }}
      </div>
      <div class="toOrder btnStyle" @click="toOrderInfo(orderId)">
        {{ $t("order.checkOrder") }}
      </div>
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
      });
    },
    toOrderInfo(id) {
      this.$router.push({
        path: "/orderInfo/" + id,
      });
    },
  },
};
</script>
<style scoped>
.orderSuccess {
  width: 100%;
  /* height: 30.1vw; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.completedPic {
  width: 23.8vw;
  height: 19.9vw;
}
.completedPic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.completedWord {
  /* width: 745px; */
  text-align: center;
  height: 1.3vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #2a94f4;
  line-height: 1.3vw;
  margin: 1.35vw 0 2.08vw;
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
  background: #2a94f4;
  border-radius: 0.26vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  line-height: 2.6vw;
  text-align: center;
  cursor: pointer;
}
</style>