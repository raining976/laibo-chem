//购物车（支付部分）
<template>
  <div class="payment">
    <div class="amount">
      <div class="pageTitle">收货地址</div>
      <div class="addressBox">
        <ul class="addressList">
          <li
            class="eachAddress"
            v-for="(address, index) in addresses"
            :key="index"
          >
            <p class="name">收件人&nbsp;:&nbsp;{{ address.name }}</p>
            <p class="phone">电话号码&nbsp;:&nbsp;{{ address.phone }}</p>
            <p class="address">收货地址&nbsp;:&nbsp;{{ address.address }}</p>
            <div class="btnBox">
              <div class="deleBtn">删除地址</div>
              <div class="editBtn" @click="editAddress()">修改地址</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 以下为支付方式 -->
    <div class="payType">
      <div class="typeTitle">支付类型</div>
      <div class="typeBox">
        <div class="type">
          <div class="typeSign"><img src="../../assets/" alt="" /></div>
          <div class="typeName">微信支付</div>
        </div>
        <div class="type">
          <div class="typeSign"><img src="../../assets/" alt="" /></div>
          <div class="typeName">支付宝支付</div>
        </div>
        <div class="type">
          <div class="typeSign"><img src="../../assets/" alt="" /></div>
          <div class="typeName">上传单联（个人）</div>
        </div>
        <div class="type">
          <div class="typeSign"><img src="../../assets/" alt="" /></div>
          <div class="typeName">上传单据（公司）</div>
        </div>
      </div>
    </div>
    <!-- 以下为底部 -->
    <div class="footer">
        <div class="allMoney">
        最终合计&nbsp;&nbsp;
        <div>999{{ all }}</div>
      </div>
      <div class="pay" @click="toPay()">结算</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "myOrder",
  components: "",
  data() {
    return {};
  },
};
</script>
<style scoped>
.title {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 30px;
  margin-right: 50px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eaeaec;
}
/* 以下为底部 */
.footer {
  width: 95%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #FFFFFF;
border: 1px solid #EAEAEC;
border-radius: 10px
}
.allMoney {
  display: flex;
  align-items: center;
  width: 310px;
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  margin: 0 0 0 42px;
}
.allMoney div {
  font-size: 26px;
  color: #ff4747;
}
.pay {
  cursor: pointer;
padding: 0 23px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  margin: 0 24px 0 26px;
  color: #004ea2;
  background-color: #e0f3fe;
  border-radius: 26px;
}
.toPay:hover {
  color: #fff;
  background-color: #004ea2;
}
</style>
