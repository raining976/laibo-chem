//购物车（支付部分）
// 全局判断 1加入了团队 0个人
// 该组件接口 0是团队 1是个人
<template>
  <div class="setOrderPage">
    <!-- 收获地址 -->
    <div class="amount">
      <div class="top">
        <!-- <div class="title">{{ $t("cart.settlement") }}</div> -->
        <div class="returnBtn" @click="toShopCart()">{{ $t("base.back") }}</div>
      </div>

      <div class="content">
        <div
          style = "font-weight: 600"
          class="tip"
          v-if="addresses.length != 0 ? false : true"
          
        >
          {{ $t("order.noaddress") }}<span style="color: #004ea2;cursor:pointer " @click="toAddress()">{{ $t("order.link") }}</span>{{ $t("order.add") }}
        </div>
        <div class="addressBox">
          <ul class="addressList">
            <!-- v-for -->
            <li
              class="eachAddress"
              v-for="(address, index) in addresses"
              :key="index"
              :class="{ border: index == isBorder }"
              @click="chooseAddress(index, address.id)"
            >
              <p class="name">
                {{ $t("address.name") }}&nbsp;:&nbsp;{{ address.name }}
              </p>
              <p class="phone">
                {{ $t("base.phone") }}&nbsp;:&nbsp;{{ address.phone }}
              </p>
              <p class="address">
                {{ $t("base.address") }}&nbsp;:&nbsp;{{ address.address }}
              </p>
              <!-- <div class="btnBox">
                <div class="deleBtn icon_btn">
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="删除地址"
                    placement="top"
                  >
                    <i
                      class="el-icon-delete-solid"
                      @click="(curIdx = index), bounceMsg()"
                    ></i>
                  </el-tooltip>
                </div>
                <div class="editBtn icon_btn">
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="修改地址"
                    placement="top"
                  >
                    <i class="el-icon-edit" @click="editAddress(index)"></i>
                  </el-tooltip>
                </div>
              </div> -->
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="freight">
        {{ $t("cart.fright") + "：" }}<strong>{{ freight }}</strong>
      </div> -->
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
              <div class="name_zh" @click="toProductInfo(item0.product_id)">
                {{ item0.name }}
              </div>
              <div class="infoWord">
                {{ $t("order.itemNo") + "：" }}{{ item0.huohao }}
              </div>
              <div class="infoWord">
                {{ $t("order.casNum") + "：" }}{{ item0.cas }}
              </div>
            </div>
          </div>
          <div class="size">{{ item0.guige }}</div>
          <div class="price">{{ currency(item0.price).format() }}</div>
          <div class="count">
            <div class="num">{{ item0.count }}</div>
          </div>
          <!-- 关于金额的计算方式 -->
          <div class="payment">
            {{ currency(item0.count * item0.price).format() }}
          </div>
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
    <address-form v-if="formIsShow" />
    <!-- 以下为底部 -->
    <div class="footer">
      <div class="submitMy" @click="isSubmitMy()">
        <div
          class="submitMyBtn"
          :class="{ agree_submitMy: submitMy == 1 }"
        ></div>
        {{ $t("cart.submitOwn") }}
      </div>
      <div class="allMoney">
        {{ $t("cart.total") }}&nbsp;&nbsp;&nbsp;
        <div>{{ currency(allmoney).format() }}</div>
      </div>
      <div class="pay" @click="createOrder()">{{ $t("cart.setOrder") }}</div>
    </div>
  </div>
