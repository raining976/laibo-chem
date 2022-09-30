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
          <div class="payment">{{ currency(item0.count * item0.price).format() }}</div>
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
      
      if(_allmoney < 200)this.$data.freight = 20;
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
    toShopCart() {
      this.$router.push({
        path: "cart",
      });
    },
    toProductInfo(code) {
      this.$router.push({
        path: "/productInfo",
         query: {
            id: code,
           }
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
          })
          .then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                message: "创建订单成功",
                type: "success",
              });
              this.$data.orderId = res.data.data.order_no;
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
  font-size: 20px;
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
.detailedAddress {
  width: 494px;
  height: 163px;
  border: 2px solid #999999;
  border-radius: 5px;
}

.addAddress {
  margin-left: 10px;
  transform: scale(1.5);
  transform-origin: center;
  cursor: pointer;
  transition: 0.3s;
  background-color: #e3f5ff;
  border-radius: 10px;
}
.addAddress:hover {
  transform: scale(1.7);
  color: var(--color);
  box-shadow: 0px 17px 29px -11px #c7c7c9;
  --webkit-box-shadow: 0px 17px 29px -11px #c7c7c9;
  --moz-box-shadow: 0px 17px 29px -11px #c7c7c9;
}
.icon_btn >>> i {
  transform: scale(1.5);
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
  /* border-bottom: 2px solid #eaeaec; */
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
  width: calc(100% - 198px);
  height: 165px;
  overflow: hidden;
}
.name_zh {
  cursor: pointer;
  min-height: 20px;
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
.setOrderPage /deep/ .el-pagination {
  --el-pagination-button-height: 40px;
  --el-pagination-font-size: 16px;
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
  min-width: 40px;
  border-radius: 5px;
}
.setOrderPage /deep/ .el-icon {
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
  padding: 0 13px;
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
.submitMy {
  display: flex;
  align-items: center;
  cursor: pointer;
  /* width: 160px; */
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #004ea2;
}
.submitMyBtn {
  width: 18px;
  height: 18px;
  margin: 0 11px 0 0px;
  border: 1px solid #999999;
  border-radius: 2px;
}
.agree_submitMy {
  background-color: #004ea2;
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
