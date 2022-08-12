//购物车（支付部分）
<template>
  <div class="paymentPage">
    <!-- 收获地址 -->
    <div class="amount">
      <div class="top">
        <div class="title">{{ $t("cart.settlement") }}</div>
        <div class="returnBtn" @click="toShopCart()">{{ $t("base.back") }}</div>
      </div>
      <div class="addressBox">
        <ul class="addressList">
          <!-- 以下v-for -->
          <li
            class="eachAddress"
            v-for="(address, index) in addresses"
            :key="index"
            :class="{ border: index == flag }"
            @click="chooseAddress(index)"
          >
            <p class="name">{{$t('address.name')}}&nbsp;:&nbsp;{{ address.name }}</p>
            <p class="phone">{{$t('base.phone')}}&nbsp;:&nbsp;{{ address.phone }}</p>
            <p class="address">{{$t('base.address')}}&nbsp;:&nbsp;{{ address.address }}</p>
            <div class="btnBox">
              <div class="deleBtn" @click="deleteAddress()">删除地址</div>
              <div class="editBtn" @click="editAddress()">修改地址</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="freight">
        {{ $t("cart.fright") + "：" }}<strong>{{ freight }}</strong>
      </div>
    </div>
    <!-- 商品统计 -->
    <div class="shopCart">
      <div class="listHead">
        <div class="_productInfo word">{{ $t("order.productInfo") }}</div>
        <div class="_size word">{{ $t("order.size") }}</div>
        <div class="_price word">{{ $t("order.price") }}</div>
        <div class="_count word">{{ $t("order.count") }}</div>
        <div class="_payment word">{{ $t("order.money") }}</div>
      </div>
      <div class="allCommodity">
        <!-- 以下v-for一个商品 -->
        <div
          class="commodity"
          v-for="(item0, index) in commodityList.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )"
          :key="index"
        >
          <div class="productInfo">
            <div class="productPic">
              <img src="" alt="" />
            </div>
            <div class="infoBox">
              <div class="name_zh" @click="toProductInfo()">
                {{ item0.name }}
              </div>
              <div class="infoWord">
                {{ $t("order.itemNo") + "：" }}{{ item0.huohao }}
              </div>
              <div class="infoWord">
                {{ $t("order.casNum") + "：" }}{{ item0.shopCart_id }}
              </div>
            </div>
          </div>
          <div class="size">{{ item0.guige }}</div>
          <div class="price">{{ item0.price }}</div>
          <div class="count">
            <div class="num">{{ item0.num }}</div>
          </div>
          <!-- 关于金额的计算方式 -->
          <div class="payment">{{ item0.num * item0.price }}</div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background="#004ea2"
          layout="prev,pager,next"
          :total="commodityList.length"
          :page-size="pagesize"
          :pager-count="pagerCount"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 以下为支付方式-------------->
    <div class="payType">
      <div class="typeTitle">{{ $t("cart.payType") }}</div>
      <div class="typeBox">
        <div
          class="type"
          :class="{ type_checked: wechar == true }"
          @click="payType('wechar')"
        >
          <div class="typeSign">
            <img src="../../assets/weixinzhifu.png" alt="" />
          </div>
          <div class="typeName">
            {{ $t("cart.weChat") +" "+ $t("cart.payment") }}
          </div>
        </div>
        <div
          class="type"
          :class="{ type_checked: zhifubao == true }"
          @click="payType('zhifubao')"
        >
          <div class="typeSign">
            <img src="../../assets/zhifubao.png" alt="" />
          </div>
          <div class="typeName">
            {{ $t("cart.paypal") + " " + $t("cart.payment") }}
          </div>
        </div>
        <div
          class="type"
          :class="{ type_checked: geren == true }"
          @click="payType('geren')"
        >
          <div class="typeSign">
            <img src="../../assets/gerenzhifu.png" alt="" />
          </div>
          <div class="typeName">{{ $t("cart.bills") + $t("cart.person") }}</div>
        </div>
        <div
          class="type"
          :class="{ type_checked: gongsi == true }"
          @click="payType('gongsi')"
        >
          <div class="typeSign">
            <img src="../../assets/gongsi.png" alt="" />
          </div>
          <div class="typeName">{{ $t("cart.bills") + $t("cart.firm") }}</div>
        </div>
      </div>
    </div>
    <!-- 以下为底部 -->
    <div class="footer">
      <div class="allMoney">
        {{ $t("cart.total") }}&nbsp;&nbsp;&nbsp;
        <div>{{ allmoney }}</div>
      </div>
      <div class="pay" @click="toPay()">{{ $t("cart.settlement") }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "myOrder",
  components: "",
  data() {
    return {
      pagesize: 2, // 每页显示多少条
      currentPage: 1, // 当前页数
      pagerCount: 5, //五个以上加省略号
      flag: 0, //用于地址框加边框
      wechar: false,
      zhifubao: false,
      geren: false,
      gongsi: false,
      freight: 120, //运费
      allmoney: 0, //总计
      addresses: [
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
      ],

      commodityList: [
        {
          name: "1",
          huohao: "2",
          shopCart_id: 3,
          guige: "95%",
          num: 2,
          price: 5,
          payment: 666,
        },
        {
          name: "1",
          huohao: "2",
          shopCart_id: 3,
          guige: "%",
          num: 2,
          price: 50,
          payment: 666,
        },
        {
          name: "1",
          huohao: "2",
          shopCart_id: 3,
          guige: "%",
          num: 2,
          price: 15,
          payment: 666,
        },
        {
          name: "1",
          huohao: "2",
          shopCart_id: 3,
          guige: "%",
          num: 2,
          price: 25,
          payment: 666,
        },
      ],
    };
  },
  computed: {
    allmoney() {
      let _allmoney = this.$data.allmoney;
      _allmoney += this.$data.freight;
      this.$data.commodityList.forEach((item) => {
        _allmoney += item.num * item.price;
      });
      return _allmoney;
    },
  },
  methods: {
    toShopCart() {
      this.$router.push({
        path: "cart",
      });
    },
    toProductInfo() {
      this.$router.push({
        path: "/productInfo",
      });
    },
    // 修改地址
    editAddress() {},
    // 修改地址
    deleteAddress() {},
    // 分页---
    handleSizeChange(val) {
      this.$data.pagesize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$data.currentPage = val;
      // console.log(`当前页: ${val}`);
    },
    chooseAddress(id) {
      this.$data.flag = id;
    },
    payType(str) {
      switch (str) {
        case "wechar":
          this.$data.wechar = true;
          this.$data.zhifubao = false;
          this.$data.geren = false;
          this.$data.gongsi = false;
          break;
        case "zhifubao":
          this.$data.wechar = false;
          this.$data.zhifubao = true;
          this.$data.geren = false;
          this.$data.gongsi = false;
          break;
        case "geren":
          this.$data.wechar = false;
          this.$data.zhifubao = false;
          this.$data.geren = true;
          this.$data.gongsi = false;
          break;
        case "gongsi":
          this.$data.wechar = false;
          this.$data.zhifubao = false;
          this.$data.geren = false;
          this.$data.gongsi = true;
          break;
      }
    },
    toPay() {},
  },
};
</script>
<style scoped>
.top {
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 2px solid #eaeaec;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.returnBtn {
  margin: 0 48px 0 0;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  margin-bottom: 30px;
  cursor: pointer;
  overflow: hidden;
  font-weight: bold;
  font-family: Microsoft YaHei UI;
}
.returnBtn:hover {
  color: #004ea2;
}