</template>
<script>
import handleAddress from "../../js/handlerAddress";
import addressForm from "../address/addressForm.vue";
export default {
  name: "setOrder",
  components: {
    addressForm,
  },
  data() {
    return {
      pagesize: 2, // 每页显示多少条
      currentPage: 1, // 当前页数
      pagerCount: 5, //五个以上加省略号

      formIsShow: false, // 地址表单是否展示
      curIdx: -1, // 当前选中要删除的索引
      flag: 0, // 1为增加地址,2为修改地址
      isReloadAddress: false, // 是否刷新地址
      isBorder: -1, //用于地址框加边框
      wechar: false,
      zhifubao: false,
      geren: false,
      gongsi: false,
      payWay: "",
      addressId: 0, // 地址id
      freight: 0, //运费
      submitMy: 0, //判断是否提交个人订单 0集体  1个人
      allmoney: 0, //总计
      orderId: 0,
      curAddress: {}, // 当前地址对象
      pushProduct: {
        product_params_id: 0,
        count: 0,
      }, //单个货物
      orderBox: [], //订单汇总传参
      addresses: [], // 地址列表

      commodityList: [
        // {
        //   name: "S915939 碳化硅, 99.9% metals basis,100目",
        //   huohao: "S915939-5g",
        //   shopCart_id: 409 - 21 - 2,
        //   guige: "99.9% metals basis,100目",
        //   num: 1,
        //   price: 39,
        //   payment: 666,
        // },
      ],
    };
  },
  created() {
    if (localStorage.getItem("in_team") === "1") {
      // 在团队
      this.$data.submitMy = 0;
    } else if (localStorage.getItem("in_team") === "0") {
      // 在个人
      this.$data.submitMy = 1;
    }
    this.getAddress();
    this.$data.commodityList = JSON.parse(localStorage.getItem("checkBox"));
  },
  mounted() {
    //
    window.scrollTo(0, 0);
  },
  watch: {
    isReloadAddress(val) {
      if (val) {
        this.getAddress();
        this.isReloadAddress = false;
      }
    },
    commodityList: {
      handler() {
        this.$nextTick(() => {
          let obj;
          this.$data.commodityList.forEach((item) => {
            this.$data.pushProduct.product_params_id = item.product_params_id;
            this.$data.pushProduct.count = item.count;
            obj = JSON.stringify(this.$data.pushProduct); //深拷贝
            //  console.log(JSON.parse(obj),"ccccc")
            this.$data.orderBox.push(JSON.parse(obj)); //一个一个存
            //  console.log(this.$data.orderBox,"ceshi1111");
            this.$data.pushProduct.product_params_id = 0;
            this.$data.pushProduct.count = 0;
          });
        });
      },
    },
  },
  computed: {
    allmoney() {
      let _allmoney = this.$data.allmoney;
      _allmoney += this.$data.freight;
      this.$data.commodityList.forEach((item) => {
        _allmoney += item.count * item.price;
      });

      if (_allmoney < 200) this.$data.freight = 20;
      _allmoney += this.$data.freight;
      this.$data.allmoney = _allmoney;
      return _allmoney;
    },
  },
  methods: {
    getAddress() {
      this.$http.get("/address").then((res) => {
        if (res.data.code == 20000) {
          if (!res.data.data) {
            this.addresses = [];
          } else {
            this.addresses = handleAddress(res.data.data);
          }
        }
      });
    },
    toAddress() {
      this.$router.push({
        path: '/address',
      })
    },
    toShopCart() {
      this.$router.go(-1);
    },
    toProductInfo(code) {
      this.$router.push({
        path: "/productInfo",
        query: {
          id: code,
        },
      });
    },
    // 修改地址------------------
    editAddress(idx) {
      this.flag = 2;
      this.curAddress = this.addresses[idx];
      console.log("this.curAddress", this.curAddress);
      this.formIsShow = true;
    },
    // 删除地址
    bounceMsg() {
      this.$confirm("此操作将永久删除该地址, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.delAddress();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    delAddress() {
      this.$http
        .post("/delAddress", {
          id: this.addresses[this.curIdx].id,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.isReloadAddress = true;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "未知错误!",
            type: "error",
          });
          console.log("err", err);
        });
    },
    chooseAddress(id, code) {
      this.$data.isBorder = id;
      this.$data.addressId = code;
    },
    // 分页---
    handleSizeChange(val) {
      this.$data.pagesize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$data.currentPage = val;
      // console.log(`当前页: ${val}`);
    },
    //提交到个人订单
    isSubmitMy() {
      if (localStorage.getItem("in_team") === "0") {
        this.$message({
          message: "您还未加入团队",
          // type: "error",
        });
        this.$data.submitMy = 1;
      } else if (localStorage.getItem("in_team") === "1") {
        if (this.$data.submitMy === 1) {
          this.$data.submitMy = 0; // 集体
        } else if (this.$data.submitMy === 0) {
          this.$data.submitMy = 1; // 个人
        }
      }
    },

    payType(str) {
      this.$data.payWay = str;
      switch (str) {
        case "wx":
          this.$data.wechar = true;
          this.$data.zhifubao = false;
          this.$data.geren = false;
          this.$data.gongsi = false;
          break;
        case "alipay":
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
    createOrder() {
      if (this.$data.addressId === 0) {
        this.$message({
          message: "尚未选择收货地址",
          type: "error",
        });
      } else {
        this.$http
          .post("/createOrder", {
            // products: {
            //   product_params_id: item.id,
            //   count: item.count,
            // },
            products: this.$data.orderBox,
            type: this.$data.submitMy,
            address: this.$data.addressId,
            from: "shopcart",
          })
          .then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                message: "创建订单成功",
                type: "success",
              });
              this.$data.orderId = res.data.data.order_no;
              this.$router.push({
                path: "/orderSuccess/" + this.$data.orderId,
                // path: "/order",
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$message({
              message: "未知错误!",
              type: "error",
            });
            console.log("err", err);
          });
      }
    },
  },
};
</script>
<style scoped>
.setOrderPage {
  position: relative;
}
.top {
  width: 100%;
  margin-bottom: 1.04vw;
  border-bottom: 0.1vw solid #eaeaec;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.returnBtn {
  padding: 0.05vw 2.5vw 1.56vw 0;
  height: 1.04vw;
  line-height: 1.04vw;
  font-size: 1.04vw;
  cursor: pointer;
  font-weight: bold;
  font-family: Microsoft YaHei UI;
}
.returnBtn:hover {
  color: #004ea2;
}

