//购物车（支付部分）
<template>
  <div class="paymentPage">
    <!-- 收获地址 -->
    <div class="amount">
      <div class="pageTitle">收货地址</div>
      <div class="addressBox">
        <ul class="addressList">
          <!-- 以下v-for -->
          <li
            class="eachAddress"
            v-for="(address, index) in addresses"
            :key="index"
            :class="{border: index == flag }"
            @click="chooseAddress(index)"
          >
            <p class="name">收件人&nbsp;:&nbsp;{{ address.name }}</p>
            <p class="phone">电话号码&nbsp;:&nbsp;{{ address.phone }}</p>
            <p class="address">收货地址&nbsp;:&nbsp;{{ address.address }}</p>
            <div class="btnBox">
              <div class="deleBtn" @click="deleteAddress()">删除地址</div>
              <div class="editBtn" @click="editAddress()">修改地址</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="freight">
        预估运费：<strong>120{{ freight }}</strong>
      </div>
    </div>
    <!-- 商品统计 -->
    <div class="shopCart">
      <div class="listHead">
        <div class="_productInfo word">产品信息</div>
        <div class="_size word">规格</div>
        <div class="_price word">单价</div>
        <div class="_count word">数量</div>
        <div class="_payment word">金额</div>
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
              <div class="infoWord">货号：{{ item0.huohao }}</div>
              <div class="infoWord">CAS编号：{{ item0.shopCart_id }}</div>
            </div>
          </div>
          <div class="size">{{ item0.guige }}</div>
          <div class="price">{{ item0.price }}</div>
          <div class="count">
            <div class="num">1{{}}</div>
          </div>
          <!-- 关于金额的计算方式 -->
          <div class="payment">{{ item0.payment }}</div>
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
      <div class="typeTitle">支付类型</div>
      <div class="typeBox">
        <div class="type" @click="pay()">
          <div class="typeSign">
            <img src="../../assets/weixinzhifu.png" alt="" />
          </div>
          <div class="typeName">微信支付</div>
        </div>
        <div class="type" @click="pay()">
          <div class="typeSign">
            <img src="../../assets/zhifubao.png" alt="" />
          </div>
          <div class="typeName">支付宝支付</div>
        </div>
        <div class="type" @click="pay()">
          <div class="typeSign">
            <img src="../../assets/gerenzhifu.png" alt="" />
          </div>
          <div class="typeName">上传单联（个人）</div>
        </div>
        <div class="type" @click="pay()">
          <div class="typeSign">
            <img src="../../assets/gongsi.png" alt="" />
          </div>
          <div class="typeName">上传单据（公司）</div>
        </div>
      </div>
    </div>
    <!-- 以下为底部 -->
    <div class="footer">
      <div class="allMoney">
        最终合计&nbsp;&nbsp;&nbsp;
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
    return {
      pagesize: 2, // 每页显示多少条
      currentPage: 1, // 当前页数
      pagerCount: 5, //五个以上加省略号
      flag: 0, //用于地址框加边框
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
          price: 5,
          payment: 666,
        },
        {
          name: "1",
          huohao: "2",
          shopCart_id: 3,
          guige: "%",
          price: 5,
          payment: 666,
        },
        {
          name: "1",
          huohao: "2",
          shopCart_id: 3,
          guige: "%",
          price: 5,
          payment: 666,
        },
        {
          name: "1",
          huohao: "2",
          shopCart_id: 3,
          guige: "%",
          price: 5,
          payment: 666,
        },
      ],
    };
  },
  methods: {
    // 修改地址
    editAddress() {},
    // 修改地址
    deleteAddress() {},
    // 分页
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
    }
  },
};
</script>
<style scoped>
.pageTitle {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 30px;
  margin-right: 50px;
  border-bottom: 2px solid #eaeaec;
  margin-bottom: 20px;
}
.addressList {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* height: 0; */
}
.eachAddress {
  position: relative;
  width: 332px;
  height: 219px;
  background: #f7f7f7;
  border: 3px solid #f7f7f7;
  border-radius: 10px;
  padding: 27px 48px 23px;
  margin-bottom: 50px;
  margin-right: 50px;
}
.border {
      border: 3px solid #004EA2;
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
  position: absolute;
  right: 50px;
  bottom: 20px;
  display: flex;
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
  width: 565px;
  margin: 0 0 0 262px;
}
._size {
  width: 195px;
}
._price {
  width: 165px;
}
._count {
  width: 165px;
}
._payment {
  width: 130px;
}
/* 内容 */
.allcommodity {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.commodity {
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 1492px;
  height: 207px;
  margin: 0 0 20px 0;
  background: #f7f7f7;
  border-radius: 10px;
  overflow: hidden;
}

.productInfo {
  width: 700px;
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
  width: 110px;
  margin: 0 50px 0 0;
  text-align: center;
}
.price {
  width: 165px;
  text-align: center;
  font-weight: 600;
}
.count {
  width: 165px;
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
  width: 150px;
  text-align: center;
  font-weight: 600;
}
/* 分页器 */
.pagination {
  margin: 20px 0 0 36%;
  overflow: hidden;
}
/deep/ .el-pagination {
  --el-pagination-button-height: 40px;
  --el-pagination-font-size: 16px;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #004ea2;
}
/deep/.el-pagination.is-background .btn-next,
/deep/.el-pagination.is-background .btn-prev,
/deep/.el-pagination.is-background .el-pager li {
  min-width: 40px;
  border-radius: 5px;
}
/deep/ .el-icon {
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

}
.type {
    width: 200px;
height: 56px;
line-height: 58px;
border: 1px solid #999999;
border-radius: 5px;
margin: 0 46px 0 0;
padding: 2px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
}
.type:hover {
border: 3px solid #004EA2;
padding: 0;
}
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
color: #4A4A4A;
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