.title {
  height: 20px;
  line-height: 20px;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  /* margin-right: 50px; */
  margin-bottom: 30px;
}
/* ----- */
.addressList {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* height: 0; */
}
.eachAddress {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 332px;
  min-width: 250px;
  flex: 1;
  height: 200px;
  background: #f7f7f7;
  border: 2px solid #f7f7f7;
  border-radius: 10px;
  padding: 27px 48px;
  margin-bottom: 50px;
  margin-right: 50px;
  cursor: pointer;
}
.border {
  border: 3px solid #004ea2;
  padding: 26px 47px;
}
.eachAddress p {
  margin-bottom: 14px;
  font-size: 19px;
  font-family: Microsoft YaHei UI;
  font-weight: 500;
  color: #4a4a4a;
}
.eachAddress .address {
  line-height: 30px;
}
.btnBox {
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
}
.btnBox > div {
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  cursor: pointer;
  margin-left: 20px;
}
.editBtn {
  color: var(--color);
}
.deleBtn {
  color: rgb(164, 72, 72);
}
.freight {
  /* width: 142px; */
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 18px;
  padding-bottom: 30px;
  border-bottom: 2px solid #eaeaec;
  margin: 0 0 15px 0;
  overflow: hidden;
}

/* 下为购物车样式 */
.shopCart {
  width: 100%;
  min-height: 370px;
  overflow: hidden;
}
/* 表头 --*/
.listHead {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
}