.title {
  /* height: 1.04vw; */
  line-height: 1.04vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  /* margin-right: 50px; */
  margin-bottom: 1.56vw;
}
.content {
  overflow: hidden;
}
.tip {
  font-size: 1.04vw;
  margin-bottom: 1.04vw; 
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
  width: 17.29vw;
  min-width: 13.02vw;
  flex: 1;
  height: 10.42vw;
  background: #f7f7f7;
  border: 0.1vw solid #f7f7f7;
  border-radius: 0.52vw;
  padding: 1.41vw 2.5vw;
  margin-bottom: 2.6vw;
  margin-right: 2.6vw;
  cursor: pointer;
}
.border {
  border: 0.16vw solid #004ea2;
  padding: 1.35vw 2.45vw;
}
.eachAddress p {
  margin-bottom: 0.73vw;
  font-size: 0.99vw;
  font-family: Microsoft YaHei UI;
  font-weight: 500;
  color: #4a4a4a;
}
.eachAddress .address {
  line-height: 1.56vw;
  height: 7.81vw;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: normal;
}
.address::-webkit-scrollbar {
  width: 0.31vw;
}
.address::-webkit-scrollbar-thumb {
  width: 0.31vw;
  height: 1.56vw;
  border-radius: 0.21vw;
  background-color: #c7c7c9;
}
.btnBox {
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
}
.btnBox > div {
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1.04vw;
}
.editBtn {
  color: var(--color);
}
.deleBtn {
  color: rgb(164, 72, 72);
}
.detailedAddress {
  width: 25.73vw;
  height: 8.49vw;
  border: 0.1vw solid #999999;
  border-radius: 0.26vw;
}

.addAddress {
  margin-left: 0.52vw;
  transform: scale(1.5);
  transform-origin: center;
  cursor: pointer;
  transition: 0.3s;
  background-color: #e3f5ff;
  border-radius: 0.52vw;
}
.addAddress:hover {
  transform: scale(1.7);
  color: var(--color);
  box-shadow: 0px 0.89vw 1.51vw -0.57vw #c7c7c9;
  --webkit-box-shadow: 0px 0.89vw 1.51vw -0.57vw #c7c7c9;
  --moz-box-shadow: 0px 0.89vw 1.51vw -0.57vw #c7c7c9;
}
.icon_btn >>> i {
  transform: scale(1.5);
}
.freight {
  /* width: 142px; */
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 0.94vw;
  padding-bottom: 1.56vw;
  /* border-bottom: 2px solid #eaeaec; */
  margin: 0 0 0.78vw 0;
  overflow: hidden;
}

/* 下为购物车样式 */
.shopCart {
  width: 100%;
  min-height: 19.27vw;
  overflow: hidden;
}
/* 表头 --*/
.listHead {
  width: 100%;
  height: 2.29vw;
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
  height: 23.7vw;
  display: flex;
  flex-direction: column;
}

.commodity {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 48.96vw;
  height: 10.78vw;
  margin: 0 0 1.04vw 0;
  background: #f7f7f7;
  border-radius: 0.52vw;
  overflow: hidden;
}
.word {
  /* width: 65px; */
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 0.94vw;
}
.productInfo {
  flex: 4.1;
  /* width: 700px; */
  height: 8.59vw;
  display: flex;
  align-items: center;
  margin: 0 1.41vw 0 3.54vw;
}
.productPic {
  width: 8.59vw;
  height: 8.59vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.72vw 0 0;
  background: #ffffff;
  border-radius: 0.26vw;
  overflow: hidden;
}
.productPic img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.infoBox {
  width: calc(100% - 10.31vw);
  height: 8.59vw;
  overflow: hidden;
}
.name_zh {
  cursor: pointer;
  min-height: 1.04vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 1.04vw;
  padding: 0 0 0.1vw 0;
  margin: 1.04vw 0 0.78vw;
}
.name_zh:hover {
  /* border-bottom: 2px solid #004EA2; */
  text-decoration: underline;
}
.infoWord {
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 0.94vw;
  margin: 0.42vw 0;
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
  margin: 0 0.52vw 0 0;
}

.num {
  width: 2.6vw;
  height: 1.46vw;
  line-height: 1.46vw;
  text-align: center;
  margin: 0 0.1vw;
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
.setOrderPage /deep/ .el-pagination {
  --el-pagination-button-height: 2.08vw;
  --el-pagination-font-size: 0.83vw;
}
.setOrderPage
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #004ea2;
}
.setOrderPage /deep/.el-pagination.is-background .btn-next,
.setOrderPage /deep/.el-pagination.is-background .btn-prev,
.setOrderPage /deep/.el-pagination.is-background .el-pager li {
  min-width: 2.08vw;
  border-radius: 0.26vw;
}
.setOrderPage /deep/ .el-icon {
  margin: 0 auto;
}
/* 以下为支付类型 */
.payType {
  overflow: hidden;
}
.typeTitle {
  margin: 2.08vw 0 1.56vw;
  height: 1.04vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  line-height: 1.04vw;
}
.typeBox {
  display: flex;
  flex-wrap: wrap;
}
.type {
  /* width: 200px; */

  height: 2.92vw;
  line-height: 3.02vw;
  border: 0.05vw solid #999999;
  border-radius: 0.26vw;
  margin: 0 2.4vw 0.26vw 0;
  padding: 0.1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 0.78vw;
}
.type:hover,
.type_checked {
  border: 0.16vw solid #004ea2;
  height: 2.71vw;
  padding: 0 0.68vw;
}
/* .type_checked {
  border: 3px solid #004ea2;
  padding: 0;
} */
.typeSign {
  width: 1.98vw;
  height: 1.98vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.73vw 0 0;
  overflow: hidden;
}
.typeSign img {
  object-fit: contain;
  width: 1.98vw;
  height: 1.98vw;
}
.typeName {
  height: 0.83vw;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 0.83vw;
}
/* 以下为底部 */
.footer {
  width: 95%;
  height: 5.21vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #ffffff;
  border: 0.05vw solid #eaeaec;
  border-radius: 0.52vw;
  margin: 4.69vw 0 0 0;
  overflow: hidden;
}
.submitMy {
  display: flex;
  align-items: center;
  cursor: pointer;
  /* width: 160px; */
  height: 1.04vw;
  line-height: 1.04vw;
  font-size: 0.94vw;
  font-weight: 600;
  color: #004ea2;
}
.submitMyBtn {
  width: 0.94vw;
  height: 0.94vw;
  margin: 0 0.57vw 0 0vw;
  border: 0.05vw solid #999999;
  border-radius: 0.1vw;
}
.agree_submitMy {
  background-color: #004ea2;
}
.allMoney {
  display: flex;
  align-items: center;
  min-width: 11.46vw;
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 0.94vw;
  margin: 0 0 0 2.19vw;
}
.allMoney div {
  font-size: 1.35vw;
  color: #ff4747;
}
.pay {
  cursor: pointer;
  padding: 0 1.2vw;
  height: 2.71vw;
  line-height: 2.71vw;
  font-size: 0.94vw;
  letter-spacing: 0.1vw;
  text-align: center;
  margin: 0 1.25vw 0 1.35vw;
  color: #004ea2;
  background-color: #e0f3fe;
  border-radius: 1.35vw;
}
.pay:hover {
  color: #fff;
  background-color: #004ea2;
}
</style>