._productInfo {
  /* width: 565px; */
  text-align: center;
  flex: 4.5;
  /* margin: 0 0 0 262px; */
}
._size {
  /* width: 195px; */
  text-align: center;
  flex: 1;
}
._price {
  /* width: 165px; */
  text-align: center;
  flex: 1;
}
._count {
  /* width: 165px; */
  text-align: center;
  flex: 1;
}
._payment {
  /* width: 130px; */
  text-align: center;
  flex: 1;
}
/* 内容 */
.allcommodity {
  width: 100%;
  height: 455px;
  display: flex;
  flex-direction: column;
}

.commodity {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 940px;
  height: 207px;
  margin: 0 0 20px 0;
  background: #f7f7f7;
  border-radius: 10px;
  overflow: hidden;
}
.word {
  /* width: 65px; */
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 18px;
}
.productInfo {
  flex: 4.1;
  /* width: 700px; */
  height: 165px;
  display: flex;
  align-items: center;
  margin: 0 27px 0 68px;
}
.productPic {
  width: 165px;
  height: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 33px 0 0;
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}
.productPic img {
  object-fit: contain;
}
.infoBox {
  height: 165px;
}
.name_zh {
  cursor: pointer;
  height: 20px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 20px;
  padding: 0 0 2px 0;
  margin: 20px 0 15px;
}
.name_zh:hover {
  /* border-bottom: 2px solid #004EA2; */
  text-decoration: underline;
}
.infoWord {
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  margin: 8px 0;
}
.size {
  flex: 1;
  /* width: 110px; */
  text-align: center;
}
.price {
  flex: 1;
  /* width: 165px; */
  text-align: center;
  font-weight: 600;
}
.count {
  flex: 1;
  /* width: 165px; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 0 0;
}

.num {
  width: 50px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  margin: 0 2px;
}
.payment {
  flex: 1;
  /* width: 150px; */
  text-align: center;
  font-weight: 600;
}
/* 分页器 */
.pagination {
  margin: 20px 0 0 36%;
  overflow: hidden;
}
.paymentPage /deep/ .el-pagination {
  --el-pagination-button-height: 40px;
  --el-pagination-font-size: 16px;
}
.paymentPage
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #004ea2;
}
.paymentPage /deep/.el-pagination.is-background .btn-next,
.paymentPage /deep/.el-pagination.is-background .btn-prev,
.paymentPage /deep/.el-pagination.is-background .el-pager li {
  min-width: 40px;
  border-radius: 5px;
}
.paymentPage /deep/ .el-icon {
  margin: 0 auto;
}
/* 以下为支付类型 */
.payType {
  overflow: hidden;
}
.typeTitle {
  margin: 40px 0 30px;
  height: 20px;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  line-height: 20px;
}
.typeBox {
  display: flex;
  flex-wrap: wrap;
}
.type {
  /* width: 200px; */

  height: 56px;
  line-height: 58px;
  border: 1px solid #999999;
  border-radius: 5px;
  margin: 0 46px 5px 0;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 15px;
}
.type:hover,
.type_checked {
  border: 3px solid #004ea2;
  height: 52px;
  padding:0 13px;
}
/* .type_checked {
  border: 3px solid #004ea2;
  padding: 0;
} */
.typeSign {
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 14px 0 0;
  overflow: hidden;
}
.typeSign img {
  object-fit: contain;
  width: 38px;
  height: 38px;
}
.typeName {
  height: 16px;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 16px;
}
/* 以下为底部 */
.footer {
  width: 95%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #ffffff;
  border: 1px solid #eaeaec;
  border-radius: 10px;
  margin: 90px 0 0 0;
  overflow: hidden;
}
.allMoney {
  display: flex;
  align-items: center;
  min-width: 220px;
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
  font-size: 18px;
  letter-spacing: 2px;
  text-align: center;
  margin: 0 24px 0 26px;
  color: #004ea2;
  background-color: #e0f3fe;
  border-radius: 26px;
}
.pay:hover {
  color: #fff;
  background-color: #004ea2;
}
</style>
